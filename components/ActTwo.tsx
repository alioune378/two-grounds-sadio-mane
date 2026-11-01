"use client";

import { useRef } from "react";
import { facts } from "@/content/facts";
import { useProgress } from "@/lib/motion";
import { ActCard } from "./ActOne";
import { media } from "@/content/media";
import { Cover, Evidence, Plate, Road } from "./primitives";

const STOPS = [
  { y: 2009, city: "Dakar", club: "Génération Foot", country: "Senegal" },
  { y: 2011, city: "Metz", club: "FC Metz", country: "France" },
  { y: 2012, city: "Salzburg", club: "Red Bull Salzburg", country: "Austria" },
  { y: 2014, city: "Southampton", club: "Southampton", country: "England" },
  { y: 2016, city: "Liverpool", club: "Liverpool", country: "England" },
  { y: 2022, city: "Munich", club: "Bayern Munich", country: "Germany" },
  { y: 2023, city: "Riyadh", club: "Al-Nassr", country: "Saudi Arabia" },
];

const HONOURS = [
  { t: "European Cup", y: "2019", f: facts.ucl },
  { t: "Premier League", y: "2019–20", f: facts.pl },
  { t: "Golden Boot, shared", y: "2018–19", f: facts.boot },
  { t: "African Footballer of the Year", y: "2019 · 2022", f: facts.caf },
  { t: "Socrates Award", y: "2022", f: facts.socrates },
  { t: "Ballon d'Or runner-up", y: "2022", f: facts.ballon },
];

function fmt(seconds: number) {
  const s = Math.round(seconds);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/** Desktop: pinned horizontal journey with a running year. Mobile/static: a stepped list. */
function Journey() {
  const year = useRef<HTMLSpanElement>(null);
  const ref = useProgress<HTMLElement>("pin", (p) => {
    const i = Math.min(STOPS.length - 1, Math.max(0, Math.floor(((p - 0.08) / 0.84) * STOPS.length)));
    if (year.current && year.current.textContent !== String(STOPS[i].y)) year.current.textContent = String(STOPS[i].y);
  });
  return (
    <section ref={ref} className="seq journey" aria-labelledby="journey-h" style={{ ["--len" as string]: "320svh" }}>
      <div className="seq__stage journey__stage">
        <div className="journey__head shell">
          <h3 id="journey-h" className="journey__h pitch">
            The road goes north.
          </h3>
          <p className="journey__year pitch" aria-hidden="true">
            <span ref={year}>2009</span>
          </p>
        </div>
        <div className="journey__viewport">
          <ol className="journey__track">
            {STOPS.map((s, i) => (
              <li key={s.city} className="journey__stop" style={{ ["--i" as string]: i }}>
                <span className="journey__y">{s.y}</span>
                <span className="journey__city pitch">{s.city}</span>
                <span className="journey__club">
                  {s.club} · {s.country}
                </span>
              </li>
            ))}
          </ol>
          <Road className="journey__road" />
        </div>
        <div className="shell journey__src">
          <Evidence fact={facts.generation} />
          <Evidence fact={facts.clubs} />
        </div>
      </div>
    </section>
  );
}

function Clock() {
  const out = useRef<HTMLSpanElement>(null);
  const ref = useProgress<HTMLElement>("pin", (p) => {
    const t = Math.min(1, Math.max(0, (p - 0.12) / 0.7));
    if (out.current) out.current.textContent = fmt(176 * t);
  });
  return (
    <section ref={ref} className="seq clock" aria-labelledby="clock-h" style={{ ["--len" as string]: "260svh" }}>
      <div className="seq__stage clock__stage">
        <div className="clock__cone" aria-hidden="true" />
        <div className="shell clock__inner">
          <p className="kicker">16 May 2015 · Southampton</p>
          <h3 id="clock-h" className="clock__h pitch">
            Three goals. 176 seconds.
          </h3>
          <p className="clock__time pitch" aria-hidden="true">
            <span ref={out}>2:56</span>
          </p>
          <div className="clock__track" aria-hidden="true">
            <span className="clock__fill" />
            <span className="clock__goal clock__goal--1">Goal 1 · 0:00</span>
            <span className="clock__goal clock__goal--3">Goal 3 · 2:56</span>
          </div>
          <p className="clock__dek">
            Against Aston Villa: the fastest hat-trick in Premier League history. The second goal&rsquo;s timestamp is
            still being confirmed against the match log, so it is not marked.
          </p>
          <Evidence fact={facts.hattrick} />
        </div>
      </div>
    </section>
  );
}

export default function ActTwo() {
  const honours = useProgress<HTMLElement>("pass");
  const senegal = useProgress<HTMLElement>("pass");

  return (
    <div className="chapter chapter--flood" id="act-2">
      <ActCard n="II" title="The pitch" line="Dakar · Europe · Riyadh" tone="flood" bg={media.pitchJoy} />

      <Journey />
      <Clock />

      <section ref={honours} className="honours" aria-labelledby="honours-h">
        <figure className="honours__band">
          <div className="honours__img">
            <Cover media={media.recordCabinet} sizes="100vw" />
          </div>
          <div className="honours__shade" aria-hidden="true" />
          <Plate media={media.recordCabinet} className="honours__plate" />
        </figure>
        <div className="shell">
          <h3 id="honours-h" className="kicker">
            The record
          </h3>
          <ul className="honours__list">
            {HONOURS.map((h, i) => (
              <li key={h.t} className="honours__row" style={{ ["--i" as string]: i }}>
                <span className="honours__y">{h.y}</span>
                <span className="honours__t pitch">{h.t}</span>
              </li>
            ))}
          </ul>
          <details className="honours__src">
            <summary>Sources for the record</summary>
            {HONOURS.map((h) => (
              <Evidence key={h.f.id} fact={h.f} />
            ))}
          </details>
        </div>
      </section>

      <section ref={senegal} className="senegal" aria-labelledby="sen-h">
        <div className="senegal__img">
          <Cover media={media.trophy} sizes="(min-width: 900px) 55vw, 100vw" />
          <div className="senegal__shade" aria-hidden="true" />
          <Plate media={media.trophy} className="senegal__plate" />
        </div>
        <div className="shell senegal__grid">
          <p className="kicker senegal__k">Senegal</p>
          <h3 id="sen-h" className="senegal__h pitch">
            Yaoundé, 6&nbsp;February 2022.
          </h3>
          <div className="senegal__flag" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <div className="senegal__body">
            <p className="senegal__lede">
              The last kick of the shoot-out was his. Senegal beat Egypt to win the Africa Cup of Nations for the first
              time, and a country poured into the streets.
            </p>
            <Evidence fact={facts.afcon2022} />
          </div>
        </div>
        <Road className="senegal__road" />
      </section>
    </div>
  );
}
