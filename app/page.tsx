"use client";

import Image from "next/image";
import Link from "next/link";
import fawkyumean from "@/public/fawkyumean.jpeg";

export default function LandingPage() {
  return (
    <section className="w-screen h-screen bg-white relative overflow-hidden">
      {/* Grid Layout */}
      <div className="grid grid-rows-[1fr_auto_1fr] h-full">
        
        {/* Empty top spacer */}
        <div></div>
        
        {/* Image - centered in middle row */}
        <div className="flex justify-center">
          <Link href="/home">
            <div className="relative">
              <Image 
                src={fawkyumean}
                alt="Enter Website"
                width={900}
                height={700}
                className="cursor-pointer hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
          </Link>
        </div>
        
        {/* Button section with space above */}
        {/* <div className="flex flex-col items-center pt-8">
          <button
            onClick={() => window.location.href = "/home"}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold shadow-md"
          >
            Enter Website
          </button>
        </div> */}
      </div>
    </section>
  );
}