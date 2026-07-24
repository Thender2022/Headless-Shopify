// app/components/ui/ProductsSection.tsx
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
    <section className="py-16 md:py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-gray-500">
            Collection
          </span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2 text-black">
            Latest <span className="text-[#90210F]">Drops</span>
          </h2>
          <div className="w-12 h-1 bg-[#90210F] mx-auto mt-4" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ShopifyProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/shopify-products"
            className="inline-block bg-black text-white px-10 py-4 text-sm tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors duration-300"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}