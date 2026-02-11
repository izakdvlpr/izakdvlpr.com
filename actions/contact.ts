"use server";

import { sendEmail } from "@/lib/email";
import { redis } from "@/lib/redis";
import { MAX_SEND_EMAILS, RATE_LIMIT_WINDOW_EXPIRATION } from "@/utils";
import { getIp } from "@/utils/get-ip";

interface SendEmailActionData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export async function sendEmailAction(data: SendEmailActionData) {
	const { name, email, subject, message } = data;

	const ip = await getIp();

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

	if (!isSended) {
		return false;
	}

	return true;
}
