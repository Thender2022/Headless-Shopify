// app/shopify-products/[handle]/page.tsx
import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";
import { AddToCartButton } from "./add-to-cart-button";
import { VariantSelector } from "./variant-selector";
import { ImageGallery } from "./image-galery";
import Navbar from "@/components/Navbar";

// Types for the product data
interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
        width: number;
        height: number;
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
        quantityAvailable: number;
        selectedOptions: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  options: Array<{
    id: string;
    name: string;
    values: string[];
  }>;
  tags: string[];
  vendor: string;
  productType: string;
}

async function getProduct(handle: string): Promise<ShopifyProduct | null> {
  const { data } = await shopifyFetch<{
    productByHandle: ShopifyProduct | null;
  }>({
    query: GET_PRODUCT_BY_HANDLE,
    variables: { handle },
  });

  return data.productByHandle;
}

// Generate static params for all products (optional - for static export)
export async function generateStaticParams() {
  const { data } = await shopifyFetch<{
    products: { edges: Array<{ node: { handle: string } }> };
  }>({
    query: `
      query GetProductHandles {
        products(first: 100) {
          edges {
            node {
              handle
            }
          }
        }
      }
    `,
  });

  return data.products.edges.map(({ node }) => ({
    handle: node.handle,
  }));
}

interface PageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { handle } = await params;
  
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  const allImages = product.images.edges.map(edge => edge.node);
  const variants = product.variants.edges.map(edge => edge.node);
  
  // Check if product has multiple variants
  const hasVariants = variants.length > 1;
  const singlePrice = product.priceRange.minVariantPrice.amount === product.priceRange.maxVariantPrice.amount;
  const priceRange = singlePrice 
    ? `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)}`
    : `$${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(2)} - $${parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(2)}`;

  // Get default variant (first available, or first overall)
  const defaultVariant = variants.find(v => v.availableForSale) || variants[0];

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery - Now with clickable thumbnails */}
          <ImageGallery images={allImages} productTitle={product.title} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.vendor && (
                <p className="text-sm text-gray-500 mb-1">{product.vendor}</p>
              )}
              <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
              {product.productType && (
                <p className="text-sm text-gray-500 mt-1">{product.productType}</p>
              )}
            </div>

            <div className="border-t border-b py-4">
              <p className="text-2xl font-semibold text-gray-900">{priceRange}</p>
              {!hasVariants && defaultVariant && !defaultVariant.availableForSale && (
                <p className="text-red-500 text-sm mt-1">Out of stock</p>
              )}
            </div>

            {product.description && (
              <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              </div>
            )}

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Variant Selector and Add to Cart */}
            <div className="space-y-4">
              {hasVariants && (
                <VariantSelector 
                  productId={product.id}
                  variants={variants}
                  options={product.options}
                />
              )}
              
              <AddToCartButton 
                variantId={defaultVariant?.id || variants[0]?.id}
                available={defaultVariant?.availableForSale ?? false}
                title={product.title}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}