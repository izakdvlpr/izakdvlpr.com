import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
	DATAXAMAS_URL,
	DATAXAMAS_WEBSITE_ID,
	PUBLIC_URL,
} from "@/lib/constants";
import TanStackQueryDevtools from "../lib/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

const title = "Isaque Lima";
const description = "Full Stack Developer";

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title },
			{ name: "description", content: description },
			{ property: "og:title", content: title },
			{ property: "og:description", content: description },
			{ property: "og:type", content: "website" },
			{ property: "og:locale", content: "pt_BR" },
			{ property: "og:url", content: PUBLIC_URL },
			{
				property: "og:image",
				content: `${PUBLIC_URL}/api/og?title=${encodeURIComponent(title)}`,
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:site", content: "@izakdvlpr" },
			{ name: "twitter:creator", content: "@izakdvlpr" },
		],
		links: [
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "canonical", href: PUBLIC_URL },
			{ rel: "stylesheet", href: appCss },
		],
	}),
	errorComponent: ErrorPage,
	notFoundComponent: NotFoundPage,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />

				<script
					async
					src={`${DATAXAMAS_URL}/dataxamas.js`}
					data-website-id={DATAXAMAS_WEBSITE_ID}
					data-allow-localhost="true"
				/>

				<script
					defer
					data-cf-beacon='{"token": "1164f2eeb6034fcebd9aac5997ce8ba4"}'
					src="https://static.cloudflareinsights.com/beacon.min.js"
				/>

				<script
					dangerouslySetInnerHTML={{
						__html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9X4XZM7GBG');
            `,
					}}
				/>

				<script
					dangerouslySetInnerHTML={{
						__html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ukh6eodw9n");
            `,
					}}
				/>
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					disableTransitionOnChange
				>
					<div className="w-full max-w-225 h-screen mx-auto p-6 flex flex-col relative">
						<Header />

						{children}

						<Footer />
					</div>
				</ThemeProvider>

				<Toaster />

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>

				<Scripts />
			</body>
		</html>
	);
}

function ErrorPage() {
	return (
		<section className="w-full h-full flex flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">Error</h1>

			<p className="text-2xl">An error occurred.</p>

			<Button className="mt-4" asChild>
				<Link to="/">Back to home</Link>
			</Button>
		</section>
	);
}

function NotFoundPage() {
	return (
		<section className="w-full h-full flex flex-col items-center justify-center">
			<h1 className="text-6xl font-bold">404</h1>

			<p className="text-2xl">Not page found.</p>

			<Button className="mt-4" asChild>
				<Link to="/">Back to home</Link>
			</Button>
		</section>
	);
}
