import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NextImage from "next/image";

import { Badge } from "@/components/ui/badge";
import { MDXRender } from "@/components/ui/mdx/mdx-render";
import { addViewToPost, getPostBySlug, getSlugs } from "@/lib/blog";
import { PUBLIC_URL, USERNAME } from "@/lib/constants";
import { getIp } from "@/utils/get-ip";

interface PostDetailsPageProps {
	params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export function generateStaticParams(): { slug: string }[] {
	const slugs = getSlugs();

	return slugs.slice(0, 10).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostDetailsPageProps): Promise<Metadata> {
	const { slug } = await params;

	const post = await getPostBySlug(slug);

	if (!post) {
		return {};
	}

	const title = `Isaque Lima » ${post.title}`;
	const url = `${PUBLIC_URL}/blog/${slug}`;

	return {
		title,
		description: post.description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			url,
			title,
			type: "article",
			section: "Blog",
			description: post.description,
			tags: post.tags,
			publishedTime: new Date(post.date ?? 0).toISOString(),
			images: [
				{
					url: `${PUBLIC_URL}${post.thumbnail}`,
					width: 1200,
					height: 630,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			creator: `@${USERNAME}`,
			description: post.description,
			title,
			site: `@${USERNAME}`,
			images: [
				{
					url: `${PUBLIC_URL}${post.thumbnail}`,
					width: 1200,
					height: 630,
				},
			],
		},
	};
}

export default async function PostPage({ params }: PostDetailsPageProps) {
	const { slug } = await params;

	const post = await getPostBySlug(slug);

	if (!post) {
		notFound();
	}

	const ip = await getIp();

	await addViewToPost({ slug, ip });

	return (
		<main className="mt-10 flex flex-col">
			<section className="mb-6 flex flex-col gap-4">
				<h1 className="text-3xl font-extrabold">{post.title}</h1>

				<p className="text-sm text-black">
					{post.date} • {post.words} words • {post.readingTime} • {post.views} views
				</p>

				<div className="flex gap-2">
					{post.tags.map((tag) => (
						<Link href={`/blog?tag=${tag}`} key={tag}>
							<Badge>{tag}</Badge>
						</Link>
					))}
				</div>
        
        <NextImage
          src={post.thumbnail}
          alt={post.title}
          width={1200}
          height={630}
          className="rounded-md object-cover grayscale shadow-lg"
        />
			</section>

			<MDXRender content={post.content} />
		</main>
	);
}
