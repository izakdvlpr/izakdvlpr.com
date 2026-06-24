import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
	head: () => ({
		meta: [{ title: "Isaque Lima » About" }],
	}),
	component: AboutPage,
});

function getAge() {
	const birthDate = new Date("2003-04-01");
	const today = new Date();

	let age = today.getFullYear() - birthDate.getFullYear();

	const monthDiff = today.getMonth() - birthDate.getMonth();

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDate.getDate())
	) {
		age--;
	}

	return age;
}

function AboutPage() {
	return (
		<main className="mt-10 flex flex-col gap-4">
			<h1 className="text-3xl font-bold">About</h1>

			<p className="text-lg text-black">
				I'm Isaque Lima, a {getAge()}-year-old systems analyst holding a degree
				in Systems Analysis and Development from the University of Vila Velha.
				I'm passionate about technology and programming.
			</p>

			<p className="text-lg text-black">
				I've been working as a developer since 2018, building experience with
				TypeScript, React and Node.js. Currently, I work at{" "}
				<a
					href="https://strim.com.br"
					target="_blank"
					rel="noopener noreferrer"
					className="underline hover:text-blue-600 transition-colors"
				>
					Strim
				</a>
				, an asset integrity startup, where I develop modern web applications,
				API integrations, and scalable solutions.
			</p>

			<p className="text-lg text-black">
				I'm constantly improving my skills in software architecture, performance
				optimization, and full-stack development, aiming to create practical and
				innovative solutions that positively impact people and businesses.
			</p>
		</main>
	);
}
