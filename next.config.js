/** @type {import('next').NextConfig} */
const nextConfig = {
  // server: {
  //   port: 5000,
  // },
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
      'images.uzum.uz'
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
  i18n: {
    locales: ["uz", 'ru'],
    defaultLocale: "uz",
  },
};

module.exports = nextConfig;
