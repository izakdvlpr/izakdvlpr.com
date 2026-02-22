"use client";

import { useQuery } from "@tanstack/react-query";

import { LastfmNowPlayingWidget } from "./lastfm-now-playing-widget";
import { DiscordEditorWidget } from "./discord-editor-widget";
import { WakatimeWidget } from "./wakatime-widget";
import {
	type Discord,
	type Github,
	type Lastfm,
	type Wakatime,
	getDiscord,
	getGithub,
	getLastfm,
	getWakatime,
} from "@/lib/api";
import { GithubContributorsWidget } from "./github-contributors-widget";
import { LastfmLastTracksPlayedWidget } from './lastfm-last-tracks';
import { DiscordRecentPlayedWidget } from './discord-recent-played';

interface WidgetsProps {
	initialData: {
		discord: Discord;
		lastfm: Lastfm;
		wakatime: Wakatime;
		github: Github;
	};
}

export function Widgets({ initialData }: WidgetsProps) {
	const discordResponse = useQuery({
		queryKey: ["discord"],
		queryFn: () => getDiscord(),
		staleTime: 1000 * 60,
		initialData: initialData.discord,
	});

	const lastfmResponse = useQuery({
		queryKey: ["lastfm"],
		queryFn: () => getLastfm(),
		staleTime: 1000 * 60,
		initialData: initialData.lastfm,
	});

	const wakatimeResponse = useQuery({
		queryKey: ["wakatime"],
		queryFn: () => getWakatime(),
		staleTime: 1000 * 60,
		initialData: initialData.wakatime,
	});

	const githubResponse = useQuery({
		queryKey: ["github"],
		queryFn: () => getGithub(),
		staleTime: 1000 * 60,
		initialData: initialData.github,
	});

	return (
		<div className="grid gap-4 md:grid-cols-4 grid-cols-1">
			{discordResponse.isLoading &&
				lastfmResponse.isLoading &&
				wakatimeResponse.isLoading &&
				githubResponse.isLoading && (
					<>
						<div className="col-span-2 h-37.5 p-5 rounded-md bg-gray-100 animate-pulse"></div>
						<div className="col-span-2 h-37.5 p-5 rounded-md bg-gray-100 animate-pulse"></div>
						<div className="col-span-3 h-37.5 p-5 rounded-md bg-gray-100 animate-pulse"></div>
						<div className="col-span-1 h-37.5 p-5 rounded-md bg-gray-100 animate-pulse"></div>
					</>
				)}

			{discordResponse.data && lastfmResponse.data && wakatimeResponse.data && githubResponse.data && (
				<>
					<DiscordEditorWidget discord={discordResponse.data} />
					<LastfmNowPlayingWidget lastfm={lastfmResponse.data} />
					<GithubContributorsWidget github={githubResponse.data} />
					<WakatimeWidget wakatime={wakatimeResponse.data} />
          <DiscordRecentPlayedWidget discord={discordResponse.data} />
          <LastfmLastTracksPlayedWidget lastfm={lastfmResponse.data} />
				</>
			)}
		</div>
	);
}
