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
  quantityAvailable: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

interface Option {
  id: string;
  name: string;
  values: string[];
}

interface VariantSelectorProps {
  productId: string;
  variants: Variant[];
  options: Option[];
}

export function VariantSelector({ productId, variants, options }: VariantSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    // Initialize with first variant's options
    const firstVariant = variants[0];
    const initial: Record<string, string> = {};
    firstVariant?.selectedOptions.forEach((opt) => {
      initial[opt.name] = opt.value;
    });
    return initial;
  });

  // Find the currently selected variant based on selected options
  const selectedVariant = variants.find((variant) =>
    variant.selectedOptions.every(
      (opt) => selectedOptions[opt.name] === opt.value
    )
  );

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: value,
    }));
  };

  // Check if a specific option value is available
  const isOptionAvailable = (optionName: string, value: string) => {
    return variants.some((variant) =>
      variant.selectedOptions.some(
        (opt) => opt.name === optionName && opt.value === value
      )
    );
  };

  return (
    <div className="space-y-4">
      {options.map((option) => (
        <div key={option.id}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {option.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const isAvailable = isOptionAvailable(option.name, value);
              const isSelected = selectedOptions[option.name] === value;
              
              return (
                <button
                  key={value}
                  onClick={() => isAvailable && handleOptionChange(option.name, value)}
                  disabled={!isAvailable}
                  className={`
                    px-4 py-2 border rounded-md text-sm font-medium transition
                    ${isSelected 
                      ? 'border-black bg-black text-white' 
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }
                    ${!isAvailable && 'opacity-50 cursor-not-allowed bg-gray-100'}
                  `}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {selectedVariant && (
        <div className="text-sm text-gray-600">
          <p>SKU: {selectedVariant.title}</p>
          {selectedVariant.quantityAvailable > 0 && (
            <p>In stock: {selectedVariant.quantityAvailable}</p>
          )}
        </div>
      )}
    </div>
  );
}