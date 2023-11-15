const withBuilderDevTools = require('@builder.io/dev-tools/next')();

/** @type {import('next').NextConfig} */
const nextConfig = withBuilderDevTools({
  experimental: {
    ppr: true
  },
  reactStrictMode: true,
  transpilePackages: ['ui'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  }
});

module.exports = nextConfig;
