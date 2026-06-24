import { Disc3 } from "lucide-react";

import { Image } from "@/components/ui/image";
import type { Lastfm } from "@/lib/types";

interface LastfmNowPlayingWidgetProps {
	lastfm: Lastfm;
}

export function LastfmNowPlayingWidget({
	lastfm,
}: LastfmNowPlayingWidgetProps) {
	const track = lastfm?.nowPlaying ?? lastfm?.lastPlayed;

	return (
		<div className="md:col-span-2 col-span-1 h-37.5 p-5 flex flex-col gap-2 rounded-md bg-gray-100">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">
					{lastfm.nowPlaying ? "Listening to music" : "Last listened track"}
				</h1>

				<Disc3 size={18} />
			</div>

			{track ? (
				<div className="flex gap-4">
					<Image
						src={track.imageUrl}
						alt={track.album}
						title={track.album}
						width={64}
						height={64}
						className="w-16 h-16 rounded-md grayscale"
					/>

					<div className="max-w-75 flex flex-col truncate">
						<a
							href={track.url}
							title={track.name}
							target="_blank"
							rel="noopener noreferrer"
							className="text-lg font-bold text-ellipsis overflow-hidden hover:underline hover:cursor-pointer"
						>
							{track.name}
						</a>

						<p
							title={track.album}
							className="text-sm text-ellipsis overflow-hidden"
						>
							{" "}
							{track.album}
						</p>

						<p
							title={track.artist}
							className="text-sm text-ellipsis overflow-hidden"
						>
							{track.artist}
						</p>
					</div>
				</div>
			) : (
				<p className="text-sm text-gray-500">No recent track found</p>
			)}
		</div>
	);
}
