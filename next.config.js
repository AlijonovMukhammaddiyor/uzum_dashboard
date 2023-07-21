/** @type {import('next-i18next').UserConfig} */
/** @type {import('next').NextConfig} */


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
  i18n: {
    locales: ["uz", 'ru'],
    defaultLocale: "uz",
  },
};

module.exports = nextConfig;
