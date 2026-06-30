// app/components/ui/ImageGrid.tsx
import Image from "next/image";

export default function ImageGrid() {
  return (
    <div className="flex flex-col md:flex-row w-full" style={{ margin: 0, padding: 0, gap: 0, lineHeight: 0 }}>
      <div className="relative w-full md:w-1/2" style={{ aspectRatio: '3/4', margin: 0, padding: 0 }}>
        <Image
          src="/smokey.jpg"
          alt="Skate culture"
          fill
          className="object-cover"
          style={{ display: 'block', margin: 0, padding: 0 }}
        />
      </div>
      <div className="relative w-full md:w-1/2" style={{ aspectRatio: '3/4', margin: 0, padding: 0 }}>
        <Image
          src="/homie.jpg"
          alt="Street style"
          fill
          className="object-cover"
          style={{ display: 'block', margin: 0, padding: 0 }}
        />
      </div>
    </div>
  );
}
