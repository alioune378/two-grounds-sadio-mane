"use client";

import { facts, type Fact } from "@/content/facts";
import { media, type Media } from "@/content/media";
import { useProgress } from "@/lib/motion";
import { Cover, Evidence, Plate, StatusTag } from "./primitives";

/**
 * ACT III, the emotional centrepiece. The pace changes before the words do:
 * the longest pin on the page and the slowest easing.
 *
 *   0.00–0.26  FULL TIME. The floodlight narrows to a single point.
 *   0.26–0.40  Silence: black, one warm point where the light was.
 *   0.38–0.52  The point opens into a line: the red road becomes the horizon.
 *   0.44–0.80  First light: the opening's Bambali sunrise returns, settling slowly.
 *              The point sits exactly on that image's sun, so the light that left the
 *              stadium becomes the sunrise over the village.
 *   0.70–0.95  "Bambali" in the widest Roots voice.
 */

interface Work {
  m: Media;
  t: string;
  y: string;
  d: string;
  f: Fact;
}
const WORKS: Work[] = [
  { m: media.hospital, t: "A hospital", y: "2021", d: "He paid for a hospital in the village where he was born. It opened in June 2021.", f: facts.hospital },
  { m: media.school, t: "A school", y: "2019", d: "A school for the village's children, reported as funded by him in 2019.", f: facts.school },
  { m: media.stadium, t: "A ground to play on", y: "2024", d: "A stadium for Bambali, its inauguration reported in January 2024.", f: facts.stadium },
  { m: media.connectivity, t: "A connection", y: "", d: "Reports also credit him with bringing 4G internet service to the village.", f: facts.connectivity },
];

export default function Homecoming() {
  const seq = useProgress<HTMLElement>("pin");
  const prose = useProgress<HTMLElement>("pass");
  const works = useProgress<HTMLElement>("pass");

  return (
    <div className="chapter chapter--dusk" id="act-3">
      <section ref={seq} className="seq ho" aria-labelledby="ho-h" style={{ ["--len" as string]: "460svh" }}>
        <div className="seq__stage ho__stage">
          <div className="ho__night">
            <span className="ho__cone" aria-hidden="true" />
            <p className="act__n ho__act">Act III · The return</p>
            <p className="ho__ft pitch">Full time.</p>
          </div>
          <div className="ho__dawn">
            <div className="ho__img">
              <Cover media={media.bambaliDawn} sizes="100vw" />
            </div>
            <div className="ho__grade" aria-hidden="true" />
            <span className="ho__horizon" aria-hidden="true" />
            <div className="ho__words shell">
              <h2 id="ho-h" className="ho__name roots">
                Bambali
              </h2>
              <p className="ho__sub roots">Where the road began.</p>
            </div>
            <Plate media={media.bambaliDawn} className="ho__plate" />
          </div>
          <span className="ho__point" aria-hidden="true" />
        </div>
      </section>

      <section ref={prose} className="return" aria-labelledby="return-h">
        <div className="return__inner shell">
          <div className="return__text">
            <h3 id="return-h" className="sr-only">
              The return
            </h3>
            <p className="return__p return__p--lead">
              Metz, Salzburg, Southampton, Liverpool, Munich, Riyadh. The stadiums changed. The village stayed where it
              was.
            </p>
            <p className="return__p">
              The boy who ran away to Dakar at fifteen came back with the means to change something, and he spent them on
              the place that raised him.
            </p>
            <Evidence fact={facts.rightToPlay} />
          </div>
          <figure className="return__detail">
            <div className="return__frame">
              <Cover media={media.nextGeneration} sizes="(min-width: 900px) 30vw, 80vw" />
            </div>
            <Plate media={media.nextGeneration} />
          </figure>
        </div>
      </section>

      <section ref={works} className="works" id="community" aria-labelledby="works-h">
        <div className="shell">
          <p className="kicker">Bambali</p>
          <h3 id="works-h" className="works__h roots">
            What came back.
          </h3>
          <ol className="works__grid">
            {WORKS.map((w, i) => (
              <li key={w.t} className={`work work--${i + 1}`} style={{ ["--i" as string]: i }}>
                <figure className="work__fig">
                  <div className="work__frame">
                    <Cover media={w.m} sizes={i === 0 ? "(min-width: 900px) 62vw, 100vw" : "(min-width: 900px) 38vw, 100vw"} />
                  </div>
                  <Plate media={w.m} className="work__plate" />
                </figure>
                <div className="work__text">
                  <p className="work__meta">
                    {w.y && <span className="work__y">{w.y}</span>}
                    <StatusTag fact={w.f} />
                  </p>
                  <p className="work__t roots">{w.t}</p>
                  <p className="work__d">{w.d}</p>
                  {w.f.status === "verified" && <Evidence fact={w.f} />}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
