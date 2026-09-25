import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		REDIS_URL: z.string(),
		RESEND_API_KEY: z.string(),
		WAKATIME_API_KEY: z.string(),
		GITHUB_TOKEN: z.string(),
		DISCORD_ID: z.string(),
		DISCORD_TOKEN: z.string(),
		LASTFM_API_KEY: z.string(),
		RUN_SYNC_TOKEN: z.string().min(32),
	},
	clientPrefix: "VITE_",
	client: {
		VITE_DATAXAMAS_URL: z.string(),
		VITE_DATAXAMAS_WEBSITE_ID: z.string(),
		VITE_DATAXAMAS_API_KEY: z.string(),
	},
	runtimeEnv: {
		VITE_DATAXAMAS_URL: import.meta.env.VITE_DATAXAMAS_URL,
		VITE_DATAXAMAS_WEBSITE_ID: import.meta.env.VITE_DATAXAMAS_WEBSITE_ID,
		VITE_DATAXAMAS_API_KEY: import.meta.env.VITE_DATAXAMAS_API_KEY,
		REDIS_URL: process.env.REDIS_URL,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
		WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,
		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
		DISCORD_ID: process.env.DISCORD_ID,
		DISCORD_TOKEN: process.env.DISCORD_TOKEN,
		LASTFM_API_KEY: process.env.LASTFM_API_KEY,
		RUN_SYNC_TOKEN: process.env.RUN_SYNC_TOKEN,
	},
	emptyStringAsUndefined: true,
});
