// import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "techgeekbuzz.com",
      "cdn.10minuteschool.com",
      "revolutionit.com.bd",
      "img.freepik.com",
    ],
  },
};

// if (process.env.NODE_ENV === "development") {
//   await setupDevPlatform();
// }

export default nextConfig;
