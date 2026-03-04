import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  output: 'standalone',
  experimental: {
    largePageDataBytes: 128 * 1024 * 1024,
  },

  headers: async () => [
    {
      source: '/_next/static/media/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
        {
          key: 'Access-Control-Allow-Origin',
          value: '*',
        },
      ],
    },
  ],

  async redirects() {
    return [
      {
        source: '/service',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/service/',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/pricelist',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/pricelist/',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/contacts.php',
        destination: '/contacts',
        permanent: true,
      },
      {
        source: '/contacts.php/',
        destination: '/contacts',
        permanent: true,
      },
      {
        source: '/stock',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/stock/',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/zapchasti',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/zapchasti/',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/avtoservis-bmw-x5',
        destination: '/cars/bmw-x5',
        permanent: true,
      },
      {
        source: '/avtoservis-bmw-x5/',
        destination: '/cars/bmw-x5',
        permanent: true,
      },
      {
        source: '/remont-akpp',
        destination: '/remontAkpp',
        permanent: true,
      },
      {
        source: '/remont-akpp/',
        destination: '/remontAkpp',
        permanent: true,
      },
      {
        source: '/video',
        destination: '/',
        permanent: true,
      },
      {
        source: '/video/',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
