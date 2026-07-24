// components/ui/BrandIntro.tsx
import Image from "next/image";
import Link from "next/link";
// import Navbar from "@/components/Navbar";

export default function BrandIntro() {
  return (

    <section className="py-24 px-4 md:px-8 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-sm tracking-[0.3em] uppercase text-gray-400">
            The Force
          </span>
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2 text-white">
            Fawkyu<span className="text-[#90210F]">Mean</span>
          </h2>
          <div className="w-12 h-1 bg-[#90210F] mx-auto mt-4" />
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/fym-party.png"
              alt="Fawkyumean collective - streets to skate parks"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2 rounded border border-[#90210F]/50">
              <span className="text-[#90210F] text-xs tracking-widest uppercase">
                Baltimore → Long Beach
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-block bg-[#90210F] px-4 py-1.5 rounded">
              <span className="text-xs tracking-[0.2em] uppercase font-medium text-white">
                The Movement
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white">
              Global Respect.
              <br />
              <span className="text-[#90210F]">International Influence.</span>
            </h2>

            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-[#90210F] rounded-full"></span>
                Baltimore, MD
              </span>
              <span className="text-gray-600">→</span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-[#90210F] rounded-full"></span>
                Long Beach, CA
              </span>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-base md:text-lg">
                Fawkyumean isn&apos;t just a brand — it&apos;s a collective. Born from the 
                raw energy of Baltimore&apos;s streets and shaped by the creative pulse 
                of Long Beach, we exist at the intersection of skate culture, music, 
                and authentic self-expression.
              </p>
              <p className="text-base md:text-lg">
                We&apos;re building a community of individuals who stand in their own 
                identity but understand the power of coming together. This is for 
                the skaters, the artists, the dreamers, and the ones who make 
                their own rules.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="border-t-2 border-[#90210F]/50 pt-4">
                <p className="text-xs tracking-widest uppercase font-bold text-white">
                  Streets
                </p>
                <p className="text-sm text-gray-500 mt-1">Authentic roots</p>
              </div>
              <div className="border-t-2 border-[#90210F]/50 pt-4">
                <p className="text-xs tracking-widest uppercase font-bold text-white">
                  Skate
                </p>
                <p className="text-sm text-gray-500 mt-1">Culture &amp; craft</p>
              </div>
              <div className="border-t-2 border-[#90210F]/50 pt-4">
                <p className="text-xs tracking-widest uppercase font-bold text-white">
                  Sound
                </p>
                <p className="text-sm text-gray-500 mt-1">Creative connection</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/about"
                className="px-8 py-3 bg-[#90210F] text-white text-sm tracking-wider uppercase hover:bg-[#7A1C0D] transition-colors duration-300"
              >
                Our Story
              </Link>
              <Link
                href="/welcome"
                className="px-8 py-3 border-2 border-[#90210F] text-[#90210F] text-sm tracking-wider uppercase hover:bg-[#90210F] hover:text-black transition-colors duration-300"
              >
                Join the Collective
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}