// components/ui/cart-dropdown.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Plus, Minus, ChevronDown, Trash2 } from "lucide-react";

// Define the Cart Item type based on Shopify's structure
interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: {
      amount: string;
      currencyCode: string;
    };
    product: {
      title: string;
      handle: string;
      images?: {
        edges: Array<{
          node: {
            url: string;
            altText: string | null;
          };
        }>;
      };
    };
  };
  cost?: {
    totalAmount?: {
      amount: string;
      currencyCode: string;
    };
  };
}

export function CartDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartItems, totalQuantity, totalAmount, checkoutUrl, updateQuantity, removeFromCart, isLoading } = useCart();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to safely get product image
  const getProductImage = (item: CartItem): string | null => {
    try {
      return item.merchandise?.product?.images?.edges?.[0]?.node?.url || null;
    } catch {
      return null;
    }
  };

  // Helper to safely get product title
  const getProductTitle = (item: CartItem): string => {
    try {
      return item.merchandise?.product?.title || "Product";
    } catch {
      return "Product";
    }
  };

  // Helper to safely get variant title
  const getVariantTitle = (item: CartItem): string => {
    try {
      return item.merchandise?.title || "";
    } catch {
      return "";
    }
  };

  // Helper to safely get product handle
  const getProductHandle = (item: CartItem): string => {
    try {
      return item.merchandise?.product?.handle || "#";
    } catch {
      return "#";
    }
  };

  // Helper to safely get price per item
  const getItemPrice = (item: CartItem): number => {
    try {
      const price = item.merchandise?.price?.amount || "0";
      return parseFloat(price);
    } catch {
      return 0;
    }
  };

  // Calculate subtotal directly from cart items
  const calculateSubtotal = (): number => {
    return cartItems.reduce((sum, item) => {
      const price = getItemPrice(item);
      const quantity = item.quantity || 0;
      const itemTotal = price * quantity;
      return sum + itemTotal;
    }, 0);
  };

  const subtotal = calculateSubtotal();

  // Format currency
  const formatPrice = (price: number): string => {
    return price.toFixed(2);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-full transition flex items-center gap-1"
      >
        <ShoppingBag className="w-5 h-5" />
        {totalQuantity > 0 && (
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalQuantity}
          </span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border z-50 max-h-[600px] overflow-hidden">
          <div className="p-4 border-b bg-white sticky top-0">
            <h3 className="font-semibold text-lg">Your Cart ({totalQuantity})</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <ShoppingBag className="w-12 h-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 text-sm text-black underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="divide-y">
                {cartItems.map((item) => {
                  const imageUrl = getProductImage(item);
                  const productTitle = getProductTitle(item);
                  const variantTitle = getVariantTitle(item);
                  const productHandle = getProductHandle(item);
                  const itemPrice = getItemPrice(item);
                  const quantity = item.quantity || 0;
                  const itemTotal = itemPrice * quantity;

                  return (
                    <div key={item.id} className="p-4 flex gap-3">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={productTitle}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <ShoppingBag className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shopify-products/${productHandle}`}
                          onClick={() => setIsOpen(false)}
                          className="font-medium text-sm hover:underline block truncate"
                        >
                          {productTitle}
                        </Link>
                        {variantTitle && (
                          <p className="text-xs text-gray-500 truncate">{variantTitle}</p>
                        )}
                        <p className="text-sm font-medium mt-1">${formatPrice(itemPrice)}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            disabled={isLoading}
                            className="p-0.5 border rounded hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            disabled={isLoading}
                            className="p-0.5 border rounded hover:bg-gray-50 disabled:opacity-50"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            disabled={isLoading}
                            className="ml-auto text-xs text-red-500 hover:text-red-700 disabled:opacity-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-sm font-semibold">${formatPrice(itemTotal)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer - Using calculated subtotal */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t bg-white sticky bottom-0 space-y-3">
              <div className="flex justify-between font-semibold">
                <span>Subtotal:</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-gray-500 text-center">
                Shipping and taxes calculated at checkout
              </p>
              {checkoutUrl ? (
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-black text-white text-center py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Proceed to Checkout
                </a>
              ) : (
                <button
                  disabled
                  className="block w-full bg-gray-300 text-gray-500 text-center py-2 rounded-lg cursor-not-allowed"
                >
                  Checkout Unavailable
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="block w-full text-center text-sm text-gray-600 hover:text-gray-800"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}