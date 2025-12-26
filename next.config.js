/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable experimental app directory if using Next 13+
  experimental: {
    appDir: true,
  },
  webpack(config) {
    // Support path aliases from tsconfig.json
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': require('path').resolve(__dirname),
    };
    return config;
  },
};

module.exports = nextConfig;
