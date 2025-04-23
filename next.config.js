/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    DIRECTUS_URL_DO: process.env.DIRECTUS_URL_DO,
    DIRECTUS_IMAGE_DOMAIN_DO: process.env.DIRECTUS_IMAGE_DOMAIN_DO,
  },
  images: {
    remotePatterns: [`${process.env.DIRECTUS_IMAGE_DOMAIN_DO}`],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'data.muchixpainting.cc',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
}

module.exports = (nextConfig);
