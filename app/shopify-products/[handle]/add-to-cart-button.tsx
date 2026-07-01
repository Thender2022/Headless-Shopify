// app/shopify-products/[handle]/add-to-cart-button.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  variantId: string;
  available: boolean;
}

export function AddToCartButton({ variantId, available }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (!available) return;
    
    setIsAdding(true);
    await addToCart(variantId, 1);
    setIsAdding(false);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!available || isAdding}
      className="w-full bg-black text-white hover:bg-gray-800 py-6 text-lg"
    >
      {isAdding 
        ? 'Adding...' 
        : available 
          ? 'Add to Cart' 
          : 'Out of Stock'
      }
    </Button>
  );
}