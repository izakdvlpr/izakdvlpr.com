import axios from "axios";
import { NextResponse } from "next/server";

import { env } from "@/lib/env";
import { redis } from "@/lib/redis";

export async function GET() {
	const times = await getWakatimeTimes();

	return NextResponse.json(times);
}

async function getWakatimeTimes() {
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
		allTime: formatTimeToHours(allTime.data.data?.total_seconds_including_other_language ?? 0, false),
		last30Days: formatTimeToHours(last30Days.data.data?.total_seconds_including_other_language ?? 0),
		last7Days: formatTimeToHours(last7Days.data.data?.total_seconds_including_other_language ?? 0),
		avgDaily: formatTimeToHours(last7Days.data.data?.daily_average_including_other_language ?? 0),
		topLanguage: allTime.data.data?.languages?.[0]?.name ?? null,
	};

	await redis.set(
		"wakatime:times",
		JSON.stringify(timesResponse),
		"EX",
		60 * 60 * 6, // 6 hour
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
