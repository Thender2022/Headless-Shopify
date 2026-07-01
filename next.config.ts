/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["files.stripe.com", "cdn.shopify.com"],
  },
};

export default nextConfig;