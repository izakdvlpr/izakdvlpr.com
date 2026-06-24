import { MDXProvider } from "@mdx-js/react";
import { type ComponentProps, type ComponentType, lazy, Suspense } from "react";

import { MDXCodeBlock } from "./mdx-code-block";
import { MDXHeading1, MDXHeading2, MDXHeading3 } from "./mdx-heading";
import { MDXParagraph } from "./mdx-paragraph";

// Lazy importers for every compiled MDX post, keyed by "/posts/<slug>.mdx".
const posts = import.meta.glob("/posts/*.mdx") as Record<
	string,
	() => Promise<{
		default: ComponentType<{ components?: Record<string, unknown> }>;
	}>
>;

const components = {
	p: MDXParagraph,
	h1: MDXHeading1,
	h2: MDXHeading2,
	h3: MDXHeading3,
	pre: MDXCodeBlock,
	ul: (props: ComponentProps<"ul">) => (
		<ul className="list-disc pl-6 flex flex-col gap-0.5" {...props} />
	),
	ol: (props: ComponentProps<"ol">) => (
		<ol className="list-disc pl-6 flex flex-col gap-0.5" {...props} />
	),
	li: (props: ComponentProps<"li">) => <li className="pl-1" {...props} />,
};

interface MDXRenderProps {
	slug: string;
}

export function MDXRender({ slug }: MDXRenderProps) {
	const importer = posts[`/posts/${slug}.mdx`];

	if (!importer) {
		return null;
	}

	const Content = lazy(importer);

	return (
		<article className="flex flex-col gap-4">
			<MDXProvider components={components}>
				<Suspense fallback={null}>
					<Content />
				</Suspense>
			</MDXProvider>
		</article>
	);
}
