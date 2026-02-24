import type { MetadataRoute } from "next";

import { PUBLIC_URL } from "@/lib/constants";
import { getSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
	const slugs = getSlugs();

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: PUBLIC_URL,
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 1,
		},
		{
			url: `${PUBLIC_URL}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.8,
		},
		{
			url: `${PUBLIC_URL}/blog`,
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.9,
		},
		{
			url: `${PUBLIC_URL}/setup`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.7,
		},
		{
			url: `${PUBLIC_URL}/contact`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.6,
		},
		{
			url: `${PUBLIC_URL}/ai`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.5,
		},
	];

	const blogRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
		url: `${PUBLIC_URL}/blog/${slug}`,
		lastModified: new Date(),
		changeFrequency: "monthly",
		priority: 0.7,
	}));

	return [...staticRoutes, ...blogRoutes];
}
