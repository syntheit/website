/** @type {import("next").NextConfig} */
const config = {
  output: 'standalone',
  async redirects() {
    return [
      // /travel and /minigames were removed in the v2 redesign.
      { source: '/travel', destination: '/world', permanent: true },
      { source: '/minigames', destination: '/', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default config;
