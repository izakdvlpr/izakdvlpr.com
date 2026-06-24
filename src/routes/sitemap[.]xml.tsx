import { createFileRoute } from "@tanstack/react-router";

interface SitemapEntry {
	url: string;
	changeFrequency: string;
	priority: number;
}

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: async () => {
				const { getSlugs } = await import("@/lib/blog");
				const { PUBLIC_URL } = await import("@/lib/constants");

				const staticRoutes: SitemapEntry[] = [
					{ url: PUBLIC_URL, changeFrequency: "daily", priority: 1 },
					{
						url: `${PUBLIC_URL}/about`,
						changeFrequency: "monthly",
						priority: 0.8,
					},
					{
						url: `${PUBLIC_URL}/blog`,
						changeFrequency: "weekly",
						priority: 0.9,
					},
					{
						url: `${PUBLIC_URL}/setup`,
						changeFrequency: "monthly",
						priority: 0.7,
					},
					{
						url: `${PUBLIC_URL}/contact`,
						changeFrequency: "yearly",
						priority: 0.6,
					},
					{ url: `${PUBLIC_URL}/ai`, changeFrequency: "yearly", priority: 0.5 },
				];

				const blogRoutes: SitemapEntry[] = getSlugs().map((slug) => ({
					url: `${PUBLIC_URL}/blog/${slug}`,
					changeFrequency: "monthly",
					priority: 0.7,
				}));

				const lastModified = new Date().toISOString();

				const entries = [...staticRoutes, ...blogRoutes]
					.map(
						(entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
					)
					.join("\n");

				const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;

				return new Response(xml, {
					headers: {
						"Content-Type": "application/xml; charset=utf-8",
					},
				});
			},
		},
	},
});
