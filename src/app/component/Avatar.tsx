import Image from "next/image";

interface AvatarProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Avatar({ src, alt, width = 40, height = 40, className = "" }: AvatarProps) {
  return (
    <Image
      className={`rounded-full object-cover ${className}`}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
} 