"use client";

import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="w-screen h-screen relative overflow-hidden">
      {/* Video Background - Full screen */}
      <div className="absolute inset-0 w-full h-full">
        <Link href="/home" className="block w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/2spinny.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <Image src="/FYM3.jpeg" alt="Fawkyumean" className="w-full h-full object-cover" />
          </video>
        </Link>
      </div>

      {/* Button - Positioned lower on the screen */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <Link
          href="/home"
          className="pointer-events-auto px-8 md:px-10 py-3 md:py-4 bg-transparent text-black border-2 border-black text-xs md:text-sm tracking-wider uppercase transition-colors hover:bg-red-600 hover:text-black hover:border-red-600"
          style={{ marginTop: '35%' }}
        >
          Enter
        </Link>
      </div>
    </section>
  );
}