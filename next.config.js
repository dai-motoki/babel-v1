/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: { appDir: true } の行を削除または以下のようにコメントアウト
  // experimental: { appDir: true },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
  },

}

module.exports = nextConfig
