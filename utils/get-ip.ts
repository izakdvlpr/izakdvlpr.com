import { headers as allHeaders } from "next/headers";

export async function getIp() {
	const headers = await allHeaders();

	const ip = headers.get("x-real-ip") ?? "127.0.0.1";

	return ip;
}
