// app/components/ui/Grid2.tsx
"use client";

import Image from "next/image";

interface Grid2Props {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Grid2({ size = 'md' }: Grid2Props) {
  const sizeMap = {
    sm: 'max-w-2xl',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-5xl'
  };

  return (
    <div className="w-full px-4 md:px-8 py-12">
      <div className="flex justify-center w-full">
        <div className={`w-full ${sizeMap[size]}`}>
          <div className="group relative aspect-[2/3] overflow-hidden bg-black">
            <Image
              src="/hatShot2.jpeg"
              alt="Man wearing a Fawkyumean hat in street style"
              fill
              className="object-cover grayscale-[15%] group-hover:grayscale-0 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
              <p className="text-white text-xs tracking-[0.2em] uppercase font-bold">
                REAL ONES
              </p>
              <p className="text-white/60 text-[10px] tracking-wider uppercase mt-1">
                Built different
              </p>
            </div>

            {/* Corner Accent */}
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}