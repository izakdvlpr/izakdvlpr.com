import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { MDXRender } from "@/components/ui/mdx/mdx-render";
import { seo } from "@/lib/seo";
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

		return seo({
			title: loaderData.title,
			description: loaderData.description,
			path: `/blog/${loaderData.slug}`,
			type: "article",
			article: {
				publishedTime: loaderData.publishedAt,
				tags: loaderData.tags,
			},
		});
	},
	component: PostPage,
});

function PostPage() {
	const post = Route.useLoaderData();

	return (
		<main className="mt-10 flex flex-col">
			<section className="mb-6 flex flex-col gap-4">
				<h1 className="text-3xl font-extrabold">{post.title}</h1>

				<p className="text-sm text-foreground">
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
					className="rounded-md object-cover shadow-lg"
				/>
			</section>

			<MDXRender slug={post.slug} />
		</main>
	);
}
