import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/pages/home/hero";
import { Widgets } from "@/components/pages/home/widgets";
import { seo } from "@/lib/seo";
import { getStats } from "@/lib/server/stats";

export const Route = createFileRoute("/")({
	head: () =>
		seo({
			title: "Home",
			description:
				"Full Stack Developer. Passionate about programming, technology and pizza.",
			path: "/",
			bannerTitle: "Isaque Lima",
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
