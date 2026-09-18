import type { NextConfig } from "next"

function r2Hostname() {
  const url = process.env.NEXT_PUBLIC_R2_CDN_URL
  if (!url) return "cdn.your-domain.com"
  try {
    return new URL(url).hostname
  } catch {
    return "cdn.your-domain.com"
  }
}

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.shares.zrok.io"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: r2Hostname(),
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
