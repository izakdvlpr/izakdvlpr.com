import axios from "axios";

import { env } from "./env";
import type { Stats } from "./types";

export const api = axios.create({
	baseURL: `${env.NEXT_PUBLIC_BASE_URL}/api`,
	// adapter: "fetch",
	// fetchOptions: {
	// 	next: {
	// 		revalidate: 60,
	// 	},
	// },
});

export const getStats = async () => api.get<Stats>("/stats").then(({ data }) => data);
