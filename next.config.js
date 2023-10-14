/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    swcPlugins: [['@swc-jotai/react-refresh', {}]],
  },
  images: {
    domains: ["image.tmdb.org"]
  }
}

module.exports = nextConfig
