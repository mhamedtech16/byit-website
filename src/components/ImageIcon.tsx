import Image from "next/image";

type ImageIconProps = {
  src: string;
  alt: string;
  size?: number;
};

export function ImageIcon({ src, alt, size = 24 }: ImageIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
      loading="lazy"
    />
  );
}
