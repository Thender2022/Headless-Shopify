// app/components/ui/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full">
      {/* Image */}
      <div className="w-full">
        <Image
          src="/FYM3.jpeg"
          alt="Fawkyumean brand hero"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
          sizes="100vw"
        />
      </div>

      {/* Overlay Text & Button - At 53% */}
      <div className="absolute left-0 right-0 top-[53%] transform -translate-y-1/2">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* Tagline */}
            <p className="text-[#F5F5F0] text-lg md:text-xl lg:text-2xl font-bold tracking-wide" 
               style={{ 
                 textShadow: 
                   '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000, 0 4px 8px rgba(255, 0, 0, 0.5)'
               }}>
              Born in Baltimore, Inspired by Long Beach.
            </p>

            {/* Spacer - Maintains space between text and button */}
            <div className="h-16 md:h-24"></div>

            {/* Button - Hover: red background with black text */}
            <Link
              href="/about"
              className="inline-block px-8 md:px-10 py-3 md:py-4 bg-transparent text-[#F5F5F0] border border-[#F5F5F0] text-xs md:text-sm tracking-wider uppercase transition-colors hover:bg-red-600 hover:text-black hover:border-red-600"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}