// app/shopify-products/page.tsx
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";
import { ShopifyProductList } from "@/components/ui/shopify-product-list";
import { Suspense } from "react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Navbar from "@/components/Navbar";

async function getShopifyProducts() {
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

  // Extract just the node data from edges
  return data.products.edges.map(edge => edge.node);
}

export default async function ShopifyProductsPage() {
  const products = await getShopifyProducts();
  
  return (
    <>
    <Navbar />
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <ShopifyProductList products={products} />
      </Suspense>
    </div>
    </>
  );
}