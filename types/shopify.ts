// types/shopify.ts
export interface ShopifyProduct {
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
        };
      }>;
    };
  }
  
  // Helper to transform Shopify product to match your existing structure
  export interface TransformedProduct {
    id: string;
    name: string;
    description: string | null;
    default_price: {
      unit_amount: number;
      currency: string;
    };
    images: Array<{
      url: string;
    }>;
    metadata: {
      shopifyVariantId: string;
      handle: string;
    };
  }