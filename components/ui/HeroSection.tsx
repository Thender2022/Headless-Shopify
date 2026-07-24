// app/components/ui/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-12 md:py-16 pb-8 md:pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-block border border-[#90210F]/30 px-6 py-2">
            <span className="text-[#90210F] text-xs tracking-[0.3em] uppercase font-bold">
              Stay Up To Date
            </span>
          </div>
          {/* Spacer between Badge and Heading */}
          <div className="h-8 md:h-10" />

          {/* Main Heading */}
          <div className="flex justify-center items-center">
            <Image 
              src="/FYM_BLACK.png" 
              alt="Fawkyumean Global" 
              width={800} 
              height={200}
              className="w-full max-w-[800px] h-auto"
              priority
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>

          {/* Spacer between Heading and Subtitle */}
          <div className="h-8 md:h-10" />

          {/* Subtitle */}
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Forged in the streets. Worn by the ones who live it. 
            From the East Coast hustle to the West Coast wave — 
            we don't chase trends, we chase ends.
          </p>

          {/* Spacer between Subtitle and Divider */}
          <div className="h-8 md:h-10" />

          {/* Divider */}
          <div className="w-12 h-1 bg-[#90210F] mx-auto" />

          {/* Spacer between Divider and Buttons */}
          <div className="h-10 md:h-12" />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Link
              href="/shopify-products"
              className="px-8 md:px-10 py-3 md:py-4 bg-[#90210F] text-white text-xs md:text-sm tracking-wider uppercase font-bold hover:bg-[#7A1C0D] transition-colors duration-300 text-center"
            >
              Shop
            </Link>
            <Link
              href="/welcome"
              className="px-8 md:px-10 py-3 md:py-4 bg-transparent text-black border-2 border-black text-xs md:text-sm tracking-wider uppercase font-bold hover:bg-black hover:text-white transition-colors duration-300 text-center"
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}