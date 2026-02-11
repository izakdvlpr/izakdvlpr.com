import { ImageResponse } from "@vercel/og";
import type { ServerRuntime } from "next";
import type { NextRequest } from "next/server";

async function getFonts(baseUrl: string) {
	const sources = [
		{
			name: "geist-sans-regular",
			style: "normal" as const,
			weight: 400 as const,
		},
		{
			name: "geist-sans-bold",
			style: "normal" as const,
			weight: 700 as const,
		},
	];

	const fonts = await Promise.all(
		sources.map(async (source) => {
			const response = await fetch(`${baseUrl}/fonts/${source.name}.ttf`);
			const data = await response.arrayBuffer();

			return {
				...source,
				data,
			};
		}),
	);

	return fonts;
}

export const runtime: ServerRuntime = "edge";

export async function GET(request: NextRequest): Promise<ImageResponse> {
	const title = request.nextUrl.searchParams.get("title") ?? "Isaque Lima";

	const fonts = await getFonts(request.nextUrl.origin);

	return new ImageResponse(
		<div
			style={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				backgroundColor: "#FFFFFF",
				position: "relative",
			}}
		>
			<h1
				style={{
					minWidth: 600,
					maxWidth: 960,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					textAlign: "center",
					color: "black",
					fontFamily: "geist-sans-bold",
				}}
			>
				<span
					style={{
						fontSize: "60px",
						whiteSpace: "pre-wrap",
						wordBreak: "break-word",
					}}
				>
					{title}
				</span>

				<div
					style={{
						marginTop: "10px",
						width: "400px",
						height: "2px",
						opacity: "0.6",
						backgroundColor: "black",
					}}
				/>

				<span
					style={{
						marginTop: "10px",
						fontSize: "40px",
						fontFamily: "geist-sans-regular",
					}}
				>
					izakdvlpr.com
				</span>
			</h1>
		</div>,
		{ fonts },
	);
}
