import { facts, type Source } from "@/content/facts";
import { media, plateText } from "@/content/media";

/** Sources, image notes and the independent-concept notice. Server component. */
export default function Footer() {
  const imgs = Object.values(media);
  // Only the sources behind facts that appear on the page.
  const shown = [
    facts.born, facts.casamance, facts.father, facts.dakar, facts.generation, facts.clubs, facts.hattrick,
    facts.ucl, facts.pl, facts.boot, facts.caf, facts.socrates, facts.ballon, facts.afcon2022,
    facts.hospital, facts.rightToPlay, facts.school, facts.stadium, facts.connectivity,
  ];
  const list: Source[] = [];
  for (const f of shown) for (const s of f.sources) if (!list.some((x) => x.url === s.url)) list.push(s);
  return (
    <footer className="foot">
      <div className="foot__grid shell">
        <section aria-labelledby="disc-h" className="foot__col">
          <h2 id="disc-h" className="foot__h">
            A private demonstration
          </h2>
          <p>
            Two Grounds is an independent creative concept, made to show what an official digital story could become. It
            is not an official Sadio Mané website and is not affiliated with, authorised or endorsed by him, his
            representatives, or any club, federation or organisation named here.
          </p>
        </section>

        <section id="provenance" aria-labelledby="img-h" className="foot__col">
          <h2 id="img-h" className="foot__h">
            About the images
          </h2>
          <p>
            Every picture on this page is an AI-generated concept visualization, labelled where it appears. None is a
            photograph of Sadio Mané, of Bambali, or of any real building or person. In an authorised production, each
            would be replaced by licensed photography.
          </p>
          <details className="foot__more">
            <summary>All image labels ({imgs.length})</summary>
            <ul className="foot__list">
              {imgs.map((m) => (
                <li key={m.src}>{plateText(m)}</li>
              ))}
            </ul>
          </details>
        </section>

        <section id="sources" aria-labelledby="src-h" className="foot__col foot__col--wide">
          <h2 id="src-h" className="foot__h">
            Sources
          </h2>
          <p>
            Dates, scores and achievements in the monospace style link to their sources. Community projects marked
            &ldquo;Reported&rdquo; are drawn from press reports.
          </p>
          <ul className="foot__list foot__list--cols">
            {list.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="foot__end shell">
        <a href="#op-name">Back to the beginning ↑</a>
      </p>
    </footer>
  );
}
