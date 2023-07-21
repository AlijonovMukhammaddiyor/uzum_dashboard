/** @type {import('next-i18next').UserConfig} */
const path = require('path')


module.exports = {
  i18n: {
    locales: ["uz", 'ru'],
    defaultLocale: "uz",
  },
  fallbackLng: { default: ['uz'] },
  localePath: path.resolve('./public/locales'),
}