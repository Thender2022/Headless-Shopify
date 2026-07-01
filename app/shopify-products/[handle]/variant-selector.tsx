// app/shopify-products/[handle]/variant-selector.tsx
"use client";

import { useState } from "react";

interface Variant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}

interface VariantSelectorProps {
  variants: Variant[];
  // Remove productId since it's not being used
}

export function VariantSelector({ variants }: VariantSelectorProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants.find(v => v.availableForSale)?.id || variants[0]?.id || ""
  );

  const selectedVariant = variants.find(v => v.id === selectedVariantId);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-gray-700 block">
        Select Option:
      </label>
      <select
        value={selectedVariantId}
        onChange={(e) => setSelectedVariantId(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
      >
        {variants.map((variant) => (
          <option 
            key={variant.id} 
            value={variant.id}
            disabled={!variant.availableForSale}
          >
            {variant.title} - {variant.price.amount} {variant.price.currencyCode}
            {!variant.availableForSale && " (Out of Stock)"}
          </option>
        ))}
      </select>
      
      {selectedVariant && (
        <p className="text-sm text-gray-500">
          {selectedVariant.availableForSale ? "In Stock" : "Out of Stock"}
        </p>
      )}
    </div>
  );
}