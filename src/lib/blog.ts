import dayjs from "dayjs";
import matter from "gray-matter";
import readingTime from "reading-time";

import { VIEW_EXPIRATION } from "@/lib/constants";
import { redis } from "@/lib/redis";

export interface Post {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	thumbnail: string;
	readingTime: string;
	words: number;
	content: string;
	views: number;
}

const rawGlob = import.meta.glob("../../posts/*.mdx", {
	query: "?raw-md",
	import: "default",
	eager: true,
}) as Record<string, string>;

function slugFromPath(filePath: string): string {
	return filePath.split("/").slice(-1)[0].replace(".mdx", "");
}

const rawPosts: Record<string, string> = Object.fromEntries(
	Object.entries(rawGlob).map(([filePath, source]) => [
		slugFromPath(filePath),
		source,
	]),
);

function isSlug(slug: string): boolean {
	return /^[a-z0-9-]+$/.test(slug);
}

export function getSlugs(): string[] {
	return Object.keys(rawPosts);
}

export async function getTags(): Promise<string[]> {
	const tags = new Set<string>();

	for (const source of Object.values(rawPosts)) {
		const { data } = matter(source);

		if (Array.isArray(data.tags)) {
			for (const tag of data.tags) {
				tags.add(tag);
			}
		}
	}

	return Array.from(tags);
}

export async function getPostBySlug(
	slug: string,
	fetchViews = true,
): Promise<Post | null> {
	if (!isSlug(slug)) {
		return null;
	}

	const source = rawPosts[slug];

	if (!source) {
		return null;
	}

	const times = readingTime(source);

	const {
		data: { title, description, date, tags, thumbnail },
		content,
	} = matter(source);

	const views = fetchViews
		? await redis
				.get(`posts:${slug}`)
				.then(Number)
				.catch(() => 0)
		: 0;

	return {
		slug,
		title,
		description,
		date: dayjs(date).format("MMMM D, YYYY"),
		tags: tags ?? [],
		thumbnail,
		readingTime: times.text,
		words: times.words,
		content,
		views,
	};
}

export async function getAllPosts(
	tag?: string,
	fetchViews = true,
): Promise<Post[]> {
	const posts = await Promise.all(
		getSlugs().map((slug) => getPostBySlug(slug, fetchViews)),
	);

	return posts
		.filter((post): post is Post => Boolean(post))
		.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix())
		.filter((post) => (tag ? post.tags.includes(tag) : true));
}

export async function addViewToPost({
	slug,
	ip,
}: {
	slug: string;
	ip: string | null;
}) {
	if (!ip) {
		return false;
	}

	const isViewed = await redis.get(`posts:${slug}:ips:${ip}`);

	if (isViewed) {
		return false;
	}

	await redis.set(`posts:${slug}:ips:${ip}`, "true", "EX", VIEW_EXPIRATION);
	await redis.incr(`posts:${slug}`);

	return true;
}
