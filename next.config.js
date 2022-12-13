/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true
  },
  images: {
    domains: ['images.unsplash.com', "lh3.googleusercontent.com"]
  }
}

module.exports = nextConfig
