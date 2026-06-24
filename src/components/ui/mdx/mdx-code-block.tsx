import type { HTMLAttributes, PropsWithChildren } from "react";
import { toast } from "sonner";

import { Badge } from "#/components/ui/badge";

type MDXCodeBlockProps = PropsWithChildren<HTMLAttributes<HTMLPreElement>>;

export function MDXCodeBlock(props: MDXCodeBlockProps) {
	const preProps = (props.children as any)?.props;
	const code = preProps?.children as string;
	const language = preProps?.className?.replace("language-", "")?.toUpperCase();

	function handleCopyCode() {
		try {
			navigator.clipboard.writeText(code);

			toast.success("Code copied to clipboard!");
		} catch (error) {
			console.error(error);

			toast.error("Failed to copy code to clipboard.");
		}
	}

	return (
		<div className="p-4 flex flex-col overflow-x-auto rounded-md border-2 border-black bg-gray-100">
			<div className="mb-4 flex items-center justify-between">
				<span className="text-xs font-semibold text-black uppercase">
					{language ?? "Unknown"}
				</span>

				<Badge className="cursor-pointer" onClick={handleCopyCode}>
					Copy
				</Badge>
			</div>

			<pre className="font-mono" {...props} />
		</div>
	);
}
