// app/about/page.tsx
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Grid1 from "@/components/ui/grid-1";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 w-full h-full">
          <Image
            src="/fym-party.png"
            alt="Fawkyumean brand hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/80" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Main Heading - FYM_BLACK.png */}
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
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-16">
        <Grid1 />
      </section>
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <span className="text-sm tracking-[0.3em] uppercase text-[#90210F] font-bold">
              The Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mt-2 text-black">
              Born on the <span className="text-[#90210F]">Block</span>,
              <br />Built for the <span className="text-[#90210F]">Elite</span>
            </h2>
            <div className="w-12 h-1 bg-[#90210F] mt-4" />
            <p className="text-gray-700 text-lg leading-relaxed mt-6 font-light">
              From the back alleys to the forefront of fashion — Fawkyumean is 
              the intersection of raw street culture and sophisticated design. 
              Every piece tells a story of resilience, creativity, and the 
              relentless pursuit of excellence.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4 font-light">
              We craft for those who appreciate the details — the ones who know 
              that true luxury isn't about logos, but about the feeling of wearing 
              something that represents who you are.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-black rounded-sm">
            <Image
              src="/FYMvid.jpg"
              alt="Streetwear fashion editorial"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm tracking-[0.3em] uppercase text-gray-500">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mt-2 text-black">
              Our <span className="text-[#90210F]">Core Values</span>
            </h2>
            <div className="w-12 h-1 bg-[#90210F] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 border border-gray-200 hover:border-[#90210F] transition-all duration-300 shadow-sm hover:shadow-md">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2 text-black">
                Authenticity
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We stay true to the culture. No corporate gimmicks, just real
                skateboarding heritage.
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200 hover:border-[#90210F] transition-all duration-300 shadow-sm hover:shadow-md">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2 text-black">
                Rebellion
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We challenge the status quo. If everyone&apos;s going left, we go right.
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200 hover:border-[#90210F] transition-all duration-300 shadow-sm hover:shadow-md">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2 text-black">
                Sustainability
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We repurpose, recycle, and rethink. Our materials are sourced
                responsibly.
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200 hover:border-[#90210F] transition-all duration-300 shadow-sm hover:shadow-md">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2 text-black">
                Community
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                We are nothing without the crew. Every design is inspired by the
                skaters we roll with.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}