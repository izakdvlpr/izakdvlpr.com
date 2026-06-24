import { Music } from "lucide-react";
import { useState } from "react";

import { Image } from "#/components/ui/image";
import type { Lastfm } from "#/lib/types";

interface LastfmLastTracksPlayedWidgetProps {
	lastfm: Lastfm | null;
}

function TrackImage({ src, alt }: { src: string; alt: string }) {
	const [error, setError] = useState(false);

	if (error) {
		return (
			<div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center shrink-0">
				<Music size={16} />
			</div>
		);
	}

	return (
		<Image
			src={src}
			alt={alt}
			width={40}
			height={40}
			className="w-10 h-10 rounded-md shrink-0 grayscale"
			onError={() => setError(true)}
		/>
	);
}

export function LastfmLastTracksPlayedWidget({
	lastfm,
}: LastfmLastTracksPlayedWidgetProps) {
	return (
		<div className="md:col-span-2 col-span-1 p-5 flex flex-col gap-2 rounded-md bg-gray-100">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">Last Tracks</h1>

				<Music size={18} />
			</div>

			{lastfm?.tracks && lastfm.tracks.length > 0 ? (
				<ul className="space-y-3">
					{lastfm.tracks.map((track, index) => (
						<li key={index} className="flex items-center gap-3">
							{track.imageUrl ? (
								<TrackImage src={track.imageUrl} alt={track.name} />
							) : (
								<div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center shrink-0">
									<Music size={16} />
								</div>
							)}
							<div className="max-w-75 flex flex-col truncate">
								<a
									href={track.url}
									title={track.name}
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm font-medium text-ellipsis overflow-hidden hover:underline hover:cursor-pointer"
								>
									{track.name}
								</a>

								<p className="text-xs text-gray-600">{track.artist}</p>
							</div>
						</li>
					))}
				</ul>
			) : (
				<p className="mt-4 text-sm text-gray-500">
					No recent tracks available.
				</p>
			)}
		</div>
	);
}
