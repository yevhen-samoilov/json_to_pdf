/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: "/api-docs",
          destination: "/api/docs",
        },
      ]
    },
    experimental: {
      optimizeCss: true,
      forceSwcTransforms: true,
    },
    webpack: (config, { isServer }) => {
      // Оптимизация размера сборки
      if (!isServer) {
        config.optimization.splitChunks.cacheGroups = {
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        };
      }
      return config;
    },
  }
  
  module.exports = nextConfig
  
  