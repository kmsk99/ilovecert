/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // SSR과 CSR 불일치 해결을 위한 설정
  compiler: {
    styledComponents: true,
  },
  // Web3 관련 폴리필 설정
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
}

module.exports = nextConfig 