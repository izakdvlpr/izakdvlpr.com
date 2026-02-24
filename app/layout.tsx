import "./global.css";

import type { Metadata } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";

import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-provider";
import { PUBLIC_URL } from "@/lib/constants";
import { ReactQueryProvider } from "@/providers/react-query-provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const title = "Isaque Lima";
const description = "Full Stack Developer";

export const metadata: Metadata = {
	title,
	icons: {
		icon: "/favicon.ico",
	},
	description,
	alternates: {
		canonical: PUBLIC_URL,
	},
	openGraph: {
		title,
		type: "website",
		locale: "pt_BR",
		url: PUBLIC_URL,
		description,
		images: [
			{
				url: `${PUBLIC_URL}/api/og?title=${encodeURIComponent("Isaque Lima")}`,
				width: 1200,
				height: 630,
			},
		],
	},
	twitter: {
		creator: "@izakdvlpr",
		site: "@izakdvlpr",
		card: "summary_large_image",
	},
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<Script
					async
					src="https://dataxamas.izakdvlpr.com/dataxamas.js"
					data-website-id="4cb1fc6f-b4d1-4f0e-98ed-017e3042d48f"
				/>

				<Script
					defer
					data-cf-beacon='{"token": "1164f2eeb6034fcebd9aac5997ce8ba4"}'
					src="https://static.cloudflareinsights.com/beacon.min.js"
				/>

				<Script
					id="ga-init"
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9X4XZM7GBG');
            `,
					}}
				/>

				<Script id="ms-clarity" strategy="afterInteractive">
					{`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "ukh6eodw9n");
          `}
				</Script>
			</head>

			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="white" disableTransitionOnChange>
					<ReactQueryProvider>
						<div className="w-full max-w-225 h-screen mx-auto p-6 flex flex-col relative">
							<Header />

							{children}

							<Footer />
						</div>
					</ReactQueryProvider>
				</ThemeProvider>

				<Toaster />
			</body>
		</html>
	);
}
