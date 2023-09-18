/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://www.uzanalitika.uz',
  generateRobotsTxt: true,
  exclude: ['/404'],
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  priority: 1,
};
