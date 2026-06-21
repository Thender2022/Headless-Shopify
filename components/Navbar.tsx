// components/Navbar.tsx
"use client";

import Link from "next/link";
import { CartDropdown } from "@/components/ui/cart-dropdown";  // Changed import
import Image from "next/image";


export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Store Name */}
          <Link href="/home" className="text-xl font-bold hover:text-gray-600 transition">
            <Image
                src="/fym.png"
                alt="Logo"
                width={50}
                height={50}
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            {/* <Link href="/home" className="text-sm hover:text-gray-600 transition">
              Home
            </Link>
            <Link href="/shopify-products" className="text-sm hover:text-gray-600 transition">
              Products
            </Link> */}
            {/* <Link href="/about" className="text-sm hover:text-gray-600 transition">
              About
            </Link> */}
          </nav>

          {/* Right side - Cart Dropdown */}
          <div className="flex items-center gap-4">
            <CartDropdown />  {/* Changed from CartButton to CartDropdown */}
          </div>
        </div>
      </div>
    </header>
  );
}