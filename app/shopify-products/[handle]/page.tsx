import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import { AddToCartButton } from "./add-to-cart-button";

// ⭐ ADD THIS - Enables ISR with tag-based revalidation
export const revalidate = 3600;

// FIX: Update interface to use Promise for params
interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

interface ProductResponse {
  productByHandle: {
    id: string;
    title: string;
    description: string;
    handle: string;
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
}

async function getProduct(handle: string) {
  try {
    const { data } = await shopifyFetch<ProductResponse>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
      tags: [`product-${handle}`] // ⭐ ADD THIS LINE
    });
    return data.productByHandle;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// FIX: Await the params before using it
export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params; // <-- Add await here
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const firstImage = product.images?.edges?.[0]?.node;
  const firstVariant = product.variants?.edges?.[0]?.node;

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {firstImage && (
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-2xl font-semibold mt-4">
              ${parseFloat(firstVariant?.price?.amount || "0").toFixed(2)}
            </p>
            <p className="text-gray-600 mt-4 whitespace-pre-wrap">
              {product.description}
            </p>
            <div className="mt-8">
              {firstVariant && (
                <AddToCartButton
                  variantId={firstVariant.id}
                  available={firstVariant.availableForSale}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}