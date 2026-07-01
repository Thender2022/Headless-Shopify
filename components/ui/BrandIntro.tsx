// components/ui/BrandIntro.tsx
import Image from "next/image";
import Link from "next/link";

export default function BrandIntro() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-b border-gray-100">
      <div className="container mx-auto px-4">
        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Column - Image */}
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src="/gang.jpg"
              alt="Fawkyumean collective - streets to skate parks"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-4 py-2">
              <span className="text-white text-xs tracking-widest uppercase">
                Baltimore → Long Beach
              </span>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="space-y-6">
            <div className="inline-block bg-gray-100 px-4 py-1.5">
              <span className="text-xs tracking-[0.2em] uppercase font-medium">
                The Movement
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Born in the Streets.
              <br />
              <span className="text-gray-600">Built for the Collective.</span>
            </h2>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
                Baltimore, MD
              </span>
              <span className="text-gray-300">→</span>
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-black rounded-full"></span>
                Long Beach, CA
              </span>
            </div>

            <div className="space-y-4 text-gray-600 leading-relaxed">
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
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs tracking-widest uppercase font-medium">
                  Streets
                </p>
                <p className="text-sm text-gray-500 mt-1">Authentic roots</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs tracking-widest uppercase font-medium">
                  Skate
                </p>
                <p className="text-sm text-gray-500 mt-1">Culture &amp; craft</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs tracking-widest uppercase font-medium">
                  Sound
                </p>
                <p className="text-sm text-gray-500 mt-1">Creative connection</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/about"
                className="px-8 py-3 bg-black text-white text-sm tracking-wider uppercase hover:bg-gray-800 transition-colors"
              >
                Our Story
              </Link>
              <Link
                href="/community"
                className="px-8 py-3 border border-gray-300 text-sm tracking-wider uppercase hover:bg-gray-50 transition-colors"
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