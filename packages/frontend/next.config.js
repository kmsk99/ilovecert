/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-pdf/renderer'],
  webpack: config => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      canvas: false,
      'canvas-dither': false,
    };
    config.externals.push('pino-pretty', 'encoding');

    return config;
  },
};

module.exports = nextConfig;
