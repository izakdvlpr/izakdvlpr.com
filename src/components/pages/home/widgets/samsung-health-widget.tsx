import { Footprints } from "lucide-react";

import type { SamsungHealth } from "@/lib/types";

interface SamsungHealthWidgetProps {
	samsungHealth: SamsungHealth | null;
}

const numberFormatter = new Intl.NumberFormat("en-US");
const distanceFormatter = new Intl.NumberFormat("en-US", {
	maximumFractionDigits: 1,
});

function formatNumber(value: number | null) {
	return value === null ? "-" : numberFormatter.format(value);
}

function formatDistance(value: number | null) {
	return value === null ? "-" : `${distanceFormatter.format(value)} km`;
}

// averagePace vem em minutos decimais por km (ex.: 5.5 → 5'30"/km)
function formatPace(value: number | null) {
	if (value === null || value <= 0) return "-";

	const minutes = Math.floor(value / 60);
	const seconds = value % 60;

	return `${minutes}'${String(seconds).padStart(2, "0")}"/km`;
}

export function SamsungHealthWidget({
	samsungHealth,
}: SamsungHealthWidgetProps) {
	const hasData =
		samsungHealth !== null &&
		[
			samsungHealth.todaySteps,
			samsungHealth.totalSteps,
			samsungHealth.totalKm,
			samsungHealth.averagePace,
		].some((value) => value !== null);

	return (
		<div className="md:col-span-4 col-span-1 p-5 flex flex-col gap-2 rounded-md bg-muted">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">Activity</h1>

				<Footprints size={18} />
			</div>

			{hasData ? (
				<div className="grid md:grid-cols-4 grid-cols-2 gap-2">
					<div>
						<p className="text-xs text-muted-foreground">Today steps</p>
						<p className="text-sm font-medium">
							{formatNumber(samsungHealth.todaySteps)}
						</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Total steps</p>
						<p className="text-sm font-medium">
							{formatNumber(samsungHealth.totalSteps)}
						</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Total distance</p>
						<p className="text-sm font-medium">
							{formatDistance(samsungHealth.totalKm)}
						</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Average pace</p>
						<p className="text-sm font-medium">
							{formatPace(samsungHealth.averagePace)}
						</p>
					</div>
				</div>
			) : (
				<p className="text-sm text-muted-foreground">
					No activity data available
				</p>
			)}
		</div>
	);
}
