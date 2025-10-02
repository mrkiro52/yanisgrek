import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,        
  productionBrowserSourceMaps: false, 
  optimizeFonts: true,   
  images: {
    formats: ['image/avif', 'image/webp'], 
    minimumCacheTTL: 31536000, 
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
  
};

export default nextConfig;


