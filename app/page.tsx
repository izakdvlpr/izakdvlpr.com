import { Widgets } from "@/components/pages/home/widgets";
import { Hero } from "@/components/pages/home/hero";
import { getStats } from "@/lib/api";

export const dynamic = 'force-dynamic';

export default async function HomePage() {
	const stats = await getStats();

	return (
		<main className="flex flex-col gap-4">
			<Hero />

			<Widgets initialData={{ stats }} />
		</main>
	);
}
