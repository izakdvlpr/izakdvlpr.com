import { Trophy } from "lucide-react";

import type { Psn } from "@/lib/types";

interface PsnTrophiesWidgetProps {
	psn: Psn | null;
}

const numberFormatter = new Intl.NumberFormat("en-US");

function formatNumber(value: number | null | undefined) {
	return value === null || value === undefined
		? "-"
		: numberFormatter.format(value);
}

export function PsnTrophiesWidget({ psn }: PsnTrophiesWidgetProps) {
	const hasData = psn !== null && psn.trophyLevel !== null;

	const items = [
		{ label: "Level", value: formatNumber(psn?.trophyLevel) },
		{
			label: "Progress",
			value: psn && psn.progress !== null ? `${psn.progress}%` : "-",
		},
		{ label: "Platinum", value: formatNumber(psn?.earnedTrophies?.platinum) },
		{ label: "Gold", value: formatNumber(psn?.earnedTrophies?.gold) },
		{ label: "Silver", value: formatNumber(psn?.earnedTrophies?.silver) },
		{ label: "Bronze", value: formatNumber(psn?.earnedTrophies?.bronze) },
	];

	return (
		<div className="md:col-span-4 col-span-1 p-5 flex flex-col gap-2 rounded-md bg-muted">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">Trophies</h1>

				<Trophy size={18} />
			</div>

			{hasData ? (
				<div className="grid md:grid-cols-6 grid-cols-3 gap-2">
					{items.map((item) => (
						<div key={item.label}>
							<p className="text-xs text-muted-foreground">{item.label}</p>
							<p className="text-sm font-medium">{item.value}</p>
						</div>
					))}
				</div>
			) : (
				<p className="text-sm text-muted-foreground">
					No trophy data available
				</p>
			)}
		</div>
	);
}
