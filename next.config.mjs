/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/inquiry',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
