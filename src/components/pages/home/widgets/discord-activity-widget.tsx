import {
	Activity,
	Gamepad2,
	type LucideIcon,
	Music,
	Radio,
	Trophy,
	Tv,
} from "lucide-react";

import { Image } from "@/components/ui/image";
import type { Discord, DiscordActivityType } from "@/lib/types";

interface DiscordActivityWidgetProps {
	discord: Discord | null;
}

const activityIcons: Record<DiscordActivityType, LucideIcon> = {
	playing: Gamepad2,
	streaming: Radio,
	listening: Music,
	watching: Tv,
	competing: Trophy,
};

export function DiscordActivityWidget({ discord }: DiscordActivityWidgetProps) {
	const activity = discord?.activities?.latest ?? null;
	const ActivityIcon = activity ? activityIcons[activity.type] : Activity;

	return (
		<div className="md:col-span-2 col-span-1 h-37.5 p-5 flex flex-col gap-2 rounded-md bg-muted">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">Discord Activity</h1>

				<ActivityIcon size={18} />
			</div>

			<div className="flex gap-4">
				{activity?.largeImage ? (
					<div className="w-16 h-16 relative shrink-0">
						<Image
							src={activity.largeImage}
							alt={activity.largeText ?? activity.name}
							title={activity.largeText ?? activity.name}
							width={64}
							height={64}
							className="w-16 h-16 rounded-md shrink-0"
						/>

						{activity.smallImage && (
							<Image
								src={activity.smallImage}
								alt={activity.smallText ?? ""}
								title={activity.smallText ?? ""}
								width={64}
								height={64}
								className="absolute -bottom-1.25 shrink-0 -right-1.25 w-6 h-6 rounded-full"
							/>
						)}
					</div>
				) : (
					<div className="w-16 h-16 shrink-0 rounded-md bg-accent-foreground/15 flex items-center justify-center">
						<ActivityIcon size={28} className="text-muted-foreground" />
					</div>
				)}

				<div className="max-w-75 flex flex-col truncate">
					<h1 className="text-lg font-bold truncate">
						{activity?.name ?? "Offline"}
					</h1>

					<p className="text-sm text-ellipsis overflow-hidden">
						{activity?.details ?? (activity ? "" : "No activity right now")}
					</p>

					<p className="text-sm text-ellipsis overflow-hidden">
						{activity?.state ?? ""}
					</p>

					<p className="text-sm">{activity?.time ?? ""}</p>
				</div>
			</div>
		</div>
	);
}
