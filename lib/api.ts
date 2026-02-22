import axios from "axios";

import { env } from "./env";

export interface DiscordActivity {
	largeImage: string;
	largeText: string;
	smallImage: string;
	smallText: string;
	details: string;
	state: string;
	time: string;
}

export interface Discord {
	activities: {
		editor: DiscordActivity | null;
	};
	recentPlayed: {
		id: string;
		gameName: string;
		streakCountDays: number;
		playedTimeSeconds: number;
		playedAt: string;
		iconUrl: string;
		coverImageUrl: string;
	}[];
}

export interface LastfmMusic {
	name: string;
	artist: string;
	imageUrl: string;
	album: string;
	url: string;
	date: string | null;
}

export interface Lastfm {
	nowPlaying: LastfmMusic | null;
	lastPlayed: LastfmMusic | null;
	tracks: LastfmMusic[];
}

export interface Wakatime {
	allTime: string;
	last30Days: string;
	last7Days: string;
	avgDaily: string;
	topLanguage: string | null;
}

export interface Github {
	totalContributions: number;
	lastPushedAt: string;
	items: {
		date: string;
		count: number;
	}[];
}

export const api = axios.create({
	baseURL: `${env.NEXT_PUBLIC_BASE_URL}/api`,
	adapter: "fetch",
	fetchOptions: {
		next: {
			revalidate: 60,
		},
	},
});

export const getDiscord = async () => api.get<Discord>("/now/discord").then(({ data }) => data);

export const getLastfm = async () => api.get<Lastfm>("/now/lastfm").then(({ data }) => data);

export const getWakatime = async () => api.get<Wakatime>("/now/wakatime").then(({ data }) => data);

export const getGithub = async () => api.get<Github>("/now/github").then(({ data }) => data);
