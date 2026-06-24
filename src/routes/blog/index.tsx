import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { getBlogList } from "@/lib/server/blog";

export const Route = createFileRoute("/blog/")({
	head: () => ({
		meta: [{ title: "Isaque Lima » Blog" }],
	}),
	validateSearch: (search: Record<string, unknown>): { tag?: string } =>
		typeof search.tag === "string" ? { tag: search.tag } : {},
	loaderDeps: ({ search: { tag } }) => ({ tag }),
	loader: ({ deps: { tag } }) => getBlogList({ data: { tag } }),
	component: PostListPage,
});

function PostListPage() {
	const { posts, tags } = Route.useLoaderData();

	return (
		<main className="mt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Blog</h1>

			<p>
				A blog about technology, programming, and everything else I find
				interesting.
			</p>

			<div className="flex flex-wrap items-center gap-2">
				<Link to="/blog" search={{ tag: undefined }}>
					<Badge>All</Badge>
				</Link>

				{tags.map((tag) => (
					<Link to="/blog" search={{ tag }} key={tag}>
						<Badge>{tag}</Badge>
					</Link>
				))}
			</div>

			{posts.map((post, index) => (
				<Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }}>
					<article className="flex flex-col gap-4">
						<div className="flex items-center">
							<Image
								src={post.thumbnail}
								alt={post.title}
								width={250}
								height={150}
								className="rounded-md grayscale shadow-lg md:flex hidden"
							/>

							<div className="flex flex-col justify-center gap-4 md:ml-4 ml-0">
								<h2 className="text-3xl font-bold">{post.title}</h2>

								<p className="text-lg text-gray-600">{post.description}</p>

								<p className="text-sm text-black">
									{post.date} • {post.words} words • {post.readingTime} •{" "}
									{post.views} views
								</p>

								<div className="flex items-center gap-2">
									{post.tags.map((tag) => (
										<Badge variant="outline" key={tag}>
											{tag}
										</Badge>
									))}
								</div>
							</div>
						</div>

						{index !== posts.length - 1 && (
							<hr className="my-4 border-gray-100" />
						)}
					</article>
				</Link>
			))}
		</main>
	);
}
