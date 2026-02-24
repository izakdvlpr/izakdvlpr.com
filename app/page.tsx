import { Widgets } from "@/components/pages/home/widgets";
import { Hero } from "@/components/pages/home/hero";
import { getStats } from "@/lib/api";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "Isaque Lima » Home",
};

export default async function HomePage() {
	const stats = await getStats();

	return (
		<main className="flex flex-col gap-4">
			<Hero />

			<Widgets initialData={{ stats }} />
		</main>
	);
}
