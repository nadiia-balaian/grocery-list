/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/grocery-list',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
