import { NextResponse } from "next/server";
import { LastClient } from "@musicorum/lastfm";

import { env } from "@/lib/env";
import { USERNAME } from "@/lib/constants";
import { redis } from "@/lib/redis";

const lastfm = new LastClient(env.LASTFM_API_KEY);

export async function GET() {
	const tracks = await getTracks();

	return NextResponse.json(tracks);
}

async function getTracks() {
	const cachedTracks = await redis.get("lastfm:tracks");

	if (cachedTracks) {
		return JSON.parse(cachedTracks);
	}

	const user = await lastfm.user.getRecentTracks(USERNAME, { limit: 6 }).catch(() => null);

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
		nowPlaying: nowPlaying ? mapTrack(nowPlaying) : null,
		lastPlayed: lastPlayed ? mapTrack(lastPlayed) : null,
		tracks: tracks.map(mapTrack),
	};

	await redis.set(
		"lastfm:tracks",
		JSON.stringify(lastfmResponse),
		"EX",
		60 * 2, // 2 minutes
	);

	return lastfmResponse;
}

function mapTrack(track: any) {
	return {
		name: track.name,
		artist: track.artist?.name,
		imageUrl: track.images?.find((img: any) => img.size === "medium")?.url ?? null,
		album: track.album?.name ?? null,
		url: track.url,
		date: track.date ? new Date(track.date) : null,
	};
}
