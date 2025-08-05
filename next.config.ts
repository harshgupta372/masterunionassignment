/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.mastersunion.link', // This is the missing entry
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;