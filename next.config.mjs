/** @type {import('next').NextConfig} */
const nextConfig = {
  trustHost: true,
  images: {
    domains: [
      "techgeekbuzz.com",
      "cdn.10minuteschool.com",
      "revolutionit.com.bd",
      "img.freepik.com",
    ],
  },
};

export default nextConfig;
