import { createFileRoute } from "@tanstack/react-router";

const AI_BOTS = [
	"Amazonbot",
	"Applebot-Extended",
	"Bytespider",
	"CCBot",
	"ClaudeBot",
	"Google-Extended",
	"GPTBot",
	"meta-externalagent",
];

export const Route = createFileRoute("/robots.txt")({
	server: {
		handlers: {
			GET: async () => {
				const { PUBLIC_URL } = await import("#/lib/constants");

				const body = [
					"User-agent: *",
					"Allow: /",
					"Disallow: /api/",
					"",
					...AI_BOTS.map((bot) => `User-agent: ${bot}`),
					"Disallow: /",
					"",
					`Sitemap: ${PUBLIC_URL}/sitemap.xml`,
					`Host: ${PUBLIC_URL}`,
					"",
				].join("\n");

				return new Response(body, {
					headers: {
						"Content-Type": "text/plain; charset=utf-8",
					},
				});
			},
		},
	},
});
