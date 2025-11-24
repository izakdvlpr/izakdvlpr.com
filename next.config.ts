import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: false,
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      { hostname: 'i.scdn.co' },
      { hostname: 'raw.githubusercontent.com' },
      { hostname: 'github.com' },
    ],
  },
}

export default nextConfig
