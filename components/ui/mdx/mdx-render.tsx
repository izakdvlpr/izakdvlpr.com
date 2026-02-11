import { MDXRemote } from "next-mdx-remote/rsc";

import { MDXCodeBlock } from "@/components/ui/mdx/mdx-code-block";
import {
	MDXHeading1,
	MDXHeading2,
	MDXHeading3,
} from "@/components/ui/mdx/mdx-heading";
import { MDXParagraph } from "@/components/ui/mdx/mdx-paragraph";

interface MDXRenderProps {
	content: string;
}

export function MDXRender({ content }: MDXRenderProps) {
	return (
		<article className="flex flex-col gap-4">
			<MDXRemote
				source={content}
				components={{
					p: MDXParagraph,
					h1: MDXHeading1,
					h2: MDXHeading2,
					h3: MDXHeading3,
					pre: MDXCodeBlock,
				}}
			/>
		</article>
	);
}
