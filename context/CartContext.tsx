// context/CartContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { shopifyFetch } from "@/lib/shopify/client";
import { CREATE_CART, ADD_TO_CART, GET_CART, UPDATE_CART_LINE, REMOVE_CART_LINE } from "@/lib/shopify/queries";

// At the top of context/CartContext.tsx
export interface CartItem {
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

interface CartContextType {
  cartId: string | null;
  cartItems: CartItem[];
  totalQuantity: number;
  totalAmount: string;
  checkoutUrl: string | null;
  isLoading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "shopify_cart_id";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState("0");
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart ID from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCartId) {
      setCartId(savedCartId);
      fetchCart(savedCartId);
    }
  }, []);

  // Fetch FULL cart details from Shopify
  const fetchCart = async (id: string) => {
    try {
      const { data } = await shopifyFetch<{
        cart: {
          id: string;
          checkoutUrl: string;
          totalQuantity: number;
          estimatedCost: {
            totalAmount: { amount: string; currencyCode: string };
          };
          lines: {
            edges: Array<{ node: CartItem }>;
          };
        };
      }>({
        query: GET_CART,
        variables: { cartId: id },
      });

      if (data.cart) {
        setCartItems(data.cart.lines.edges.map(edge => edge.node));
        setTotalQuantity(data.cart.totalQuantity);
        setTotalAmount(data.cart.estimatedCost.totalAmount.amount);
        setCheckoutUrl(data.cart.checkoutUrl);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      localStorage.removeItem(CART_STORAGE_KEY);
      setCartId(null);
    }
  };

  // Add item to cart
  const addToCart = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      let currentCartId = cartId;
      
      if (!currentCartId) {
        const { data } = await shopifyFetch<{
          cartCreate: {
            cart: { id: string; checkoutUrl: string };
            userErrors: Array<{ message: string }>;
          };
        }>({
          query: CREATE_CART,
          variables: { lines: [{ merchandiseId: variantId, quantity }] }, // Create with item directly
        });

        if (data.cartCreate.userErrors.length > 0) {
          throw new Error(data.cartCreate.userErrors[0].message);
        }

        currentCartId = data.cartCreate.cart.id;
        setCartId(currentCartId);
        localStorage.setItem(CART_STORAGE_KEY, currentCartId);
        
        // Fetch the full cart to get all details
        await fetchCart(currentCartId);
      } else {
        const { data } = await shopifyFetch<{
          cartLinesAdd: {
            cart: { id: string; checkoutUrl: string };
            userErrors: Array<{ message: string }>;
          };
        }>({
          query: ADD_TO_CART,
          variables: {
            cartId: currentCartId,
            lines: [{ merchandiseId: variantId, quantity }],
          },
        });

        if (data.cartLinesAdd.userErrors.length > 0) {
          throw new Error(data.cartLinesAdd.userErrors[0].message);
        }
        
        // Fetch the full cart again to get updated data with images
        await fetchCart(currentCartId);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    if (quantity <= 0) {
      await removeFromCart(lineId);
      return;
    }
    
    setIsLoading(true);
    try {
      const { data } = await shopifyFetch<{
        cartLinesUpdate: {
          cart: { id: string };
          userErrors: Array<{ message: string }>;
        };
      }>({
        query: UPDATE_CART_LINE,
        variables: { cartId, lineId, quantity },
      });

      if (data.cartLinesUpdate.userErrors.length > 0) {
        throw new Error(data.cartLinesUpdate.userErrors[0].message);
      }
      
      // Fetch the full cart again to get updated data with images
      await fetchCart(cartId);
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (lineId: string) => {
    if (!cartId) return;
    setIsLoading(true);
    
    try {
      const { data } = await shopifyFetch<{
        cartLinesRemove: {
          cart: { id: string };
          userErrors: Array<{ message: string }>;
        };
      }>({
        query: REMOVE_CART_LINE,
        variables: { cartId, lineIds: [lineId] },
      });

      if (data.cartLinesRemove.userErrors.length > 0) {
        throw new Error(data.cartLinesRemove.userErrors[0].message);
      }
      
      // Fetch the full cart again to get updated data
      await fetchCart(cartId);
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Failed to remove item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    localStorage.removeItem(CART_STORAGE_KEY);
    setCartId(null);
    setCartItems([]);
    setTotalQuantity(0);
    setTotalAmount("0");
    setCheckoutUrl(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartId,
        cartItems,
        totalQuantity,
        totalAmount,
        checkoutUrl,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}