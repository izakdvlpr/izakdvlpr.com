import type { Metadata } from "next";

import { AboutPage } from './client';

export const metadata: Metadata = {
	title: "Isaque Lima » About",
};

export default function () {
	return <AboutPage />
}
