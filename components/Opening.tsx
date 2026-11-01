"use client";

import { facts } from "@/content/facts";
import { media } from "@/content/media";
import { useProgress } from "@/lib/motion";
import { Cover, Evidence, Plate, Road } from "./primitives";

/**
 * OPENING: one pinned shot (about 4.8 screens), preceded by a timed intro (~6 s).
 *
 *   Timed intro  words over darkness → night lifts over the Bambali sunrise → the sun glows
 *   0.02–0.09    the words leave
 *   0.06–0.26    MATCH CUT, part 1: the sun detaches and drops towards us, becoming a football.
 *                The camera tilts down the red road.
 *   0.20–0.32    part 2: the boy's frame fades in. Its ball sits exactly where the falling sun
 *                lands; both images share an aspect ratio and their focal points are pinned
 *                with object-position, so the alignment holds at any viewport size.
 *   0.34–0.60    push into the ball; red dust fills the frame
 *   0.54–0.74    an iris opens from the ball onto the portrait
 *   0.68–0.92    SADIO MANÉ resolves from the wide Roots voice to the narrow Pitch voice
 */
export default function Opening() {
  const ref = useProgress<HTMLElement>("pin");

  return (
    <section ref={ref} className="seq op" aria-labelledby="op-name" style={{ ["--len" as string]: "480svh" }}>
      <a className="skip" href="#act-1">
        Skip the opening sequence
      </a>
      <div className="seq__stage op__stage">
        {/* Shot 1: Bambali at first light */}
        <div className="op__dawn">
          <div className="op__dawnimg">
            <Cover media={media.bambaliDawn} priority sizes="100vw" />
          </div>
          <div className="op__dawngrade" aria-hidden="true" />
          <span className="op__night" aria-hidden="true" />
          <span className="op__sunball" aria-hidden="true">
            <svg viewBox="-50 -50 100 100" className="op__seams">
              <path d="M0 -18 L17 -5.6 L10.6 14.6 L-10.6 14.6 L-17 -5.6 Z M0 -18 L0 -46 M17 -5.6 L44 -14 M10.6 14.6 L27 37 M-10.6 14.6 L-27 37 M-17 -5.6 L-44 -14" />
            </svg>
          </span>
          <p className="op__notice">Independent concept · private demonstration · not affiliated with Sadio Mané</p>
          <div className="op__intro">
            <p className="kicker op__loc">Bambali · Sédhiou region · Senegal</p>
            <p className="op__lines roots">
              <span className="op__l1">Before the stadiums,</span> <span className="op__l2">there was this ground.</span>
            </p>
            <p className="op__cue" aria-hidden="true">
              Scroll
            </p>
          </div>
          <Plate media={media.bambaliDawn} className="op__dplate" />
        </div>

        {/* Shot 2: the football motif */}
        <div className="op__ground">
          <div className="op__img">
            <Cover media={media.ground} sizes="100vw" />
          </div>
          <div className="op__grade" aria-hidden="true" />
          <div className="op__dust" aria-hidden="true" />
          <Plate media={media.ground} className="op__plate" />
        </div>

        {/* Shot 3: the iris opens on the man */}
        <div className="op__iris">
          <div className="op__portrait">
            <div className="op__portrait-img">
              <Cover media={media.portrait} sizes="(min-width: 900px) 64vw, 100vw" />
            </div>
            <Plate media={media.portrait} className="op__portrait-plate" />
          </div>
          <div className="op__light" aria-hidden="true" />
          <div className="op__title">
            <p className="kicker op__eyebrow">Two Grounds</p>
            <h1 id="op-name" className="op__name">
              <span>Sadio</span> <span>Mané</span>
            </h1>
            <Road className="op__road" />
            <p className="op__dek">
              Born in Bambali, in the Casamance. A footballer of the world&rsquo;s biggest stadiums, and a son of one
              village. This is the story of both grounds.
            </p>
            <Evidence fact={facts.born} />
          </div>
        </div>
      </div>
    </section>
  );
}
