import { MDXRemote } from "next-mdx-remote/rsc";

import { MDXCodeBlock } from "./mdx-code-block";
import { MDXHeading1, MDXHeading2, MDXHeading3 } from "./mdx-heading";
import { MDXParagraph } from "./mdx-paragraph";

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
          ul: (props) => (
						<ul className="list-disc pl-6 flex flex-col gap-0.5" {...props} />
					),
					ol: (props) => (
						<ol className="list-disc pl-6 flex flex-col gap-0.5" {...props} />
					),
					li: (props) => (
						<li className="pl-1" {...props} />
					),
				}}
			/>
		</article>
	);
}
