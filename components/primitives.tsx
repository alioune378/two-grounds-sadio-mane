"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { STATUS_LABEL, type Fact, type OpenFact, type VerifiedFact } from "@/content/facts";
import { plateText, type Media } from "@/content/media";

/** Provenance plate. Every image wears one. */
export function Plate({ media, text, className = "" }: { media?: Media; text?: string; className?: string }) {
  return <p className={`plate ${className}`}>{text ?? (media ? plateText(media) : "")}</p>;
}

/**
 * Full-cover image that keeps its focal point fixed whatever the viewport ratio.
 * Loading: the average tone and a blurred preview sit underneath, so there is
 * never a blank frame. Error: the image steps aside and a quiet notice remains;
 * the scene's composition and the provenance plate are unaffected.
 */
export function Cover({
  media,
  sizes = "100vw",
  priority = false,
  className = "",
  style,
}: {
  media: Media;
  sizes?: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className="cover-wrap"
      style={{ backgroundColor: media.tone, backgroundImage: `url("${media.blur}")` }}
      data-state={failed ? "error" : "ok"}
    >
      {failed ? (
        <span className="cover-error" role="img" aria-label={media.alt}>
          Image unavailable
        </span>
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={media.blur}
          onError={() => setFailed(true)}
          className={`cover ${className}`}
          style={{ objectFit: "cover", objectPosition: media.focal, ...style }}
        />
      )}
    </span>
  );
}

/** Small status tag used across the register, timeline and ledger. */
export function StatusTag({ fact }: { fact: Fact }) {
  return <span className={`status status--${fact.status}`}>{STATUS_LABEL[fact.status]}</span>;
}

/**
 * The evidence layer. It only accepts a VerifiedFact: a pending or disputed claim
 * cannot be styled as fact (principle IV).
 */
export function Evidence({ fact, className = "" }: { fact: VerifiedFact; className?: string }) {
  return (
    <p className={`evidence ${className}`}>
      <span>{fact.line}</span>
      <span className="evidence__src">
        {fact.sources.map((s, i) => (
          <a key={s.url + i} href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </span>
    </p>
  );
}

/** A claim still being checked. Visually distinct from evidence, never a fact. */
export function Pending({ fact }: { fact: OpenFact }) {
  return (
    <li className="pending">
      <StatusTag fact={fact} />
      <span className="pending__line">{fact.line}</span>
    </li>
  );
}

/** The red road: one laterite stroke that draws with the section's progress. */
export function Road({ className = "", vertical = false }: { className?: string; vertical?: boolean }) {
  return <span aria-hidden="true" className={`road ${vertical ? "road--v" : ""} ${className}`} />;
}
