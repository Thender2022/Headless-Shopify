// app/components/ui/ImageGrid.tsx
"use client";

import Image from "next/image";

const images = [
  { 
    src: "/homie.jpg", 
    alt: "Streetwear model 1",
    caption: "SMOKEY",
    description: "East Coast grit"
  },
  { 
    src: "/shirt1-brown.jpeg", 
    alt: "Streetwear model 2",
    caption: "EARTH TONES",
    description: "West Coast wave"
  },
  { 
    src: "/hatShot3.jpeg", 
    alt: "Streetwear model 3",
    caption: "REAL ONES",
    description: "Built different"
  },
  { 
    src: "/gasfym.jpg", 
    alt: "Streetwear model 4",
    caption: "FIRE",
    description: "Born ready"
  },
];

export default function Grid1() {
  return (
    <div className="w-full px-4 md:px-8 py-12">
      {/* Full Width Grid - Taller pictures */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-[2/3] overflow-hidden bg-black"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover grayscale-[15%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out ${
                index === 0 ? 'object-contain' : 'object-cover'
              }`}
              sizes="(max-width: 768px) 50vw, 25vw"
              priority={index < 2}
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white text-xs tracking-[0.2em] uppercase font-bold">
                {image.caption}
              </p>
              <p className="text-white/60 text-[10px] tracking-wider uppercase mt-1">
                {image.description}
              </p>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </div>
  );
}