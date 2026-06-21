"use client";

import { ShopifyProductCard } from "./shopify-product-card";

// Shopify product type
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
}

interface Props {
  products: ShopifyProduct[];
}

export const ShopifyProductList = ({ products }: Props) => {
  return (
    <div>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-5xl">
        {products.map((product, index) => {
          return (
            <li key={product.id || index}>
              <ShopifyProductCard product={product} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};