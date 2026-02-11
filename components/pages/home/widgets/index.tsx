"use client";

import { useQuery } from "@tanstack/react-query";

import { ListenToMusicWidget } from "./listen-to-music-widget";
import { ProgrammingWidget } from "./programming-widget";
import { CodingTimeWidget } from "./coding-time-widget";
import { getStats, Stats } from "@/lib/api";
import { ContributorsWidget } from "./contributors-widget";

interface WidgetsProps {
	initialData: { stats: Stats };
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
					<ProgrammingWidget programming={statsResponse.data?.programming} />
					<ListenToMusicWidget
						listenToMusic={statsResponse.data?.listenToMusic}
					/>
					<ContributorsWidget contributors={statsResponse.data?.contributors} />
					<CodingTimeWidget codingTime={statsResponse.data?.codingTime} />
				</>
			)}
		</div>
	);
}
