import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	devIndicators: false,
	images: {
		remotePatterns: [
			{ hostname: "i.scdn.co" },
			{ hostname: "raw.githubusercontent.com" },
			{ hostname: "github.com" },
			{ hostname: "izakdvlpr.com" },
		],
	},
};

export default nextConfig;
