import type { NextConfig } from "next"

import { RESUME_FILE } from "./lib/site-content"

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
  allowedDevOrigins: ["*.shares.zrok.io", "sentrasera.localhost"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: r2Hostname(),
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: RESUME_FILE.legacyHref,
        destination: RESUME_FILE.href,
        permanent: true,
      },
    ]
  },
}

export default nextConfig
