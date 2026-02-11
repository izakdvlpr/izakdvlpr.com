import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ReportView } from "@/components/pages/blog/details/report-view";
import { Badge } from "@/components/ui/badge";
import { MDXRender } from "@/components/ui/mdx/mdx-render";
import { getPostBySlug, getSlugs } from "@/lib/blog";
import { PUBLIC_URL } from "@/utils";

interface PostDetailsPageProps {
	params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export function generateStaticParams(): { slug: string }[] {
	const slugs = getSlugs();

	return slugs.slice(0, 10).map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PostDetailsPageProps): Promise<Metadata> {
	const { slug } = await params;

	const post = await getPostBySlug(slug);

	if (!post) {
		return {};
	}

	const title = `${post.title} » Isaque Lima`;
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
					url: `${PUBLIC_URL}/api/og?title=${encodeURIComponent(post.title)}`,
					width: 1200,
					height: 630,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			creator: "@izakdvlpr",
			description: post.description,
			title,
			site: "@izakdvlpr",
			images: [
				{
					url: `${PUBLIC_URL}/api/og?title=${encodeURIComponent(post.title)}`,
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

	return (
		<main className="mt-10 flex flex-col">
			<section className="mb-6 flex flex-col gap-4">
				<h1 className="text-3xl font-extrabold">{post.title}</h1>

				<p className="text-sm text-black">
					{post.date} • {post.words} words • {post.readingTime}
				</p>

				<div className="flex gap-2">
					{post.tags.map((tag) => (
						<Link href={`/blog?tags=${tag}`} key={tag}>
							<Badge>{tag}</Badge>
						</Link>
					))}
				</div>
			</section>

			<ReportView slug={slug} />

			<MDXRender content={post.content} />
		</main>
	);
}
