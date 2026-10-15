import { createFileRoute } from "@tanstack/react-router";
import type { Renderer } from "takumi-js/node";
import { z } from "zod";

const searchSchema = z.object({
	title: z.string().trim().min(1).max(120).catch("Isaque Lima"),
});

let rendererPromise: Promise<Renderer> | undefined;

// Fonts are registered once per server instance; a failed load is not cached.
function getRenderer(origin: string): Promise<Renderer> {
	rendererPromise ??= (async () => {
		const { Renderer } = await import("takumi-js/node");

		const [regular, bold] = await Promise.all(
			["geist-regular", "geist-bold"].map((font) =>
				fetch(`${origin}/fonts/${font}.ttf`).then((response) =>
					response.arrayBuffer(),
				),
			),
		);

		const renderer = new Renderer();

		await renderer.registerFont({ name: "Geist", data: regular, weight: 400 });
		await renderer.registerFont({ name: "Geist", data: bold, weight: 700 });

		return renderer;
	})().catch((error: unknown) => {
		rendererPromise = undefined;

		throw error;
	});

	return rendererPromise;
}

function Banner({ title }: { title: string }) {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#FFFFFF",
			}}
		>
			<div
				style={{
					minWidth: 600,
					maxWidth: 960,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					color: "black",
					fontFamily: "Geist",
				}}
			>
				<span
					style={{
						fontSize: 60,
						fontWeight: 700,
						whiteSpace: "pre-wrap",
						wordBreak: "break-word",
					}}
				>
					{title}
				</span>

				<div
					style={{
						marginTop: 10,
						width: 400,
						height: 2,
						opacity: 0.6,
						backgroundColor: "black",
					}}
				/>

				<span style={{ marginTop: 10, fontSize: 40, fontWeight: 400 }}>
					izakdvlpr.com
				</span>
			</div>
		</div>
	);
}

export const Route = createFileRoute("/api/og")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const { render } = await import("takumi-js");

				const url = new URL(request.url);
				const { title } = searchSchema.parse(
					Object.fromEntries(url.searchParams),
				);

				const renderer = await getRenderer(url.origin);

				const png = await render(<Banner title={title} />, {
					renderer,
					width: 1200,
					height: 630,
					format: "png",
				});

				return new Response(new Uint8Array(png), {
					headers: {
						"Content-Type": "image/png",
						"Cache-Control": "public, max-age=86400, immutable",
					},
				});
			},
		},
	},
});
