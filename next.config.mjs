/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warnings for WalletConnect
  webpack: (config, context) => {
    if (config.plugins) {
      config.plugins.push(
        new context.webpack.IgnorePlugin({
          resourceRegExp: /^(lokijs|pino-pretty|encoding)$/,
        })
      );
    }
    return config;
  },
  // Allow Pinata images (and add any other domains you need)
  images: {
    domains: ["gateway.pinata.cloud", "gateway.irys.xyz"],
  },
};

export default nextConfig;
