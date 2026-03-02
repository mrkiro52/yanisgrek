import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================
  // 🔴 ПРОБЛЕМА 1: Запросы, блокирующие отрисовку (900мс)
  // ============================================
  compress: true,
  productionBrowserSourceMaps: false,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 год кеша
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840], // оптимальные размеры
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  output: 'standalone',
  
  // ============================================
  // 🔴 ПРОБЛЕМА 2: Эффективный период хранения кеша (642 КиБ)
  // ============================================
  onDemandEntries: {
    maxInactiveAge: 60 * 1000, // 60 сек
    pagesBufferLength: 5,
  },

  experimental: {
    largePageDataBytes: 128 * 1024 * 1024,
    optimizePackageImports: [
      'embla-carousel',
      'embla-carousel-react',
      'framer-motion',
    ],
  },

  // ============================================
  // 🔴 ПРОБЛЕМА 6-7: Turbopack конфигурация для быстрой сборки
  // ============================================
  turbopack: {
    resolveAlias: {
      '@': './src',
    },
  },

  // ============================================
  // Заголовки для кеширования и оптимизации
  // ============================================
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
    // 🔴 ПРОБЛЕМА 2: Кеширование для изображений
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    // 🔴 ПРОБЛЕМА 1: Минимизировать блокирующие ресурсы
    {
      source: '/_next/static/chunks/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    // Предотвратить блокирующие шрифты
    {
      source: '/fonts/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],

  // ============================================
  // Перенаправления
  // ============================================
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

  // ============================================
  // Переписывание URL (для быстрого доступа)
  // ============================================
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap',
        },
        {
          source: '/robots.txt',
          destination: '/api/robots',
        },
      ],
    };
  },

  // 🔴 ПРОБЛЕМА 1: Минимизация достигается через Turbopack автоматически
  // Webpack конфиг удален для совместимости с Turbopack
};

export default nextConfig;
