import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Isaque Lima » Not Found",
};

export default function NotFoundPage() {
	return (
		<section className="w-full h-full flex flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">404</h1>

			<p className="text-2xl">Not page found.</p>

			<Button className="mt-4">
				<Link href="/">Back to home</Link>
			</Button>
		</section>
	);
}
