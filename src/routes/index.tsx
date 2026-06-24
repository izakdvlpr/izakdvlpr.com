import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "#/components/pages/home/hero";
import { Widgets } from "#/components/pages/home/widgets";
import { getStats } from "#/server/stats";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [{ title: "Isaque Lima » Home" }],
	}),
	loader: () => getStats(),
	component: Home,
});

function Home() {
	const stats = Route.useLoaderData();

	return (
		<main className="flex flex-col gap-4">
			<Hero />

			<Widgets initialData={{ stats }} />
		</main>
	);
}
