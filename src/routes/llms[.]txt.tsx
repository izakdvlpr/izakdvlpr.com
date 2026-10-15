import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/llms.txt")({
	server: {
		handlers: {
			GET: async () => {
				const { getAllPosts } = await import("@/lib/blog");
				const { PUBLIC_URL } = await import("@/lib/constants");
				const { projects } = await import("@/lib/data");

				const posts = await getAllPosts(undefined, false);

				const pages = [
					["About", "/about", "Background, education and current work."],
					["Projects", "/projects", "Products and open source projects."],
					["Blog", "/blog", "Articles about software development and tools."],
					["Setup", "/setup", "Hardware and peripherals used daily."],
					["Contact", "/contact", "Social networks and resumes."],
					[
						"AI & Intellectual Property",
						"/ai",
						"Terms of use for AI systems and content licensing.",
					],
				];

				const body = [
					"# Isaque Lima",
					"",
					"> Full Stack Developer (TypeScript, React, Node.js) based in Brazil. Personal website with a technical blog, projects and contact information.",
					"",
					`AI assistants may read, summarize and cite this content when answering a user's request, with attribution and a link to the source. Using it to train or fine-tune models is prohibited; see ${PUBLIC_URL}/ai.`,
					"",
					"## Pages",
					"",
					...pages.map(
						([name, path, description]) =>
							`- [${name}](${PUBLIC_URL}${path}): ${description}`,
					),
					"",
					"## Blog",
					"",
					...posts.map(
						(post) =>
							`- [${post.title}](${PUBLIC_URL}/blog/${post.slug}): ${post.description}`,
					),
					"",
					"## Projects",
					"",
					...projects.map(
						(project) =>
							`- [${project.name}](${project.liveUrl ?? project.githubUrl ?? `${PUBLIC_URL}/projects`}): ${project.tagline} ${project.description}`,
					),
					"",
					"## Optional",
					"",
					`- [RSS feed](${PUBLIC_URL}/rss.xml): Full list of blog posts.`,
					`- [Sitemap](${PUBLIC_URL}/sitemap.xml): Every public URL.`,
					"",
				].join("\n");

				return new Response(body, {
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
						"Cache-Control": "public, max-age=3600",
					},
				});
			},
		},
	},
});
