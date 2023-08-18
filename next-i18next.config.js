/** @type {import('next-i18next').UserConfig} */
const path = require('path');

module.exports = {
  i18n: {
    locales: ['uz', 'ru'],
    defaultLocale: 'ru',
  },
  fallbackLng: { default: ['ru'] },
  localePath: path.resolve('./public/locales'),
};
