import { setup } from '@/lib/data';
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/setup")({
	head: () => ({
		meta: [{ title: "Isaque Lima » Setup" }],
	}),
	component: SetupPage,
});

function SetupPage() {
	return (
		<main className="mt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold">Setup</h1>

			<p className="text-lg text-black dark:text-white/70">
				Hardware and peripherals I use on a daily basis.
			</p>

			<div className="flex flex-col gap-4">
				{setup.map((category) => (
					<section key={category.title} className="flex flex-col gap-3">
						<h2 className="text-xl font-semibold border-b pb-2">
							{category.title}
						</h2>
						<ul className="flex flex-col gap-2">
							{category.items.map((item, index) => (
								<li
									key={`${item.name}-${index}`}
									className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2 border-b border-dashed last:border-0"
								>
									<span className="font-medium text-sm text-black/60 dark:text-white/50 uppercase tracking-wide min-w-35">
										{item.name}
									</span>
									{item.description && (
										<span className="text-base text-black dark:text-white/90 sm:text-right">
											{item.description}
										</span>
									)}
								</li>
							))}
						</ul>
					</section>
				))}
			</div>
		</main>
	);
}
