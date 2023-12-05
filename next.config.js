/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // disable type checking
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
