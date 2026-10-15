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
	optimizeDeps: { exclude: ["takumi-js", "@takumi-rs/core"] },
	ssr: { external: ["takumi-js", "@takumi-rs/core"] },
	plugins: [
		devtools(),
		// takumi-js loads its native backend dynamically: bundling drops the named
		// exports and partial tracing misses files, so trace the whole package.
		nitro({ traceDeps: ["takumi-js*"] }),
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
