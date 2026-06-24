import { Code } from "lucide-react";

import { Image } from "#/components/ui/image";
import type { Discord } from "#/lib/types";

interface DiscordEditorWidgetProps {
	discord: Discord | null;
}

export function DiscordEditorWidget({ discord }: DiscordEditorWidgetProps) {
	return (
		<div className="md:col-span-2 col-span-1 h-37.5 p-5 flex flex-col gap-2 rounded-md bg-gray-100">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">Programming</h1>

				<Code size={18} />
			</div>

			<div className="flex gap-4">
				{discord?.activities?.editor ? (
					<div className="w-16 h-16 relative">
						<Image
							src={discord?.activities?.editor?.largeImage ?? ""}
							alt={discord?.activities?.editor?.largeText ?? ""}
							title={discord?.activities?.editor?.largeText ?? ""}
							width={64}
							height={64}
							className="w-16 h-16 rounded-md shrink-0 grayscale"
						/>

						<Image
							src={discord?.activities?.editor?.smallImage}
							alt={discord?.activities?.editor?.smallText}
							title={discord?.activities?.editor?.smallText}
							width={64}
							height={64}
							className="absolute -bottom-1.25 shrink-0 -right-1.25 w-6 h-6 rounded-full grayscale"
						/>
					</div>
				) : (
					<div className="w-16 h-16 rounded-md bg-gray-300 flex items-center justify-center">
						<Code size={28} className="text-gray-500" />
					</div>
				)}

				<div className="max-w-75 flex flex-col truncate">
					<h1 className="text-lg font-bold">Visual Studio Code</h1>

					<p className="text-sm text-ellipsis overflow-hidden">
						{discord?.activities?.editor?.details
							? discord?.activities?.editor?.details
							: "Not editing anything"}
					</p>

					<p className="text-sm text-ellipsis overflow-hidden">
						{discord?.activities?.editor?.state ?? ""}
					</p>

					<p className="text-sm">{discord?.activities?.editor?.time ?? ""}</p>
				</div>
			</div>
		</div>
	);
}
