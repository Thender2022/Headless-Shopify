/** @type {import('next').NextConfig} */

const nextConfig = {
  outputFileTracingRoot: __dirname, // ✅ ensures correct workspace root
  images: {
    domains: ["files.stripe.com", "cdn.shopify.com"],   // Added Shopify CDN
  },
};

export default nextConfig;