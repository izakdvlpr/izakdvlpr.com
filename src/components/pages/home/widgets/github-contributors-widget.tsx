import HeatMap, { type SVGProps } from "@uiw/react-heat-map";
import { GitBranch } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Github } from "#/lib/types";

interface GithubContributorsWidgetProps {
	github: Github | null;
}

function getDateSuffix(day: number) {
	if (day > 3 && day < 21) return "th";

	return ["th", "st", "nd", "rd"][day % 10] || "th";
}

function formatNumber(value: number) {
	const formatter = new Intl.NumberFormat("en-US");

	return formatter.format(value);
}

function getCalendarDateProps() {
	const today = new Date();
	const sixMonthsAgo = new Date();

	sixMonthsAgo.setMonth(today.getMonth() - 12);

	return {
		startDate: sixMonthsAgo,
		endDate: today,
	};
}

const renderRect =
	(handleMouseEnter: (date: string) => void): SVGProps["rectRender"] =>
	(props, data) => {
		const date = new Date(data.date);

		const formattedDate = `${date.toLocaleDateString("en-US", { month: "long" })} ${date.getDate()}${getDateSuffix(date.getDate())}, ${date.getFullYear()}`;

		const tileInfo = `${data.count ? formatNumber(data.count) : "No"} contributions on ${formattedDate}`;

		return (
			<rect
				className="transition-all hover:brightness-125"
				onMouseEnter={() => handleMouseEnter(tileInfo)}
				{...props}
			/>
		);
	};

export function GithubContributorsWidget({
	github,
}: GithubContributorsWidgetProps) {
	const defaultValue = `${formatNumber(github?.totalContributions ?? 0)} contributions in the last year`;

	const [hoveredTile, setHoveredTile] = useState<string | null>(defaultValue);
	const scrollRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
		}
	}, [github]);

	return (
		<div className="md:col-span-3 col-span-1 h-50 p-5 rounded-md bg-gray-100">
			<div className="flex items-center gap-2 justify-between mb-2">
				<div className="flex items-center gap-2">
					<h1 className="text-md font-medium">Github Contributions</h1>
					<GitBranch size={18} />
				</div>

				{github && <span className="text-sm text-gray-600">{hoveredTile}</span>}
			</div>

			{github ? (
				<div
					ref={scrollRef}
					className="overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden"
					style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
				>
					<HeatMap
						{...getCalendarDateProps()}
						onMouseLeave={() => setHoveredTile(defaultValue)}
						value={github.items}
						weekLabels={false}
						monthLabels={false}
						legendCellSize={0}
						style={{ color: "#fff" }}
						rectProps={{ rx: 4 }}
						rectRender={renderRect((date) => setHoveredTile(date))}
						height={100}
						width={700}
						panelColors={{
							"1": "#fff",
							"2": "#a0a0a0",
							"3": "#696969",
							"4": "#2a2a2a",
						}}
					/>
				</div>
			) : (
				<p className="text-sm text-gray-500">No contribution data available.</p>
			)}

			{github?.lastPushedAt && (
				<p className="mt-2 text-sm text-gray-600">
					Last pushed on{" "}
					{new Date(github.lastPushedAt).toLocaleDateString("en-US", {
						month: "long",
						day: "numeric",
						year: "numeric",
					})}
				</p>
			)}
		</div>
	);
}
