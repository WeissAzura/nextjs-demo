/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "54.64.203.213",
        port: "",
        pathname: "/uploads/**",
      },
    ],
    loader: "custom",
    loaderFile: "./app/lib/imageLoader.js",
  },
};

module.exports = nextConfig;
