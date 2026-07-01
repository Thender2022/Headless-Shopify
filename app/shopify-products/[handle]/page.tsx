// app/shopify-products/[handle]/page.tsx
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { AddToCartButton } from "./add-to-cart-button";
import { VariantSelector } from "./variant-selector";

// Define proper types
interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}

interface ProductImage {
  url: string;
  altText: string | null;
}

interface Product {
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
      node: ProductImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ProductVariant;
    }>;
  };
}

async function getShopifyProduct(handle: string): Promise<Product | null> {
  // Check if Shopify credentials exist
  if (!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || 
      !process.env.SHOPIFY_STORE_DOMAIN) {
    return null;
  }

  try {
    const { data } = await shopifyFetch<{
      productByHandle: Product;
    }>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    });

    return data.productByHandle;
  } catch (error) {
    console.error("Failed to fetch Shopify product:", error);
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;
  
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
        <div className="container mx-auto py-16 px-4 min-h-screen">
          <div className="max-w-2xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <h2 className="text-lg font-semibold text-yellow-800 mb-2">
                ⚠️ Shopify Integration Not Configured
              </h2>
              <p className="text-yellow-700">
                Add your Shopify credentials to <code className="bg-yellow-100 px-2 py-0.5 rounded">.env</code> to view products.
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

  const product = await getShopifyProduct(handle);

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto py-16 px-4 min-h-screen">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-gray-600">The product you&apos;re looking for doesn&apos;t exist.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const mainImage: ProductImage | undefined = product.images.edges[0]?.node;
  const variants: ProductVariant[] = product.variants.edges.map((edge) => edge.node);
  const price = product.priceRange.minVariantPrice;

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-16 px-4 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            {mainImage ? (
              <Image
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              {price.amount} {price.currencyCode}
            </p>
            <div className="prose prose-sm mb-6">
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Variant Selector */}
            {variants.length > 1 && (
              <VariantSelector variants={variants} />
            )}

            {/* Add to Cart Button */}
            <div className="mt-6">
              <AddToCartButton 
                variantId={variants[0]?.id || ""}
                available={variants[0]?.availableForSale || false}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}