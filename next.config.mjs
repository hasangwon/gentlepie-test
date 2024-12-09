import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: "/0/happiness",
  assetPrefix: "/0/happiness",
  output: "standalone",
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  // async rewrites() {
  //   const CHAT_API_URL =
  //     process.env.NODE_ENV === 'production'
  //       ? process.env.NEXT_PUBLIC_PRODUCT_CHAT_API_URL
  //       : process.env.NEXT_PUBLIC_CHAT_API_URL;
  //   return [
  //     {
  //       source: `${process.env.NEXT_PUBLIC_BASE_PATH}/gentle/:path*`,
  //       destination: `${CHAT_API_URL}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
