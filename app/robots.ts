import type { MetadataRoute } from "next";

import { PUBLIC_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/"],
			},
			{
				userAgent: [
					"Amazonbot",
					"Applebot-Extended",
					"Bytespider",
					"CCBot",
					"ClaudeBot",
					"Google-Extended",
					"GPTBot",
					"meta-externalagent",
				],
				disallow: "/",
			},
		],
		sitemap: `${PUBLIC_URL}/sitemap.xml`,
		host: PUBLIC_URL,
	};
}
