import { useQuery } from "@tanstack/react-query";
import type { Stats } from "#/lib/types";
import { getStats } from "#/server/stats";
import { DiscordEditorWidget } from "./discord-editor-widget";
import { DiscordRecentPlayedWidget } from "./discord-recent-played";
import { GithubContributorsWidget } from "./github-contributors-widget";
import { LastfmLastTracksPlayedWidget } from "./lastfm-last-tracks";
import { LastfmNowPlayingWidget } from "./lastfm-now-playing-widget";
import { WakatimeWidget } from "./wakatime-widget";

interface WidgetsProps {
	initialData: {
		stats: Stats;
	};
}

export function Widgets({ initialData }: WidgetsProps) {
	const statsResponse = useQuery({
		queryKey: ["stats"],
		queryFn: () => getStats(),
		staleTime: 1000 * 60,
		initialData: initialData.stats,
	});

	return (
		<div className="grid gap-4 md:grid-cols-4 grid-cols-1">
			{statsResponse.isLoading && (
				<>
					<div className="col-span-2 h-37.5 p-5 rounded-md bg-gray-100 animate-pulse"></div>
					<div className="col-span-2 h-37.5 p-5 rounded-md bg-gray-100 animate-pulse"></div>
					<div className="col-span-3 h-37.5 p-5 rounded-md bg-gray-100 animate-pulse"></div>
					<div className="col-span-1 h-37.5 p-5 rounded-md bg-gray-100 animate-pulse"></div>
				</>
			)}

			{statsResponse.data && (
				<>
					<DiscordEditorWidget discord={statsResponse.data.discord} />
					<LastfmNowPlayingWidget lastfm={statsResponse.data.lastfm} />
					<GithubContributorsWidget github={statsResponse.data.github} />
					<WakatimeWidget wakatime={statsResponse.data.wakatime} />
					<DiscordRecentPlayedWidget discord={statsResponse.data.discord} />
					<LastfmLastTracksPlayedWidget lastfm={statsResponse.data.lastfm} />
				</>
			)}
		</div>
	);
}
