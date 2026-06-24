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
	date: Date | null;
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
	lastPushedAt: string | null;
	items: {
		date: string;
		count: number;
	}[];
}

export interface Stats {
	discord: Discord;
	lastfm: Lastfm;
	wakatime: Wakatime;
	github: Github;
}
