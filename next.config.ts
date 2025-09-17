import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // In production, Next.js optimizes remote images by proxying through
    // /_next/image. That requires the server to reach the icon hosts, which
    // isn't possible for many of our internal URLs when running in Kubernetes.
    // Disabling optimization lets the browser fetch icons directly.
    unoptimized: true,
    // Allow SVG icons (including data: URLs) safely.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
