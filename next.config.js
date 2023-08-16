
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  reactStrictMode: true,
  swcMinify: true,

  // Uncoment to add domain whitelist
  images: {
    domains: [
      'images.unsplash.com',
      'plus.unsplash.com',
      'images.uzum.uz',
      'images.umarket.uz'
    ],
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  i18n,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
          },
        ],
      },
    ]
  },
};

module.exports = nextConfig;

const ContentSecurityPolicy = `
  default-src 'self' data:;
  script-src 'self' 'unsafe-eval' https://telegram.org https://va.vercel-scripts.com https://vitals.vercel-insights.com https://accounts.google.com/gsi/client;
  child-src 'self' https://telegram.org blob:;
  style-src 'self' 'unsafe-inline' https://telegram.org https://fonts.googleapis.com;
  img-src 'self' data: https://images.unsplash.com https://plus.unsplash.com https://images.uzum.uz https://images.umarket.uz;
  font-src 'self' https://telegram.org https://fonts.gstatic.com data:;
  frame-src https://oauth.telegram.org/;
  connect-src 'self' https://api.alijonov.com https://api.telegram.org https://oauth.telegram.org http://localhost:8000 https://vitals.vercel-insights.com;
`;