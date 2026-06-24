import { LastClient } from "@musicorum/lastfm";
import { createServerFn } from "@tanstack/react-start";
import axios from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { env } from "@/lib/env";
import { USERNAME } from "@/lib/constants";
import { redis } from "@/lib/redis";
import type { Discord, Github, Lastfm, Stats, Wakatime } from "@/lib/types";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

const emptyStats: Stats = {
	github: { lastPushedAt: null, totalContributions: 0, items: [] },
	lastfm: { nowPlaying: null, lastPlayed: null, tracks: [] },
	wakatime: {
		allTime: "0h",
		last30Days: "0h 0m",
		last7Days: "0h 0m",
		avgDaily: "0h 0m",
		topLanguage: null,
	},
	discord: { activities: { editor: null }, recentPlayed: [] },
};

export const getStats = createServerFn({ method: "GET" }).handler(
	async (): Promise<Stats> => {
		try {
			const github = await getGithub();
			const lastfm = await getLastfm();
			const wakatime = await getWakatime();
			const discordActivities = await getDiscordActivities();
			const discordRecentPlayed = await getDiscordRecentPlayed();

			return {
				github,
				lastfm,
				wakatime,
				discord: {
					activities: discordActivities,
					recentPlayed: discordRecentPlayed,
				},
			};
		} catch (error) {
			console.error("Error fetching stats:", error);

			return emptyStats;
		}
	},
);

// Github

async function getGithub(): Promise<Github> {
	const cachedContributions = await redis.get("github:contributions");

	if (cachedContributions) {
		return JSON.parse(cachedContributions);
	}

	const contributionsResponse = await axios
		.post(
			"https://api.github.com/graphql",
			{
				variables: {
					userName: USERNAME,
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
		)
		.catch(() => null);

	if (!contributionsResponse) {
		return {
			lastPushedAt: null,
			totalContributions: 0,
			items: [],
		};
	}

	const parsedResponse =
		contributionsResponse.data?.data?.user?.contributionsCollection
			?.contributionCalendar;

	const contributions = {
		lastPushedAt:
			contributionsResponse.data?.data?.user?.repositories?.nodes?.[0]
				?.pushedAt,
		totalContributions: parsedResponse?.totalContributions,
		items: parsedResponse?.weeks?.flatMap((week: any) => {
			return week?.contributionDays?.map((day: any) => {
				return {
					date: day.date.replace(/-/g, "/"),
					count: day.contributionCount,
				};
			});
		}),
	};

	await redis.set(
		"github:contributions",
		JSON.stringify(contributions),
		"EX",
		60 * 5, // 5 minutes
	);

	return contributions;
}

// LastFM

const lastfm = new LastClient(env.LASTFM_API_KEY);

async function getLastfm(): Promise<Lastfm> {
	const cachedTracks = await redis.get("lastfm:tracks");

	if (cachedTracks) {
		return JSON.parse(cachedTracks);
	}

	const user = await lastfm.user
		.getRecentTracks(USERNAME, { limit: 6 })
		.catch(() => null);

	const orderedTracks =
		user?.tracks.sort((a, b) => {
			const dateA = a.date ? new Date(a.date).getTime() : 0;
			const dateB = b.date ? new Date(b.date).getTime() : 0;

			return dateB - dateA;
		}) ?? [];

	const nowPlaying = orderedTracks.find((track) => track.nowPlaying) ?? null;
	const lastPlayed = orderedTracks.find((track) => !track.nowPlaying) ?? null;

	const tracks = orderedTracks
		.filter((track) => !track.nowPlaying)
		.filter((track) => {
			if (!nowPlaying) {
				return track.name !== lastPlayed?.name;
			}

			return true;
		})
		.slice(0, 5);

	const lastfmResponse = {
		nowPlaying: nowPlaying ? lastfmMapTrack(nowPlaying) : null,
		lastPlayed: lastPlayed ? lastfmMapTrack(lastPlayed) : null,
		tracks: tracks.map(lastfmMapTrack)?.slice(0, 5),
	};

	await redis.set(
		"lastfm:tracks",
		JSON.stringify(lastfmResponse),
		"EX",
		60 * 2, // 2 minutes
	);

	return lastfmResponse;
}

function lastfmMapTrack(track: any) {
	return {
		name: track.name,
		artist: track.artist?.name,
		imageUrl:
			track.images?.find((img: any) => img.size === "medium")?.url ?? null,
		album: track.album?.name ?? null,
		url: track.url,
		date: track.date ? new Date(track.date) : null,
	};
}

// Wakatime

async function getWakatime(): Promise<Wakatime> {
	const cachedTimes = await redis.get("wakatime:times");

	if (cachedTimes) {
		return JSON.parse(cachedTimes);
	}

	const headers = {
		Authorization: `Basic ${Buffer.from(env.WAKATIME_API_KEY).toString("base64")}`,
	};

	const [allTime, last7Days, last30Days] = await Promise.all([
		axios.get("https://wakatime.com/api/v1/users/current/stats/all_time", {
			headers,
		}),
		axios.get("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
			headers,
		}),
		axios.get("https://wakatime.com/api/v1/users/current/stats/last_30_days", {
			headers,
		}),
	]);

	const timesResponse = {
		allTime: formatTimeToHours(
			allTime.data.data?.total_seconds_including_other_language ?? 0,
			false,
		),
		last30Days: formatTimeToHours(
			last30Days.data.data?.total_seconds_including_other_language ?? 0,
		),
		last7Days: formatTimeToHours(
			last7Days.data.data?.total_seconds_including_other_language ?? 0,
		),
		avgDaily: formatTimeToHours(
			last7Days.data.data?.daily_average_including_other_language ?? 0,
		),
		topLanguage: allTime.data.data?.languages?.[0]?.name ?? null,
	};

	await redis.set(
		"wakatime:times",
		JSON.stringify(timesResponse),
		"EX",
		60 * 60 * 6, // 6 hour
	);

	return timesResponse;
}

function formatTimeToHours(time: number, includeMinutes = true) {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);

	if (!includeMinutes) {
		return `${hours}h`;
	}

	return `${hours}h ${minutes}m`;
}

// Discord

async function getDiscordActivities(): Promise<Discord["activities"]> {
	const cachedActivities = await redis.get("discord:activities");

	if (cachedActivities) {
		return JSON.parse(cachedActivities);
	}

	const userData = await axios
		.get(`https://api.lanyard.rest/v1/users/${env.DISCORD_ID}`)
		.then((res) => res.data.data)
		.catch(() => null);

	const activities =
		userData?.activities
			?.filter((a: any) =>
				["Android Studio", "Visual Studio Code", "Code"].includes(a.name),
			)
			?.map((activity: any) => ({
				largeImage: getDiscordImageUrl(activity.assets?.large_image) ?? null,
				largeText: activity.assets?.large_text ?? null,
				smallImage: getDiscordImageUrl(activity.assets?.small_image) ?? null,
				smallText: activity.assets?.small_text ?? null,
				details: activity?.details ?? null,
				state: activity?.state ?? null,
				time:
					dayjs
						.duration(Date.now() - activity.timestamps.start)
						.format("HH:mm:ss") ?? null,
			})) ?? [];

	const editor = activities?.[0] ?? null;

	const activitiesResponse = {
		editor,
	};

	await redis.set(
		"discord:activities",
		JSON.stringify(activitiesResponse),
		"EX",
		60, // // 1 minutes
	);

	return activitiesResponse;
}

function getDiscordImageUrl(url: string) {
	return url?.match(/https\/.*$/)?.[0].replace("https/", "https://") as string;
}

async function getDiscordRecentPlayed(): Promise<Discord["recentPlayed"]> {
	const cachedRecentPlayed = await redis.get("discord:recent-played");

	if (cachedRecentPlayed) {
		return JSON.parse(cachedRecentPlayed);
	}

	const userAgent =
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_9; en-US) AppleWebKit/534.17 (KHTML, like Gecko) Chrome/50.0.1237.362 Safari/534";

	const games = await axios
		.get(
			`https://discord.com/api/v9/content-inventory/users/${env.DISCORD_ID}/outbox`,
			{
				headers: {
					Authorization: env.DISCORD_TOKEN,
					"User-Agent": userAgent,
				},
			},
		)
		.then(
			(res) =>
				res.data?.entries
					?.filter((e: any) => e?.extra?.type === "played_game_extra")
					?.map((game: any) => ({
						id: game?.extra?.application_id,
						gameName: game?.extra?.game_name,
						streakCountDays:
							game?.traits?.find((t: any) => t?.type === 8)
								?.streak_count_days ?? null,
						playedTimeSeconds: game?.traits?.find((t: any) => t?.type === 2)
							?.duration_seconds,
						playedAt: dayjs(game?.started_at).fromNow(),
					})) ?? [],
		)
		.catch(() => null);

	if (!games) {
		return [];
	}

	const gamesSupplementalData = await axios
		.get("https://discord.com/api/v9/applications/games-supplemental", {
			params: {
				application_ids: games.map((game: any) => game?.id).filter(Boolean),
			},
			paramsSerializer: (params) => {
				return Object.entries(params)
					.flatMap(([key, value]) =>
						Array.isArray(value)
							? value.map((v) => `${key}=${encodeURIComponent(v)}`)
							: `${key}=${encodeURIComponent(value as string)}`,
					)
					.join("&");
			},
			headers: {
				Authorization: env.DISCORD_TOKEN,
				"User-Agent": userAgent,
			},
		})
		.then((res) => res.data?.supplemental_game_data ?? null)
		.catch(() => null);

	const gamesWithImages = games.map((game: any) => {
		const gameImage = gamesSupplementalData?.find(
			(g: any) => g.application_id === game.id,
		);

		return {
			...game,
			iconUrl: gameImage?.icon_hash
				? `https://cdn.discordapp.com/app-icons/${game.id}/${gameImage.icon_hash}.png`
				: null,
			coverImageUrl: gameImage?.cover_image_url ?? null,
		};
	})?.slice(0, 5);

	await redis.set(
		"discord:recent-played",
		JSON.stringify(gamesWithImages),
		"EX",
		60 * 60 * 6, // 6 hour
	);

	return gamesWithImages;
}
