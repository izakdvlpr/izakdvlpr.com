'use client'

import { Code } from "lucide-react";
import Image from "next/image";

import type { Programming } from "@/lib/api";

interface ProgrammingWidgetProps {
	programming: Programming | null;
}

export function ProgrammingWidget({ programming }: ProgrammingWidgetProps) {
	return (
		<div className="md:col-span-2 col-span-1  h-[150px] p-5 flex flex-col gap-2 rounded-md bg-gray-100">
			<div className="flex items-center gap-2">
				<h1 className="text-md font-medium">Programming</h1>

				<Code size={18} />
			</div>

			<div className="flex gap-4">
				{programming ? (
					<div className="w-16 h-16 relative">
						<Image
							src={programming.largeImage}
							alt={programming.largeText}
							title={programming.largeText}
							width={64}
							height={64}
							className="w-16 h-16 rounded-md flex-shrink-0 grayscale"
						/>

						<Image
							src={programming.smallImage}
							alt={programming.smallText}
							title={programming.smallText}
							width={64}
							height={64}
							className="absolute bottom-[-5px] flex-shrink-0 right-[-5px] w-6 h-6 rounded-full grayscale"
						/>
					</div>
				) : (
					<div className="w-16 h-16 rounded-md bg-gray-300 flex items-center justify-center">
						<Code size={28} className="text-gray-500" />
					</div>
				)}

				<div className="max-w-[300px] flex flex-col truncate">
					<h1 className="text-lg font-bold">Visual Studio Code</h1>

					<p className="text-sm text-ellipsis overflow-hidden">
						{programming?.details ?? "Not currently programming"}
					</p>

					<p className="text-sm text-ellipsis overflow-hidden">
						{programming?.state ?? ""}
					</p>

					<p className="text-sm">{programming?.time ?? ""}</p>
				</div>
			</div>
		</div>
	);
}
