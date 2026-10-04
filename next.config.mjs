/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // External packages to exclude from server-side bundling
  serverExternalPackages: ['jose'],
};

export default nextConfig;
