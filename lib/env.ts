import { createEnv } from "@t3-oss/env-nextjs";
import z from "zod";

export const env = createEnv({
	client: {
		NEXT_PUBLIC_BASE_URL: z.string(),
	},
	server: {
		WAKATIME_API_KEY: z.string(),
		GITHUB_TOKEN: z.string(),
		DISCORD_ID: z.string(),
		SPOTIFY_CLIENT_ID: z.string(),
		SPOTIFY_CLIENT_SECRET: z.string(),
		SPOTIFY_REFRESH_TOKEN: z.string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
		DISCORD_ID: process.env.DISCORD_ID,
		SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
		SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
		SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,
	},
});
