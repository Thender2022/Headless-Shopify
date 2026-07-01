// app/components/ui/ProductsSection.tsx
// import Image from "next/image";
import Link from "next/link";
import { ShopifyProductCard } from "@/components/ui/shopify-product-card";

interface ProductsSectionProps {
  products: Array<{
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
  }>;
}

export default function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Latest Drops
        </h2>
        
        {/* Product Grid - Wider! */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <ShopifyProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/shopify-products" 
            className="inline-block border border-gray-300 px-8 py-3 text-sm tracking-wider uppercase hover:bg-gray-50 transition-colors"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}