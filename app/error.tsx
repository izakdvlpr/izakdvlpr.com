"use client";

import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Isaque Lima » Error",
};

export default function ErrorPage() {
	return (
		<section className="w-full h-full flex flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">Error</h1>

			<p className="text-2xl">An error occurred.</p>

			<Button className="mt-4">
				<Link href="/">Back to home</Link>
			</Button>
		</section>
	);
}
