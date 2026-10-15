import { createFileRoute } from "@tanstack/react-router";

// Crawlers that collect content for model training. Blocked per the /ai page.
const AI_TRAINING_BOTS = [
	"Amazonbot",
	"anthropic-ai",
	"Applebot-Extended",
	"Bytespider",
	"CCBot",
	"ClaudeBot",
	"cohere-training-data-crawler",
	"Google-Extended",
	"GPTBot",
	"meta-externalagent",
];

// Agents fetching pages on behalf of a user or for AI search answers. They match
// their own group and skip "*", so the group repeats the default rules.
const AI_USER_AGENTS = [
	"ChatGPT-User",
	"Claude-SearchBot",
	"Claude-User",
	"OAI-SearchBot",
	"Perplexity-User",
	"PerplexityBot",
];

export const Route = createFileRoute("/robots.txt")({
	server: {
		handlers: {
			GET: async () => {
				const { PUBLIC_URL } = await import("@/lib/constants");

				const defaultRules = ["Allow: /", "Allow: /api/og", "Disallow: /api/"];

				const body = [
					"User-agent: *",
					...defaultRules,
					"",
					...AI_USER_AGENTS.map((bot) => `User-agent: ${bot}`),
					...defaultRules,
					"",
					...AI_TRAINING_BOTS.map((bot) => `User-agent: ${bot}`),
					"Disallow: /",
					"",
					`# LLM-friendly summary: ${PUBLIC_URL}/llms.txt`,
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
