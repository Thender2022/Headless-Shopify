// app/connect/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { MdEmail, MdArrowForward } from "react-icons/md";
import Navbar from "@/components/Navbar"; // Adjust the import path as needed

export default function ConnectPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call - Replace with your actual newsletter API
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus("success");
      setMessage("Thanks for subscribing! Check your email.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://instagram.com/fawkyumeann",
      color: "hover:text-[#90210F]"
    },
    {
      name: "Email",
      icon: MdEmail,
      url: "mailto:taysworld410@gmail.com",
      color: "hover:text-[#90210F]"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-12 pt-24">
        <div className="max-w-3xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 text-black">
              STAY CONNECTED
            </h1>
            <p className="text-gray-600 text-sm md:text-base tracking-wider uppercase">
              Follow the movement. Join the family.
            </p>
            <div className="w-16 h-0.5 bg-[#90210F] mx-auto mt-4" />
          </div>

          {/* Social Links Grid - 2 columns */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-12">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center p-6 border-2 border-black/10 hover:border-[#90210F] transition-all duration-300 rounded-lg hover:shadow-lg hover:shadow-[#90210F]/10"
                >
                  <Icon 
                    className={`text-3xl mb-2 text-gray-700 transition-colors duration-300 ${social.color}`} 
                  />
                  <span className="text-[10px] tracking-wider uppercase text-gray-600 group-hover:text-black transition-colors">
                    {social.name}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Newsletter Section - Black with red accent */}
          <div className="bg-black rounded-lg p-8 md:p-10 border border-[#90210F]/20">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold tracking-tight mb-2 text-white">
                JOIN THE NEWSLETTER
              </h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Stay updated with exclusive drops, early access, and behind-the-scenes content.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border-2 border-gray-700 focus:border-[#90210F] outline-none transition-colors text-sm bg-black text-white placeholder-gray-500 rounded"
                  disabled={status === "loading" || status === "success"}
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="px-6 py-3 bg-[#90210F] text-white text-sm tracking-wider uppercase font-bold hover:bg-[#7A1C0D] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px] rounded"
                >
                  {status === "loading" ? (
                    "Sending..."
                  ) : status === "success" ? (
                    "Subscribed ✓"
                  ) : (
                    <>
                      Subscribe
                      <MdArrowForward className="text-lg" />
                    </>
                  )}
                </button>
              </div>
              
              {message && (
                <p className={`text-sm mt-3 text-center ${
                  status === "success" ? "text-green-500" : "text-red-500"
                }`}>
                  {message}
                </p>
              )}
            </form>

            <p className="text-gray-500 text-[10px] text-center mt-4 tracking-wider uppercase">
              No spam. Unsubscribe anytime.
            </p>
          </div>

          {/* Back Link */}
          <div className="text-center mt-10">
            <Link 
              href="/" 
              className="text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-[#90210F] transition-colors border-b border-transparent hover:border-[#90210F] pb-0.5"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}