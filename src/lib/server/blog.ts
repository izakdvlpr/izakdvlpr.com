import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

import { addViewToPost, getAllPosts, getPostBySlug, getTags } from "@/lib/blog";

export const getBlogList = createServerFn({ method: "GET" })
	.validator(z.object({ tag: z.string().optional() }))
	.handler(async ({ data }) => {
		const [posts, tags] = await Promise.all([getAllPosts(data.tag), getTags()]);

		return { posts, tags };
	});

export const getPost = createServerFn({ method: "GET" })
	.validator(z.object({ slug: z.string() }))
	.handler(async ({ data }) => {
		const post = await getPostBySlug(data.slug);

		if (post) {
			const ip = getRequestIP({ xForwardedFor: true }) ?? null;

			await addViewToPost({ slug: data.slug, ip });
		}

		return post;
	});
