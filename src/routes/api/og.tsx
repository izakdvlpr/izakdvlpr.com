import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/og")({
	server: {
		handlers: {
			GET: async ({ request }) => {
				const { default: satori } = await import("satori");
				const { Resvg } = await import("@resvg/resvg-js");

				const url = new URL(request.url);
				const title = url.searchParams.get("title") ?? "Isaque Lima";

				const [regular, bold] = await Promise.all([
					fetch(`${url.origin}/fonts/geist-regular.ttf`).then((response) =>
						response.arrayBuffer(),
					),
					fetch(`${url.origin}/fonts/geist-bold.ttf`).then((response) =>
						response.arrayBuffer(),
					),
				]);

				const element: any = {
					type: "div",
					props: {
						style: {
							height: "100%",
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
							backgroundColor: "#FFFFFF",
							position: "relative",
						},
						children: {
							type: "div",
							props: {
								style: {
									minWidth: 600,
									maxWidth: 960,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									textAlign: "center",
									color: "black",
									fontFamily: "Geist",
								},
								children: [
									{
										type: "span",
										props: {
											style: {
												fontSize: 60,
												fontWeight: 700,
												whiteSpace: "pre-wrap",
												wordBreak: "break-word",
											},
											children: title,
										},
									},
									{
										type: "div",
										props: {
											style: {
												marginTop: 10,
												width: 400,
												height: 2,
												opacity: 0.6,
												backgroundColor: "black",
											},
										},
									},
									{
										type: "span",
										props: {
											style: {
												marginTop: 10,
												fontSize: 40,
												fontWeight: 400,
											},
											children: "izakdvlpr.com",
										},
									},
								],
							},
						},
					},
				};

				const svg = await satori(element, {
					width: 1200,
					height: 630,
					fonts: [
						{ name: "Geist", data: regular, weight: 400, style: "normal" },
						{ name: "Geist", data: bold, weight: 700, style: "normal" },
					],
				});

				const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
					.render()
					.asPng();

				return new Response(new Uint8Array(png), {
					headers: {
						"Content-Type": "image/png",
						"Cache-Control": "public, max-age=86400",
					},
				});
			},
		},
	},
});
