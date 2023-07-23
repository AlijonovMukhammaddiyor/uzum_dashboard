
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
  default-src 'self';
  script-src 'self' 'unsafe-eval' https://telegram.org;
  child-src 'self' https://telegram.org blob:;
  style-src 'self' 'unsafe-inline' https://telegram.org https://fonts.googleapis.com;
  font-src 'self' https://telegram.org;
  frame-src https://oauth.telegram.org/;
  connect-src 'self' https://alijonov.com https://api.telegram.org https://oauth.telegram.org http://localhost:8000;
`;