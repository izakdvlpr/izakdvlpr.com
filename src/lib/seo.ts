import type { ComponentProps } from "react";
import { PUBLIC_URL, USERNAME } from "@/lib/constants";

const SITE_NAME = "Isaque Lima";

interface SeoOptions {
	title: string;
	description: string;
	path: string;
	type?: "website" | "article";
	// Banner title; defaults to the page title.
	bannerTitle?: string;
	article?: {
		publishedTime: string;
		tags: string[];
	};
}

export function getBannerUrl(title: string): string {
	return `${PUBLIC_URL}/api/og?title=${encodeURIComponent(title)}`;
}

export function seo({
	title,
	description,
	path,
	type = "website",
	bannerTitle = title,
	article,
}: SeoOptions) {
	const fullTitle = `${SITE_NAME} » ${title}`;
	const url = `${PUBLIC_URL}${path}`;
	const image = getBannerUrl(bannerTitle);

	const meta: ComponentProps<"meta">[] = [
		{ title: fullTitle },
		{ name: "description", content: description },
		{ property: "og:title", content: fullTitle },
		{ property: "og:description", content: description },
		{ property: "og:type", content: type },
		{ property: "og:url", content: url },
		{ property: "og:site_name", content: SITE_NAME },
		{ property: "og:image", content: image },
		{ property: "og:image:width", content: "1200" },
		{ property: "og:image:height", content: "630" },
		{ property: "og:image:alt", content: bannerTitle },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:site", content: `@${USERNAME}` },
		{ name: "twitter:creator", content: `@${USERNAME}` },
		{ name: "twitter:title", content: fullTitle },
		{ name: "twitter:description", content: description },
		{ name: "twitter:image", content: image },
	];

	const scripts: ComponentProps<"script">[] = [];

	if (article) {
		// HeadContent dedupes meta by name/property, so repeated article:tag entries
		// would collapse into one; tags go to keywords and JSON-LD instead.
		meta.push(
			{ property: "article:published_time", content: article.publishedTime },
			{ property: "article:author", content: SITE_NAME },
			{ name: "keywords", content: article.tags.join(", ") },
		);

		const jsonLd = {
			"@context": "https://schema.org",
			"@type": "BlogPosting",
			headline: bannerTitle,
			description,
			url,
			image,
			datePublished: article.publishedTime,
			keywords: article.tags,
			author: { "@type": "Person", name: SITE_NAME, url: PUBLIC_URL },
		};

		scripts.push({
			type: "application/ld+json",
			// Escaping "<" keeps post content from closing the script tag early.
			children: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
		});
	}

	return {
		meta,
		links: [{ rel: "canonical", href: url }],
		scripts,
	};
}
