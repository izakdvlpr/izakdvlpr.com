import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { getAllPosts, getTags } from "@/lib/blog";

export const revalidate = 60;

export const metadata: Metadata = {
	title: "Isaque Lima » Blog",
};

interface PostListPageProps {
	searchParams: Promise<{
		tag?: string;
	}>;
}

export default async function PostListPage({ searchParams }: PostListPageProps) {
	const { tag } = await searchParams;

	const posts = await getAllPosts(tag);
	const tags = await getTags();

	return (
		<main className="mt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Blog</h1>

			<p>A blog about technology, programming, and everything else I find interesting.</p>

			<div className="flex flex-wrap items-center gap-2">
				<Link href="/blog">
					<Badge>All</Badge>
				</Link>

				{tags.map((tag) => (
					<Link href={`/blog?tag=${tag}`} key={tag}>
						<Badge>{tag}</Badge>
					</Link>
				))}
			</div>

			{posts.map((post, index) => (
				<Link key={post.slug} href={`/blog/${post.slug}`}>
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
									{post.date} • {post.words} words • {post.readingTime} • {post.views} views
								</p>
                
                <div className="flex items-center gap-2">
                  {post.tags.map((tag) => (
                    <Badge variant="outline" key={tag}>{tag}</Badge>
                  ))}
                </div>
							</div>
						</div>

						{index !== posts.length - 1 && <hr className="my-4 border-gray-100" />}
					</article>
				</Link>
			))}
		</main>
	);
}
