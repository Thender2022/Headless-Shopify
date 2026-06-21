'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: Array<{
    url: string;
    altText: string | null;
    width: number;
    height: number;
  }>;
  productTitle: string;
}

export function ImageGallery({ images, productTitle }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images.length) return null;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={selectedImage.url}
          alt={selectedImage.altText || productTitle}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      
      {/* Thumbnail images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={`relative aspect-square rounded-md overflow-hidden bg-gray-100 transition ${
                selectedImage.url === image.url
                  ? 'ring-2 ring-blue-500 ring-offset-2'
                  : 'hover:opacity-75 cursor-pointer'
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText || `${productTitle} ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}