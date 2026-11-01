"use client";

import { useCallback, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { STATUS_LABEL } from "@/content/facts";
import { timeline, type Entry, type Track } from "@/content/timeline";
import { Evidence, StatusTag } from "./primitives";

type Filter = "all" | Track;

function Sources({ e }: { e: Entry }) {
  if (e.fact.status === "verified") return <Evidence fact={e.fact} />;
  return (
    <div className="tlx__open">
      <p className="tlx__note">
        <StatusTag fact={e.fact} /> {e.fact.note}
      </p>
      {e.fact.sources.length > 0 && (
        <p className="tlx__reported">
          Reported by:{" "}
          {e.fact.sources.map((s, i) => (
            <a key={s.url + i} href={s.url} target="_blank" rel="noopener noreferrer">
              {s.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
        </p>
      )}
    </div>
  );
}

/**
 * Dual timeline.
 * Desktop with JS: a board. Pitch entries stand above the red road and Roots entries
 * hang below it, one column per year, with same-year pairs joined across the road.
 * Selecting an entry opens it in the panel. Arrow keys move through time.
 * Mobile, and no JS: the same entries as one chronological list of expandable rows.
 */
export default function Timeline() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sel, setSel] = useState<string>("ucl");
  const btns = useRef<Record<string, HTMLButtonElement | null>>({});

  const years = useMemo(() => Array.from(new Set(timeline.map((e) => e.year))), []);
  const byId = useMemo(() => Object.fromEntries(timeline.map((e) => [e.id, e])), []);
  const current = byId[sel] ?? timeline[0];
  const pair = current.pair ? byId[current.pair] : undefined;
  const visible = (e: Entry) => filter === "all" || e.track === filter;

  const move = useCallback(
    (ev: KeyboardEvent<HTMLButtonElement>, id: string) => {
      const order = timeline.filter(visible);
      const i = order.findIndex((e) => e.id === id);
      let next: Entry | undefined;
      if (ev.key === "ArrowRight" || ev.key === "ArrowDown") next = order[i + 1];
      else if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") next = order[i - 1];
      else if (ev.key === "Home") next = order[0];
      else if (ev.key === "End") next = order[order.length - 1];
      if (next) {
        ev.preventDefault();
        setSel(next.id);
        btns.current[next.id]?.focus();
      }
    },
    [filter],
  );

  const lane = (track: Track) =>
    timeline
      .filter((e) => e.track === track)
      .map((e, k) => {
        const col = years.indexOf(e.year);
        // alternate near/far rows so each label can span two year-columns without colliding
        const far = k % 2 === 1;
        const row = track === "pitch" ? (far ? 1 : 2) : far ? 2 : 1;
        return (
          <button
            key={e.id}
            ref={(el: HTMLButtonElement | null) => {
              btns.current[e.id] = el;
            }}
            type="button"
            className={`tlx__node tlx__node--${e.track} tlx__node--${e.fact.status} ${far ? "tlx__node--far" : ""}`}
            style={{ gridColumn: `${col + 1} / span 2`, gridRow: row }}
            aria-pressed={sel === e.id}
            aria-describedby="tlx-hint"
            tabIndex={visible(e) ? 0 : -1}
            data-dim={visible(e) ? undefined : "true"}
            onClick={() => setSel(e.id)}
            onKeyDown={(ev: KeyboardEvent<HTMLButtonElement>) => move(ev, e.id)}
          >
            <span className="tlx__node-y">{e.year}</span>
            <span className="tlx__node-t">{e.title}</span>
            {e.fact.status !== "verified" && <span className="sr-only">, {STATUS_LABEL[e.fact.status]}</span>}
          </button>
        );
      });

  return (
    <section className="tlx" aria-labelledby="tl-h" id="timeline">
      <div className="shell">
        <header className="tlx__head">
          <p className="kicker">Two tracks, one chronology</p>
          <h2 id="tl-h" className="tlx__title">
            <span className="pitch">The pitch</span> <span className="tlx__amp">&amp;</span>{" "}
            <span className="roots">the roots</span>
          </h2>
          <p className="tlx__intro">
            Football above the road, Bambali below it. Where a year holds both, they are joined across the road.
          </p>
          <div className="tlx__filters" role="group" aria-label="Show">
            {(["all", "pitch", "roots"] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className={`tlx__filter tlx__filter--${f}`}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "Both grounds" : f === "pitch" ? "Pitch" : "Roots"}
              </button>
            ))}
          </div>
        </header>

        {/* Desktop board (JS) */}
        <div className="tlx__board" role="group" aria-label="Timeline board">
          <p id="tlx-hint" className="sr-only">
            Use the left and right arrow keys to move through time.
          </p>
          <p className="tlx__lanelabel tlx__lanelabel--pitch" aria-hidden="true">
            Pitch
          </p>
          <div className="tlx__lane tlx__lane--pitch" style={{ gridTemplateColumns: `repeat(${years.length + 1}, minmax(0, 1fr))` }}>
            {lane("pitch")}
          </div>
          <div className="tlx__axis" style={{ gridTemplateColumns: `repeat(${years.length + 1}, minmax(0, 1fr))` }} aria-hidden="true">
            {years.map((y, col) => {
              const paired = timeline.some((e) => e.year === y && e.pair);
              const active = current.year === y;
              return (
                <span
                  key={y}
                  className={`tlx__tick ${paired ? "tlx__tick--pair" : ""} ${active ? "tlx__tick--on" : ""}`}
                  style={{ gridColumn: col + 1 }}
                />
              );
            })}
          </div>
          <div className="tlx__lane tlx__lane--roots" style={{ gridTemplateColumns: `repeat(${years.length + 1}, minmax(0, 1fr))` }}>
            {lane("roots")}
          </div>
          <p className="tlx__lanelabel tlx__lanelabel--roots" aria-hidden="true">
            Roots
          </p>

          <div className={`tlx__panel tlx__panel--${current.track}`} aria-live="polite">
            <div className="tlx__panel-main">
              <p className="tlx__panel-meta">
                <span className="tlx__panel-track">{current.track === "pitch" ? "Pitch" : "Roots"}</span>
                <span>{current.year}</span>
                <StatusTag fact={current.fact} />
              </p>
              <p className={`tlx__panel-t ${current.track === "pitch" ? "pitch" : "roots"}`}>{current.title}</p>
              <p className="tlx__panel-d">{current.detail}</p>
              <Sources e={current} />
            </div>
            {pair && (
              <div className="tlx__panel-pair">
                <p className="kicker">Same year, other ground</p>
                <button type="button" className="tlx__pairbtn" onClick={() => setSel(pair.id)}>
                  <span className={pair.track === "pitch" ? "pitch" : "roots"}>{pair.title}</span>
                  <span className="tlx__pairstatus">{STATUS_LABEL[pair.fact.status]}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile and no-JS list */}
        <ol className="tlx__list">
          {timeline.map((e) => (
            <li
              key={e.id}
              className={`tlx__item tlx__item--${e.track} tlx__item--${e.fact.status}`}
              hidden={!visible(e)}
            >
              <details>
                <summary>
                  <span className="tlx__item-meta">
                    <span className="tlx__item-track">{e.track === "pitch" ? "Pitch" : "Roots"}</span>
                    <span className="tlx__item-y">{e.year}</span>
                    {e.fact.status !== "verified" && <StatusTag fact={e.fact} />}
                  </span>
                  <span className="tlx__item-t">{e.title}</span>
                </summary>
                <div className="tlx__item-body">
                  <p>{e.detail}</p>
                  <Sources e={e} />
                  {e.pair && byId[e.pair] && (
                    <p className="tlx__item-pair">Same year, other ground: {byId[e.pair].title}</p>
                  )}
                </div>
              </details>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
