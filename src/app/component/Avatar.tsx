import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export default function Avatar({ src, alt, width = 40, height = 40 }: AvatarProps) {
  return (
    <div className="w-10 h-10 rounded-full border-2 border-stone-50">
      <Image
        className="object-cover"
        src={src}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
} 