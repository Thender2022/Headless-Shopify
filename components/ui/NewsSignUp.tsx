// app/components/ui/NewsletterSignup.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // This is where you'll connect to Shopify Forms or your email service
    // For now, it simulates a successful submission
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-16 md:py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <h3 className="text-2xl md:text-3xl font-bold tracking-wide">
          Stay Connected
        </h3>
        <p className="text-gray-400 mt-2 mb-6 text-sm md:text-base">
          Get early access to drops and exclusive content.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === "loading" || status === "success"}
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-white/50 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="px-8 py-3 bg-white text-black text-sm tracking-wider uppercase hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Subscribing..." : 
             status === "success" ? "Subscribed! ✓" : 
             "Subscribe"}
          </button>
        </form>

        {status === "success" && (
          <p className="text-green-400 text-sm mt-3">Thanks for joining the movement!</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-sm mt-3">Something went wrong. Please try again.</p>
        )}

        <p className="text-xs text-gray-500 mt-4">
          No spam, just the good stuff. Unsubscribe anytime.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-white/20 mx-auto mt-6" />

        {/* Instagram Link */}
        <div className="mt-6">
          <Link
            href="https://instagram.com/fawkyumeann"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 group"
          >
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span className="text-sm tracking-wider uppercase">
              Follow @fawkyumeann
            </span>
            <svg 
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}