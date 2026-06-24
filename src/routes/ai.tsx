import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ai")({
	head: () => ({
		meta: [
			{ title: "Isaque Lima » AI & Intellectual Property" },
			{
				name: "description",
				content:
					"This page clarifies the terms of use of the content on this website in relation to artificial intelligence and intellectual property rights.",
			},
		],
	}),
	component: AIPage,
});

function AIPage() {
	return (
		<main className="mt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold">AI & Intellectual Property</h1>

			<p className="text-sm text-zinc-500">Last updated: February 24, 2026</p>

			<section className="flex flex-col gap-3">
				<h2 className="text-2xl font-bold">Ownership</h2>
				<p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
					All content published on this website — including but not limited to
					texts, articles, source code, design, images, and any other materials
					— is the exclusive intellectual property of{" "}
					<strong>Isaque Lima</strong> and is protected by applicable
					intellectual property laws.
				</p>
			</section>

			<section className="flex flex-col gap-3">
				<h2 className="text-2xl font-bold">AI Training Prohibition</h2>
				<p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
					The use of any content from this website for training, fine-tuning, or
					improving artificial intelligence models, large language models
					(LLMs), machine learning systems, or any automated data collection
					system is <strong>strictly prohibited</strong> without prior written
					consent from the author.
				</p>
				<p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
					This prohibition applies to, but is not limited to, bots, crawlers,
					scrapers, and automated agents operated by AI companies or research
					institutions.
				</p>
			</section>

			<section className="flex flex-col gap-3">
				<h2 className="text-2xl font-bold">Permitted Use</h2>
				<p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
					You may read, share, and reference the content on this website for
					personal, educational, or non-commercial purposes, provided that
					proper attribution is given to <strong>Isaque Lima</strong> with a
					link back to the original source.
				</p>
			</section>

			<section className="flex flex-col gap-3">
				<h2 className="text-2xl font-bold">Contact</h2>
				<p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
					For licensing inquiries, permissions, or any questions regarding the
					use of content on this website, please reach out via the{" "}
					<Link
						to="/contact"
						className="underline hover:text-blue-600 transition-colors"
					>
						contact page
					</Link>
					.
				</p>
			</section>
		</main>
	);
}
