// app/components/ui/NewsletterSignup.tsx
"use client";

import { useState } from "react";

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
      </div>
    </section>
  );
}