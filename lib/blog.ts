import fs from "node:fs";
import path from "node:path";
import dayjs from "dayjs";
import fg from "fast-glob";
import matter from "gray-matter";
import readingTime from "reading-time";

// import { VIEW_EXPIRATION } from '@/utils'
// import { redis } from './redis'

interface Post {
	slug: string;
	title: string;
	description: string;
	date: string;
	tags: string[];
	thumbnail: string;
	readingTime: string;
	words: number;
	content: string;
	// views: number
}

function isSlug(slug: string): boolean {
	return /^[a-z0-9-]+$/.test(slug);
}

function getSlug(filePath: string) {
	return filePath.split("/").slice(-1)[0].replace(".mdx", "");
}

function getFiles() {
	return fg.sync("posts/*.mdx", { cwd: process.cwd() });
}

export async function getAllPosts(): Promise<Post[]> {
	const files = getFiles();

	const posts = await Promise.all(
		files.map(async (filePath) => {
			const slug = getSlug(filePath);
			const post = await getPostBySlug(slug, false);

			return post as Post;
		}),
	);

	return posts
		.filter(Boolean)
		.sort((a, b) => dayjs(b.date).unix() - dayjs(a.date).unix());
}

export function getSlugs(): string[] {
	const files = getFiles();

	return files.map(getSlug);
}

export function getTags(posts: Post[]): string[] {
	const tags = posts.flatMap((post) => post.tags);

	return [...new Set(tags)];
}

export async function getPostBySlug(
	slug: string,
	fetchViews = true,
): Promise<Post | null> {
	if (!isSlug(slug)) {
		return null;
	}

	try {
		const filePath = path.join(process.cwd(), "posts", `${slug}.mdx`);
		const source = await fs.promises.readFile(filePath, "utf-8");

		const times = readingTime(source);

		const {
			data: { title, description, date, tags, thumbnail },
			content,
		} = matter(source);

		// const views = fetchViews
		//   ? await redis
		//       .get(`posts:${slug}`)
		//       .then(Number)
		//       .catch(() => 0)
		//   : 0

		return {
			slug,
			title,
			description,
			date: dayjs(date).format("MMMM D, YYYY"),
			tags,
			thumbnail,
			readingTime: times.text,
			words: times.words,
			content,
			// views,
		};
	} catch {
		return null;
	}
}

export async function addViewToPost({
	slug,
	ip,
}: {
	slug: string;
	ip: string;
}) {
	// const isViewed = await redis.get(`posts:${slug}:ips:${ip}`)

	// if (isViewed) {
	//   return false
	// }

	// await redis.set(`posts:${slug}:ips:${ip}`, 'true', 'EX', VIEW_EXPIRATION)
	// await redis.incr(`posts:${slug}`)

	return true;
}
