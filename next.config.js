/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['127.0.0.1'],
    },
    experimental: {
        serverActions: true,
    },
}

module.exports = nextConfig
