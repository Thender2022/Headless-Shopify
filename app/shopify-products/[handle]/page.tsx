// app/shopify-products/page.tsx
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";
import { ShopifyProductList } from "@/components/ui/shopify-product-list";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

async function getShopifyProducts() {
  // Check if Shopify credentials exist
  if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 
      !process.env.SHOPIFY_STORE_DOMAIN) {
    return [];
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
      variables: { first: 50 },
    });

    return data.products.edges.map(edge => edge.node);
  } catch (error) {
    console.error("Failed to fetch Shopify products:", error);
    return [];
  }
}

export default async function ShopifyProductsPage() {
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
        <div className="container mx-auto py-8 px-4 min-h-screen">
          <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
          <div className="max-w-2xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
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
        </div>
        <Footer />
      </>
    );
  }

  const products = await getShopifyProducts();
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        {products.length === 0 ? (
          <p className="text-center text-gray-600">No products found.</p>
        ) : (
          <Suspense fallback={<LoadingSpinner />}>
            <ShopifyProductList products={products} />
          </Suspense>
        )}
      </div>
      <Footer />
    </>
  );
}