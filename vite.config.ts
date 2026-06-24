import fs from "node:fs";
import path from "node:path";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { defineConfig } from "vite";

// @mdx-js/rollup compiles every `.mdx` (it strips the query first), so Vite's
// `?raw` can't return markdown text. This plugin serves the raw source via a
// virtual id (`?raw-md`) that the MDX plugin never sees — used by lib/blog.ts
// for frontmatter + reading-time. Content is inlined at build, fs-read in dev.
const RAW_SUFFIX = "?raw-md";
const RAW_PREFIX = "\0raw-md:";
function rawMdxPlugin() {
	return {
		name: "raw-mdx",
		enforce: "pre" as const,
		resolveId(id: string, importer: string | undefined) {
			if (id.endsWith(RAW_SUFFIX)) {
				const rel = id.slice(0, -RAW_SUFFIX.length);
				const abs = importer ? path.resolve(path.dirname(importer), rel) : rel;
				return RAW_PREFIX + abs;
			}
		},
		load(id: string) {
			if (id.startsWith(RAW_PREFIX)) {
				const file = id.slice(RAW_PREFIX.length);
				return `export default ${JSON.stringify(fs.readFileSync(file, "utf-8"))}`;
			}
		},
	};
}

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	// @resvg/resvg-js ships a native .node binding — keep it external so Vite's
	// dep optimizer / bundler never tries to inline it (server-only, used in /api/og).
	optimizeDeps: { exclude: ["@resvg/resvg-js"] },
	ssr: { external: ["@resvg/resvg-js"] },
	plugins: [
		devtools(),
		nitro({ rollupConfig: { external: [/^@sentry\//] } }),
		tailwindcss(),
		rawMdxPlugin(),
		{
			enforce: "pre",
			...mdx({
				remarkPlugins: [
					remarkFrontmatter,
					[remarkMdxFrontmatter, { name: "frontmatter" }],
					remarkGfm,
				],
				providerImportSource: "@mdx-js/react",
			}),
		},
		tanstackStart(),
		viteReact(),
	],
});

export default config;
