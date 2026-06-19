import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipProxyUrlNormalize: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'fullscreen=(self)',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
