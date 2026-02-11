import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";

dayjs.extend(duration);

function getVscodeAssetUrl(url: string) {
	return url.match(/https\/.*$/)?.[0].replace("https/", "https://") as string;
}

function formatTime(time: number) {
	return dayjs.duration(time).format("HH:mm:ss");
}

function formatTimeToHours(time: number) {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);

	return `${hours}h ${minutes}m`;
}

async function getSpotifyLastPlayed() {
	try {
		const params = new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token: env.SPOTIFY_REFRESH_TOKEN,
		});

		const basic = Buffer.from(
			`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`,
		).toString("base64");

		const tokenResponse = await axios.post(
			"https://accounts.spotify.com/api/token",
			params,
			{
				headers: {
					Authorization: `Basic ${basic}`,
					"Content-Type": "application/x-www-form-urlencoded",
				},
			},
		);

		const accessToken = tokenResponse.data.access_token;

		const recentPlayedResponse = await axios.get(
			"https://api.spotify.com/v1/me/player/recently-played?limit=1",
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		);

		const item = recentPlayedResponse.data?.items?.[0];
		const track = item?.track;

		if (!track) {
			return null;
		}

		return {
			album: track.album?.name ?? "Unknown album",
			albumArtUrl: track.album?.images?.[0]?.url ?? "",
			artist: track.artists?.map((artist: any) => artist.name).join(", "),
			song: track.name ?? "Unknown track",
			time: formatTime(track.duration_ms ?? 0),
			trackId: track.id ?? "",
		};
	} catch (error: any) {
		console.error(
			"Spotify API Error:",
			error?.response?.status,
			error?.response?.data ?? error?.message,
		);

		return null;
	}
}

async function getWakatimeStats() {
	try {
		const headers = {
			Authorization:
				"Basic " + Buffer.from(env.WAKATIME_API_KEY).toString("base64"),
		};

		const [allTime, last7Days, last30Days] = await Promise.all([
			axios.get("https://wakatime.com/api/v1/users/current/stats/all_time", {
				headers,
			}),
			axios.get("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
				headers,
			}),
			axios.get(
				"https://wakatime.com/api/v1/users/current/stats/last_30_days",
				{ headers },
			),
		]);

		return {
			allTime: allTime.data.data?.total_seconds_including_other_language ?? 0,
			last30Days:
				last30Days.data.data?.total_seconds_including_other_language ?? 0,
			last7Days:
				last7Days.data.data?.total_seconds_including_other_language ?? 0,
			avgDaily:
				last7Days.data.data?.daily_average_including_other_language ?? 0,
			topLanguage: allTime.data.data?.languages?.[0]?.name ?? null,
		};
	} catch (error: any) {
		console.error(
			"Wakatime API Error:",
			error?.response?.status,
			error?.response?.data ?? error?.message,
		);

		return null;
	}
}

async function getGithubContributions() {
	try {
		const {
			data: { data },
		} = await axios.post(
			"https://api.github.com/graphql",
			{
				variables: {
					userName: "izakdvlpr",
				},
				query: `
          query ($userName: String!) {
            user(login: $userName) {
              repositories(first: 1, orderBy: { direction: DESC, field: PUSHED_AT }) {
                nodes {
                  name
                  pushedAt
                }
              }
              contributionsCollection {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      contributionCount
                      date
                    }
                  }
                }
              }
            }
          }
        `,
			},
			{
				headers: {
					Authorization: `Bearer ${env.GITHUB_TOKEN}`,
				},
			},
		);

		const parsedResponse =
			data.user.contributionsCollection.contributionCalendar;

		return {
			lastPushedAt: data.user.repositories.nodes[0].pushedAt,
			totalContributions: parsedResponse.totalContributions,
			data: parsedResponse.weeks.flatMap((week: any) => {
				return week.contributionDays.map((day: any) => {
					return {
						date: day.date.replace(/-/g, "/"),
						count: day.contributionCount,
					};
				});
			}),
		};
	} catch (error: any) {
		console.error(
			"GitHub API Error:",
			error?.response?.status,
			error?.response?.data ?? error?.message,
		);

		return null;
	}
}

export async function GET() {
	const user = await axios
		.get(`https://api.lanyard.rest/v1/users/${env.DISCORD_ID}`)
		.then((res) => res.data.data)
		.catch(() => null);

	if (!user) {
		return NextResponse.json({ error: "An error occurred" }, { status: 500 });
	}

	const vscodeData = user?.activities?.find((a: any) =>
		["Visual Studio Code", "Code"].includes(a.name),
	);

	const programming = vscodeData
		? {
				largeImage: getVscodeAssetUrl(vscodeData.assets.large_image),
				largeText: vscodeData.assets.large_text ?? "Visual Studio Code",
				smallImage: getVscodeAssetUrl(vscodeData.assets.small_image),
				smallText: vscodeData.assets.small_text ?? "Visual Studio Code",
				details: vscodeData?.details,
				state: vscodeData?.state,
				time: formatTime(Date.now() - vscodeData.timestamps.start),
			}
		: null;

	const listenToMusic = {
		now: null,
		last: null,
	} as Record<string, any>;

	if (!!user?.spotify?.track_id) {
		listenToMusic["now"] = {
			album: user.spotify.album,
			albumArtUrl: user.spotify.album_art_url,
			artist: user.spotify.artist,
			song: user.spotify.song,
			time: formatTime(
				user.spotify.timestamps.end - user.spotify.timestamps.start,
			),
			trackId: user.spotify.track_id,
		};
	} else {
		listenToMusic["last"] = await getSpotifyLastPlayed().catch(() => null);
	}

	const contributors = await getGithubContributions().catch(() => null);

	const wakatimeStats = await getWakatimeStats();

	const codingTime = wakatimeStats
		? {
				allTime: formatTimeToHours(wakatimeStats.allTime),
				last30Days: formatTimeToHours(wakatimeStats.last30Days),
				last7Days: formatTimeToHours(wakatimeStats.last7Days),
				avgDaily: formatTimeToHours(wakatimeStats.avgDaily),
				topLanguage: wakatimeStats.topLanguage,
			}
		: null;

	return NextResponse.json({
		programming,
		listenToMusic,
		contributors,
		codingTime,
	});
}
