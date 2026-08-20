import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // O deploy Linux usa standalone; no Windows local o pnpm cria symlinks que
  // podem falhar no tracing quando o Developer Mode não está habilitado.
  output: process.platform === "win32" ? undefined : "standalone",
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
