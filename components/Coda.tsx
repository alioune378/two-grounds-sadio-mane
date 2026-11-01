"use client";

import { media, type Media } from "@/content/media";
import { useProgress } from "@/lib/motion";
import { Cover, Plate } from "./primitives";

/** The final sequence: the whole story in one breath, then the two grounds meet. */
const FRAMES: { m: Media; line: string; voice: "pitch" | "roots" }[] = [
  { m: media.ground, line: "A ball on red earth.", voice: "roots" },
  { m: media.pitchJoy, line: "The world's stadiums.", voice: "pitch" },
  { m: media.trophy, line: "A continent's cup.", voice: "pitch" },
  { m: media.hospital, line: "The way home.", voice: "roots" },
  { m: media.nextGeneration, line: "The next ones.", voice: "roots" },
  { m: media.baobab, line: "Somewhere in the Casamance this evening, someone is picking teams.", voice: "roots" },
];

const NEXT = [
  { href: "#timeline", t: "The two timelines", d: "Every milestone on both grounds, side by side." },
  { href: "#community", t: "What came back", d: "The hospital, the school, the ground, the connection." },
  { href: "#sources", t: "Sources", d: "Where each fact on this page comes from." },
  { href: "#provenance", t: "About the images", d: "Every picture here is a labelled concept visualization." },
];

export default function Coda() {
  const seq = useProgress<HTMLElement>("pin");
  return (
    <>
      <section ref={seq} className="seq fin" aria-labelledby="fin-h" style={{ ["--len" as string]: "620svh" }}>
        <div className="seq__stage fin__stage">
          {FRAMES.map((f, i) => (
            <figure key={f.m.src} className={`fin__frame fin__frame--${i}`} style={{ ["--i" as string]: i }}>
              <div className="fin__img">
                <Cover media={f.m} sizes="100vw" />
              </div>
              <div className="fin__shade" aria-hidden="true" />
              <figcaption className={`fin__line ${f.voice}`}>{f.line}</figcaption>
              <Plate media={f.m} className="fin__plate" />
            </figure>
          ))}
          <div className="fin__title">
            <h2 id="fin-h" className="sr-only">
              Two Grounds
            </h2>
            <p className="fin__name kicker">Sadio Mané</p>
            <p className="fin__meet" aria-hidden="true">
              <span className="fin__pitch pitch">The pitch</span>
              <span className="fin__road" />
              <span className="fin__roots roots">the roots</span>
            </p>
            <p className="fin__dek">One road runs between them. It goes both ways.</p>
          </div>
        </div>
      </section>

      <section className="meet" aria-label="Continue">
        <div className="shell">
          <nav className="endnav" aria-label="Continue the story">
            <ol className="endnav__list">
              {NEXT.map((n, i) => (
                <li key={n.href} className="endnav__item">
                  <a className="endnav__link" href={n.href}>
                    <span className="endnav__n">{String(i + 1).padStart(2, "0")}</span>
                    <span className="endnav__t">{n.t}</span>
                    <span className="endnav__d">{n.d}</span>
                    <span className="endnav__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>
    </>
  );
}
