// Preview-only stand-in for next/image (Next.js could not be installed in the build sandbox).
// Same fill/cover behaviour with a plain <img> and a WebP source; supports onError.
import type { CSSProperties, SyntheticEvent } from "react";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  className?: string;
  style?: CSSProperties;
  onError?: (e: SyntheticEvent<HTMLImageElement>) => void;
};

export default function Image({ src, alt, fill, sizes, priority, className, style, onError }: Props) {
  const base = (globalThis as { __MEDIA_BASE__?: string }).__MEDIA_BASE__ ?? "";
  const url = base + src.replace(/^\//, "");
  const webp = url.replace(/\.jpg$/, ".webp");
  const fillStyle: CSSProperties = fill
    ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style }
    : { ...style };
  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={url}
        alt={alt}
        sizes={sizes}
        className={className}
        style={fillStyle}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        onError={onError}
      />
    </picture>
  );
}
