"use client";

import { facts } from "@/content/facts";
import { media, type Media } from "@/content/media";
import { useProgress } from "@/lib/motion";
import { Cover, Evidence, Plate, Road } from "./primitives";

export function ActCard({
  n,
  title,
  line,
  tone,
  bg,
}: {
  n: string;
  title: string;
  line: string;
  tone: "dawn" | "flood" | "dusk";
  bg?: Media;
}) {
  const ref = useProgress<HTMLDivElement>("pass");
  return (
    <div ref={ref} className={`act act--${tone} ${bg ? "act--image" : ""}`}>
      {bg && (
        <>
          <div className="act__bg">
            <Cover media={bg} sizes="100vw" />
          </div>
          <div className="act__shade" aria-hidden="true" />
          <Plate media={bg} className="act__plate" />
        </>
      )}
      <p className="act__n">Act {n}</p>
      <h2 className="act__title">{title}</h2>
      <p className="act__line">{line}</p>
      <Road className="act__road" />
    </div>
  );
}

/** Schematic map. Outlines are simplified and approximate; labelled as such. */
function Map() {
  return (
    <figure className="map" aria-labelledby="map-cap">
      <svg viewBox="0 0 400 290" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Schematic map of Senegal</title>
        <desc id="map-desc">
          Senegal with The Gambia cutting across it from the coast. The Casamance lies south of The Gambia. A red route
          runs from Bambali, in the Sédhiou region near the Casamance river, north to Dakar.
        </desc>
        <path
          className="map__land"
          d="M16.2 129 L36 118.8 L54 93 L75 57 L78 48 L90 25.2 L132 21 L174 15.6 L210 16.8 L240 36 L267 51 L291 75 L315 108 L333 135 L351 156 L369 189 L384 216 L375 243 L357 264 L327 271.2 L288 265.2 L246 258 L192 261 L150 268.8 L108 274.2 L81 274.8 L63 268.8 L64.8 243 L63 230.4 L69 196.8 L63 180 L48 153 L39 136.8 Z"
        />
        <path
          className="map__gambia"
          d="M63 230.4 L90 223.2 L120 223.2 L156 214.8 L186 214.8 L216 219 L240 211.2 L240 201 L210 205.2 L180 199.2 L144 200.4 L114 196.8 L84 198 L69 196.8 Z"
        />
        <path className="map__river" d="M63 258 L91.8 260.4 L114 256.8 L134.4 251.4 L156 244.8 L174 243" />
        <path
          className="map__route"
          pathLength={1}
          d="M138 256.8 C 150 236, 152 214, 140 200 C 120 176, 70 156, 21 132.6"
        />
        <circle className="map__pulse" cx="138" cy="256.8" r="11" />
        <circle className="map__dot map__dot--home" cx="138" cy="256.8" r="5" />
        <circle className="map__dot" cx="21" cy="132.6" r="3.5" />
        <text className="map__label map__label--home" x="150" y="279">
          Bambali
        </text>
        <text className="map__label map__label--mono" x="28" y="122">
          DAKAR
        </text>
        <text className="map__label map__label--mono map__label--quiet" x="160" y="194">
          THE GAMBIA
        </text>
        <text className="map__label map__label--mono map__label--river" x="196" y="240">
          CASAMANCE
        </text>
        <text className="map__label map__label--mono map__label--quiet" x="250" y="112">
          SENEGAL
        </text>
      </svg>
      <figcaption id="map-cap" className="plate plate--ink">
        Schematic · outlines simplified · Bambali position approximate
      </figcaption>
    </figure>
  );
}

export default function ActOne() {
  const place = useProgress<HTMLElement>("pass");
  const pano = useProgress<HTMLElement>("pass");
  const kid = useProgress<HTMLElement>("pass");
  const fifteen = useProgress<HTMLElement>("pin");

  return (
    <div className="chapter chapter--dawn" id="act-1">
      <ActCard n="I" title="The ground" line="Bambali · Sédhiou · Casamance" tone="dawn" />

      <section ref={place} className="place shell" aria-labelledby="place-h">
        <Map />
        <div className="place__text">
          <p className="kicker">Where</p>
          <h3 id="place-h" className="roots place__h">
            South of The Gambia, in the Casamance.
          </h3>
          <p>
            Bambali is a village in Senegal&rsquo;s Sédhiou region. Between it and the capital lies another country: the
            road north to Dakar either crosses The Gambia or goes the long way around it.
          </p>
          <Evidence fact={facts.casamance} />
        </div>
      </section>

      <section ref={pano} className="pano" aria-labelledby="pano-h">
        <div className="pano__frame">
          <div className="pano__img">
            <Cover media={media.casamance} sizes="100vw" />
          </div>
          <div className="pano__grade" aria-hidden="true" />
          <div className="pano__words shell">
            <h3 id="pano-h" className="pano__h roots">
              Flat land, a long horizon, red earth.
            </h3>
          </div>
          <div className="pano__foot shell">
            <p className="pano__p">
              The Casamance takes its name from its river. Bambali sits inland, a long way from the sea and further still
              from any stadium.
            </p>
          </div>
          <Plate media={media.casamance} className="pano__plate" />
        </div>
      </section>

      <section ref={kid} className="kid" aria-labelledby="kid-h">
        <div className="kid__grid shell">
          <figure className="kid__main">
            <div className="kid__frame">
              <Cover media={media.childhood} sizes="(min-width: 900px) 62vw, 100vw" />
            </div>
            <Plate media={media.childhood} className="kid__plate" />
          </figure>
          <div className="kid__text">
            <p className="kicker">Childhood</p>
            <h3 id="kid-h" className="kid__h roots">
              Football on whatever ground there was.
            </h3>
            <p>
              His father was the village imam and wanted his son in religious study, not on a pitch. Sadio played anyway,
              in Bambali&rsquo;s dust, with whoever turned up.
            </p>
            <figure className="kid__detail">
              <div className="kid__detail-frame">
                <Cover media={media.groundDetail} sizes="(min-width: 900px) 22vw, 60vw" />
              </div>
              <Plate media={media.groundDetail} />
            </figure>
          </div>
        </div>
      </section>

      <section
        ref={fifteen}
        className="seq fifteen"
        aria-labelledby="fifteen-h"
        style={{ ["--len" as string]: "220svh" }}
      >
        <div className="seq__stage fifteen__stage shell">
          <p className="fifteen__num" aria-hidden="true">
            15
          </p>
          <div className="fifteen__text">
            <h3 id="fifteen-h" className="sr-only">
              Age fifteen
            </h3>
            <p className="fifteen__line fifteen__line--1">He was seven when his father, the village imam, died.</p>
            <p className="fifteen__line fifteen__line--2">At fifteen he left Bambali for Dakar, to play football.</p>
            <Evidence fact={facts.dakar} />
            <Evidence fact={facts.father} />
          </div>
          <Road vertical className="fifteen__road" />
        </div>
      </section>
    </div>
  );
}
