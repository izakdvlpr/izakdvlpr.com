import { Widgets } from "@/components/pages/home/widgets";
import { Hero } from "@/components/pages/home/hero";
import { getDiscord, getGithub, getLastfm, getWakatime } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
	const discord = await getDiscord();
	const lastfm = await getLastfm();
	const wakatime = await getWakatime();
	const github = await getGithub();

	return (
		<main className="flex flex-col gap-4">
			<Hero />

			<Widgets
				initialData={{
					discord,
					lastfm,
					wakatime,
					github,
				}}
			/>
		</main>
	);
}
