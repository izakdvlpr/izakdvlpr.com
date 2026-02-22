import { headers as allHeaders } from "next/headers";

export async function getIp(): Promise<string | null> {
	const headers = await allHeaders();

	const forwardedFor = headers.get("x-forwarded-for");
	const realIp = headers.get("x-real-ip");

	let ipAddress: string | null = null;

	if (forwardedFor) {
		ipAddress = forwardedFor?.split(",")?.[0]?.trim() as string;
	} else if (realIp) {
		ipAddress = realIp as string;
	} else {
		ipAddress = headers.get("cf-connecting-ip") ?? headers.get("x-client-ip") ?? (null as string | null);
	}

	return ipAddress;
}
