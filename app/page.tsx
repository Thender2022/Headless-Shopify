// app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <section className="w-screen h-screen relative overflow-hidden bg-white flex flex-col items-center justify-center">
      {/* Video Container - Bigger size */}
      <div className="relative w-[70%] max-w-4xl aspect-video">
        <Link href="/home" className="block w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/F-rotating.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <Image 
              src="/FYM3.jpeg" 
              alt="Fawkyumean" 
              fill
              className="object-cover"
              priority
            />
          </video>
        </Link>
      </div>

      {/* Button - Positioned below the video with more space */}
      <Link
        href="/home"
        className="px-8 py-3 border-2 border-[#010101] text-[#90210F] text-sm tracking-wider uppercase hover:bg-[#90210F] hover:text-black transition-colors duration-300"
      >
        Enter
      </Link>
    </section>
  );
}