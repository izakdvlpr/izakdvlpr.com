import axios from "axios";
import { NextResponse } from "next/server";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";

import { env } from "@/lib/env";
import { redis } from "@/lib/redis";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export async function GET() {
	const activities = await getActivities();

	const recentPlayed = await getRecentPlayed();

	return NextResponse.json({ activities, recentPlayed });
}

async function getActivities() {
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
			?.filter((a: any) => ["Android Studio", "Visual Studio Code", "Code"].includes(a.name))
			?.map((activity: any) => ({
				largeImage: getImageUrl(activity.assets?.large_image) ?? null,
				largeText: activity.assets?.large_text ?? null,
				smallImage: getImageUrl(activity.assets?.small_image) ?? null,
				smallText: activity.assets?.small_text ?? null,
				details: activity?.details ?? null,
				state: activity?.state ?? null,
				time: dayjs.duration(Date.now() - activity.timestamps.start).format("HH:mm:ss") ?? null,
			})) ?? [];

	const editor = activities?.[0] ?? null;

	const activitiesResponse = {
		editor,
	};

	await redis.set(
		"discord:activities",
		JSON.stringify(activitiesResponse),
		"EX",
		60, // // 1 minutes
	);

	return activitiesResponse;
}

function getImageUrl(url: string) {
	return url?.match(/https\/.*$/)?.[0].replace("https/", "https://") as string;
}

async function getRecentPlayed() {
	const cachedRecentPlayed = await redis.get("discord:recent-played");

	if (cachedRecentPlayed) {
		return JSON.parse(cachedRecentPlayed);
	}

	const userAgent =
		"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_9; en-US) AppleWebKit/534.17 (KHTML, like Gecko) Chrome/50.0.1237.362 Safari/534";

	const games = await axios
		.get(`https://discord.com/api/v9/content-inventory/users/${env.DISCORD_ID}/outbox`, {
			headers: {
				Authorization: env.DISCORD_TOKEN,
				"User-Agent": userAgent,
			},
		})
		.then(
			(res) =>
				res.data?.entries
					?.filter((e: any) => e?.extra?.type === "played_game_extra")
					?.map((game: any) => ({
						id: game?.extra?.application_id,
						gameName: game?.extra?.game_name,
						streakCountDays: game?.traits?.find((t: any) => t?.type === 8)?.streak_count_days ?? null,
						playedTimeSeconds: game?.traits?.find((t: any) => t?.type === 2)?.duration_seconds,
						playedAt: dayjs(game?.started_at).fromNow(),
					})) ?? [],
		)
		.catch(() => null);

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
		const gameImage = gamesSupplementalData?.find((g: any) => g.application_id === game.id);

		return {
			...game,
			iconUrl: gameImage?.icon_hash
				? `https://cdn.discordapp.com/app-icons/${game.id}/${gameImage.icon_hash}.png`
				: null,
			coverImageUrl: gameImage.cover_image_url ?? null,
		};
	});

	await redis.set(
		"discord:recent-played",
		JSON.stringify(gamesWithImages),
		"EX",
		60 * 60 * 6, // 6 hour
	);

	return gamesWithImages;
}
