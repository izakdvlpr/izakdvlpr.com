import { Clock } from "lucide-react";

import type { CodingTime } from "@/lib/api";

interface CodingTimeWidgetProps {
	codingTime: CodingTime | null;
}

export function CodingTimeWidget({ codingTime }: CodingTimeWidgetProps) {
	return (
		<div className="col-span-1 h-[200px] p-5 flex flex-col gap-2 rounded-md bg-gray-100">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">Coding Time</h1>

				<Clock size={18} />
			</div>

			{codingTime ? (
				<div className="flex flex-col gap-2">
					<div className="grid grid-cols-2 gap-2">
						<div>
							<p className="text-xs text-gray-600">All time</p>
							<p className="text-sm font-medium">{codingTime.allTime}</p>
						</div>
						<div>
							<p className="text-xs text-gray-600">30 days</p>
							<p className="text-sm font-medium">{codingTime.last30Days}</p>
						</div>
						<div>
							<p className="text-xs text-gray-600">7 days</p>
							<p className="text-sm font-medium">{codingTime.last7Days}</p>
						</div>
						<div>
							<p className="text-xs text-gray-600">Daily average</p>
							<p className="text-sm font-medium">{codingTime.avgDaily}</p>
						</div>
						<div className="col-span-2">
							<p className="text-xs text-gray-600">Top language</p>
							<p className="text-sm font-medium">{codingTime.topLanguage}</p>
						</div>
					</div>
				</div>
			) : (
				<p className="text-sm text-gray-500">No coding data available</p>
			)}
		</div>
	);
}
