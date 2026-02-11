import axios from "axios";

import { env } from "./env";

export interface Programming {
	largeImage: string;
	largeText: string;
	smallImage: string;
	smallText: string;
	details: string;
	state: string;
	time: string;
}

export interface Music {
	album: string;
	albumArtUrl: string;
	artist: string;
	song: string;
	time: string;
	trackId: string;
}

export interface ListenToMusic {
	now: Music | null;
	last: Music | null;
}

export interface CodingTime {
	allTime: string;
	last30Days: string;
	last7Days: string;
	avgDaily: string;
	topLanguage: string | null;
}

export interface ContributionData {
	date: string;
	count: number;
}

export interface Contributors {
	data: ContributionData[];
	totalContributions: number;
	lastPushedAt: string;
}

export interface Stats {
	programming: Programming;
	listenToMusic: ListenToMusic;
	contributors: Contributors | null;
	codingTime: CodingTime | null;
}

export const api = axios.create({
	baseURL: `${env.NEXT_PUBLIC_BASE_URL}/api`,
});

export async function getStats() {
	const { data } = await api.get<Stats>("/stats", {
		adapter: "fetch",
		fetchOptions: {
			next: {
				revalidate: 60,
			},
		},
	});

	return data;
}
