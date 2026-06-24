import { Gamepad2 } from "lucide-react";

import { Image } from "#/components/ui/image";
import type { Discord } from "#/lib/types";

interface DiscordRecentPlayedWidgetProps {
	discord: Discord | null;
}

export function DiscordRecentPlayedWidget({
	discord,
}: DiscordRecentPlayedWidgetProps) {
	return (
		<div className="md:col-span-2 col-span-1 flex flex-col gap-2 p-5 rounded-md bg-gray-100">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">Recent Played Games</h1>

				<Gamepad2 size={18} />
			</div>

			{discord?.recentPlayed && discord.recentPlayed.length > 0 ? (
				<ul className="space-y-3">
					{discord.recentPlayed.map((game, index) => (
						<li key={index} className="flex items-center gap-3">
							{game.iconUrl ? (
								<Image
									src={game.iconUrl}
									alt={game.gameName}
									width={40}
									height={40}
									className="w-10 h-10 rounded-md shrink-0 grayscale"
								/>
							) : (
								<div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center">
									<Gamepad2 size={16} />
								</div>
							)}

							<div className="max-w-75 flex flex-col truncate">
								<p className="text-sm font-medium text-ellipsis overflow-hidden">
									{game.gameName}
								</p>
								<p className="text-xs text-gray-600">{game.playedAt}</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-4 text-sm text-gray-500">
					No recent played games available.
				</p>
			)}
		</div>
	);
}
