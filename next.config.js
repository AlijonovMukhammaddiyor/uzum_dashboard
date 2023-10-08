
/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const withTM = require("next-transpile-modules")(["echarts", "zrender"]);

const nextConfig = withTM({
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

  // transpilePackages: ['@ui', '@utils', '@hooks', '@components', '@constants', '@types', '@services', '@utils', '@store', '@config'],

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
});

module.exports = nextConfig;