import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rss.xml")({
	server: {
		handlers: {
			GET: async () => {
				const { Feed } = await import("feed");
				const { getAllPosts } = await import("#/lib/blog");
				const { PUBLIC_URL, USERNAME } = await import("#/lib/constants");

				const posts = await getAllPosts(undefined, false);

				const feed = new Feed({
					title: `${USERNAME}'s blog`,
					description:
						"Articles about software development, tools and other topics.",
					id: PUBLIC_URL,
					link: PUBLIC_URL,
					language: "en",
					image: `${PUBLIC_URL}/images/og.png`,
					favicon: `${PUBLIC_URL}/favicon.ico`,
					copyright: `All rights reserved ${new Date().getFullYear()}, ${USERNAME}`,
					feedLinks: {
						rss2: `${PUBLIC_URL}/rss.xml`,
					},
					author: {
						name: USERNAME,
						link: PUBLIC_URL,
					},
				});

				for (const post of posts) {
					const url = `${PUBLIC_URL}/blog/${post.slug}`;

					feed.addItem({
						title: post.title,
						id: url,
						link: url,
						description: post.description,
						date: new Date(post.date),
						category: post.tags.map((tag) => ({ name: tag })),
						image: post.thumbnail
							? `${PUBLIC_URL}${post.thumbnail}`
							: undefined,
					});
				}

				return new Response(feed.rss2(), {
					headers: {
						"Content-Type": "application/xml; charset=utf-8",
						"Cache-Control":
							"public, max-age=3600, stale-while-revalidate=86400",
					},
				});
			},
		},
	},
});
