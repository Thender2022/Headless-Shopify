// components/Navbar.tsx
"use client";

import Link from "next/link";
import { CartDropdown } from "@/components/ui/cart-dropdown";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left - Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded transition"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>

          {/* Logo / Store Name - Hidden on mobile, visible on desktop */}
          <Link href="/home" className="text-xl font-bold hover:text-gray-600 transition hidden md:block">
            <Image
              src="/FYM_BLACK.png"
              alt="Logo"
              width={100}
              height={50}
            />
          </Link>

          {/* Mobile logo - visible only on mobile */}
          <Link href="/home" className="md:hidden">
            <Image
              src="/FYM_BLACK.png"
              alt="Logo"
              width={80}
              height={40}
              className="object-contain"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/home" className="text-sm hover:text-gray-600 transition">
              Home
            </Link>
            <Link href="/about" className="text-sm hover:text-gray-600 transition">
              About
            </Link>
            <Link href="/shopify-products" className="text-sm hover:text-gray-600 transition">
              Products
            </Link>
            <Link href="/FAQ" className="text-sm hover:text-gray-600 transition">
              FAQs
            </Link>
            
          </nav>

          {/* Right side - Cart Dropdown */}
          <div className="flex items-center gap-4">
            <CartDropdown />
          </div>
        </div>

        {/* Mobile Menu - Slides down */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="flex flex-col py-4 space-y-3 border-t">
            <Link 
              href="/home" 
              className="text-sm hover:text-gray-600 transition px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-sm hover:text-gray-600 transition px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/shopify-products" 
              className="text-sm hover:text-gray-600 transition px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/FAQ" 
              className="text-sm hover:text-gray-600 transition px-2 py-1"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQs
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}