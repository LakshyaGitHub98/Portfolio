/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  allowedDevOrigins: ["http://192.168.*"],
  basePath: "/Portfolio",
};

export default nextConfig;
