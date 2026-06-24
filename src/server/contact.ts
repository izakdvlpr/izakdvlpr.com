import { createServerFn } from "@tanstack/react-start";
import { getRequestIP } from "@tanstack/react-start/server";
import { z } from "zod";

import { MAX_SEND_EMAILS, RATE_LIMIT_WINDOW_EXPIRATION } from "#/lib/constants";
import { sendEmail } from "#/lib/email";
import { redis } from "#/lib/redis";

export const sendEmailFn = createServerFn({ method: "POST" })
	.inputValidator(
		z.object({
			name: z.string(),
			email: z.string(),
			subject: z.string(),
			message: z.string(),
		}),
	)
	.handler(async ({ data }) => {
		const { name, email, subject, message } = data;

		const ip = getRequestIP({ xForwardedFor: true }) ?? "unknown";

		const key = `emails:ips:${ip}`;
		const currentLimit = await redis.incr(key);

		if (currentLimit === 1) {
			await redis.expire(key, Math.floor(RATE_LIMIT_WINDOW_EXPIRATION / 1000));
		}

		if (currentLimit > MAX_SEND_EMAILS) {
			return false;
		}

		const isSended = await sendEmail({
			subject,
			context: { name, subject, email, message },
		});

		return isSended;
	});
