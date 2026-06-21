// app/components/ui/shopify-product-card.tsx
import Image from "next/image";
import Link from "next/link";

interface ShopifyProductCardProps {
  product: {
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
}

export const ShopifyProductCard = ({ product }: ShopifyProductCardProps) => {
  const firstImage = product.images.edges[0]?.node;
  const firstVariant = product.variants.edges[0]?.node;
  const price = firstVariant?.price.amount || product.priceRange.minVariantPrice.amount;
  const currency = firstVariant?.price.currencyCode || "USD";
  const isSoldOut = !product.variants.edges.some(variant => variant.node.availableForSale);

  return (
    <Link href={`/shopify-products/${product.handle}`} className="block group">
      <div className="relative">
        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 font-bold text-sm uppercase tracking-wider rounded">
              Sold Out
            </span>
          </div>
        )}
        
        {/* Image */}
        {firstImage && (
          <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
            <Image 
              alt={firstImage.altText || product.title}
              src={firstImage.url}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
      </div>
      
      {/* Product Info Below Image */}
      <div className="mt-4 text-center">
        {/* Product Title */}
        <h3 className="text-base font-bold text-gray-800 group-hover:text-gray-600 transition-colors">
          {product.title}
        </h3>
        
        {/* Product Description (if available) */}
        {product.description && (
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Price */}
        <p className="text-lg font-semibold text-gray-900 mt-2">
          ${parseFloat(price).toFixed(2)} {currency !== "USD" && currency}
        </p>
        
        {/* View Details Button - Clean border button, no background */}
        <button className="mt-3 w-full  bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          View Details
        </button>
      </div>
    </Link>
  );
};