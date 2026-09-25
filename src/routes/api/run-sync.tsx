import { createHash, timingSafeEqual } from "node:crypto";
import { createFileRoute } from "@tanstack/react-router";
import { env } from "@/lib/env";
import { redis } from "@/lib/redis";

function isValidToken(token: string) {
	const expected = createHash("sha256").update(env.RUN_SYNC_TOKEN).digest();
	const received = createHash("sha256").update(token).digest();

	return timingSafeEqual(expected, received);
}

function json(data: unknown, status: number) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export const Route = createFileRoute("/api/run-sync")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				const authorization = request.headers.get("authorization") ?? "";
				const [scheme, token] = authorization.split(" ");

				if (scheme !== "Bearer" || !token || !isValidToken(token)) {
					return json({ message: "Unauthorized" }, 401);
				}

				const body = await request.json();

				await redis.set("samsung-health", JSON.stringify(body));

				return json({ message: "Sync started" }, 200);
			},
		},
	},
});
