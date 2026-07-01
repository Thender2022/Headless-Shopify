// app/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/ui/HeroSection";
import ProductsSection from "@/components/ui/ProductSection";
import BrandIntro from "@/components/ui/BrandIntro";
import NewsletterSignup from "@/components/ui/NewsSignUp";
import ImageGrid from "@/components/ui/ImageGrid";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";

async function getShopifyProducts() {
  // Check if Shopify credentials exist
  if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 
      !process.env.SHOPIFY_STORE_DOMAIN) {
    return []; // Return empty array if not configured
  }

  try {
    const { data } = await shopifyFetch<{
      products: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            description: string;
            handle: string;
            priceRange: {
              minVariantPrice: {
                amount: string;
                currencyCode: string;
              };
            };
            images: {
              edges: Array<{
                node: {
                  url: string;
                  altText: string | null;
                };
              }>;
            };
            variants: {
              edges: Array<{
                node: {
                  id: string;
                  title: string;
                  price: {
                    amount: string;
                    currencyCode: string;
                  };
                  availableForSale: boolean;
                };
              }>;
            };
          };
        }>;
      };
    }>({
      query: GET_PRODUCTS,
      variables: { first: 3 },
    });

    return data.products.edges.map(edge => edge.node);
  } catch (error) {
    console.error("Failed to fetch Shopify products:", error);
    return []; // Return empty array on error
  }
}

export default async function HomePage() {
  // Check if Shopify credentials exist
  const shopifyConfigured = !!(
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN && 
    process.env.SHOPIFY_STORE_DOMAIN
  );

  // If not configured, show fallback
  if (!shopifyConfigured) {
    return (
      <>
        <Navbar />
        <main className="bg-white min-h-screen">
          <HeroSection />
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg max-w-2xl">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                ⚠️ Shopify Integration Not Configured
              </h2>
              <p className="text-yellow-700">
                Add your Shopify credentials to <code className="bg-yellow-100 px-2 py-0.5 rounded">.env</code> to display products.
              </p>
              <p className="text-sm text-yellow-600 mt-2">
                Required: <code className="bg-yellow-100 px-2 py-0.5 rounded">SHOPIFY_STOREFRONT_ACCESS_TOKEN</code> and <code className="bg-yellow-100 px-2 py-0.5 rounded">SHOPIFY_STORE_DOMAIN</code>
              </p>
            </div>
          </div>
          <BrandIntro />
          <ImageGrid />
          <NewsletterSignup />
        </main>
        <Footer />
      </>
    );
  }

  // Fetch products only if configured
  const products = await getShopifyProducts();

  return (
    <>
      <Navbar />
      <main className="bg-white min-h-screen">
        <HeroSection />
        <ProductsSection products={products} />
        <BrandIntro />
        <ImageGrid />
        <NewsletterSignup />
      </main>
      <Footer />
    </>
  );
}