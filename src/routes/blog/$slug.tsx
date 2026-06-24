import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { MDXRender } from "@/components/ui/mdx/mdx-render";
import { PUBLIC_URL, USERNAME } from "@/lib/constants";
import { getPost } from "@/lib/server/blog";

export const Route = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		const post = await getPost({ data: { slug: params.slug } });

		if (!post) {
			throw notFound();
		}

		return post;
	},
	head: ({ loaderData }) => {
		if (!loaderData) {
			return {};
		}

		const post = loaderData;
		const url = `${PUBLIC_URL}/blog/${post.slug}`;
		const title = `Isaque Lima » ${post.title}`;
		const description = `${post.description}\n\n${post.date} • ${post.words} words • ${post.readingTime} • ${post.views} views\n\n${post.tags.join(", ")}\n\nBy @${USERNAME}`;
		const image = `${PUBLIC_URL}${post.thumbnail}`;

		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:type", content: "article" },
				{ property: "og:url", content: url },
				{ property: "og:image", content: image },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: image },
				{ name: "twitter:creator", content: `@${USERNAME}` },
			],
			links: [{ rel: "canonical", href: url }],
		};
	},
	component: PostPage,
});

function PostPage() {
	const post = Route.useLoaderData();

	return (
		<main className="mt-10 flex flex-col">
			<section className="mb-6 flex flex-col gap-4">
				<h1 className="text-3xl font-extrabold">{post.title}</h1>

				<p className="text-sm text-black">
					{post.date} • {post.words} words • {post.readingTime} • {post.views}{" "}
					views
				</p>

				<div className="flex gap-2">
					{post.tags.map((tag) => (
						<Link to="/blog" search={{ tag }} key={tag}>
							<Badge>{tag}</Badge>
						</Link>
					))}
				</div>

				<Image
					src={post.thumbnail}
					alt={post.title}
					width={1200}
					height={630}
					className="rounded-md object-cover grayscale shadow-lg"
				/>
			</section>

			<MDXRender slug={post.slug} />
		</main>
	);
}
