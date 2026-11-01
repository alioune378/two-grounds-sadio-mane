/**
 * Content-integrity register.
 *
 * Only a VerifiedFact can be rendered by <Evidence>. Pending, illustrative and
 * excluded items exist here so the team can see them, but the type system keeps
 * them out of the evidence layer. Re-check every item marked `recheck` before any
 * public release.
 */
export type Status = "verified" | "disputed" | "pending" | "illustrative" | "excluded";

export interface Source {
  label: string;
  url: string;
}

interface BaseFact {
  id: string;
  /** Short mono-layer statement, e.g. "16.05.2015 · Southampton 6–1 Aston Villa". */
  line: string;
  note?: string;
  checked: string;
  recheck?: boolean;
}

export interface VerifiedFact extends BaseFact {
  status: "verified";
  sources: [Source, ...Source[]];
}
export interface OpenFact extends BaseFact {
  status: Exclude<Status, "verified">;
  sources: Source[];
}
export type Fact = VerifiedFact | OpenFact;

/** Review date (America/Toronto). Every record below was checked on this date, no later. */
export const REVIEWED = "2026-10-31";
const CHECKED = REVIEWED;

const S = {
  wiki: { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Sadio_Man%C3%A9" },
  gwr: {
    label: "Guinness World Records",
    url: "https://www.guinnessworldrecords.com/world-records/385454-fastest-hat-trick-in-a-football-soccer-english-premier-league-match",
  },
  sky: {
    label: "Sky Sports",
    url: "https://www.skysports.com/football/news/9852435/southamptons-sadio-mane-breaks-robbie-fowlers-record-with-fastest-ever-premier-league-hat-trick",
  },
  ap2022: { label: "AP via theGrio", url: "https://thegrio.com/2022/02/06/senegal-african-cup-win" },
  aa2026: {
    label: "Anadolu",
    url: "https://www.aa.com.tr/en/africa/morocco-awarded-afcon-title-after-caf-overturns-senegal-s-final-win/3869032",
  },
  nbc2026: {
    label: "NBC Sports",
    url: "https://www.nbcsports.com/soccer/news/senegal-stripped-of-afcon-title-morocco-declared-champions-by-governing-body",
  },
  afs2026: {
    label: "AfricaSoccer",
    url: "https://africasoccer.com/afcon-2025-sadio-mane-reflects-on-senegals-triumph-and-uncertain-future/",
  },
  ajCas: {
    label: "Al Jazeera",
    url: "https://www.aljazeera.com/sports/2026/10/7/cas-to-hear-senegal-appeal-over-afcon-title-awarded-to-morocco",
  },
  snaCas: {
    label: "Sport News Africa",
    url: "https://sportnewsafrica.com/en/news/afcon-2025-final-cas-ruling-on-senegalmorocco-due-at-end-of-november/",
  },
  ajSquad: {
    label: "Al Jazeera",
    url: "https://www.aljazeera.com/sports/2026/5/21/sadio-mane-kalidou-koulibaly-star-picks-in-senegals-world-cup-squad",
  },
  dnHospital: {
    label: "Daily News",
    url: "https://dailynews.co.za/sport/soccer/africa/2021-06-23-senegal-and-liverpool-star-sadio-mane-helps-build-first-hospital-in-his-hometown/",
  },
  graphicHospital: {
    label: "Graphic Online",
    url: "https://graphiconline.com/sports/sports-news/sadio-mane-donates-half-million-pounds-to-build-hometown-hospital.html",
  },
  ajCasOct: {
    label: "Al Jazeera, 19 Oct 2026",
    url: "https://www.aljazeera.com/sports/2026/10/19/decision-on-senegals-afcon-final-appeal-to-be-made-by-end-of-november",
  },
  casRelease: {
    label: "CAS media release",
    url: "https://www.tas-cas.org/generated/assets/lists/dceab111-07bc-435f-b5f9-de88eff9db72/CAS%20Media%20Release_12295_appeal.pdf",
  },
  anfieldHospital: { label: "This Is Anfield", url: "https://www.thisisanfield.com/?p=251023" },
  cnnHospital: { label: "CNN Español", url: "https://cnnespanol.cnn.com/2021/06/22/sadio-mane-dona-hospital-senegal-trax" },
  claroStadium: {
    label: "Claro Sports",
    url: "https://www.clarosports.com/futbol/liga-arabia-saudi/sadio-mane-financia-la-construccion-de-un-estadio-en-su-pueblo-natal/",
  },
  rtp: { label: "Right To Play", url: "https://righttoplay.no/en/news/sadio-man%C3%A9-right-to-play-ambassador" },
  bayernSocrates: {
    label: "FC Bayern",
    url: "https://fcbayern.com/en/news/2022/10/sadio-mane-the-inaugural-winner-of-the-socrates-award",
  },
  africaCheck: {
    label: "Africa Check",
    url: "https://africacheck.org/fr/fact-checks/meta-programme-fact-checks/sadio-mane-fausse-citation-ferrari-montre-diamants-avion-paulo-coelho-senegal-bresil-foot",
  },
} satisfies Record<string, Source>;

export const sources = S;

function v(id: string, line: string, src: [Source, ...Source[]], extra: Partial<BaseFact> = {}): VerifiedFact {
  return { id, line, status: "verified", sources: src, checked: CHECKED, ...extra };
}
function o(id: string, status: OpenFact["status"], line: string, src: Source[], note: string): OpenFact {
  return { id, line, status, sources: src, checked: CHECKED, note };
}

export const facts = {
  born: v("born", "10.04.1992 · Bambali, Sédhiou, Senegal", [S.wiki]),
  casamance: v("casamance", "Sédhiou region · Casamance · south of The Gambia", [S.wiki]),
  father: v("father", "Father, the village imam, died when Sadio was seven", [S.wiki]),
  dakar: v("dakar", "Left Bambali for Dakar at 15 to play football", [S.wiki]),
  generation: v("generation", "2009 · spotted in M'Bour · joins Génération Foot", [S.wiki]),
  clubs: v(
    "clubs",
    "Metz 2011 · Salzburg 2012 · Southampton 2014 · Liverpool 2016 · Bayern 2022 · Al-Nassr 2023",
    [S.wiki],
  ),
  hattrick: v("hattrick", "16.05.2015 · Southampton 6–1 Aston Villa · three goals in 2:56", [S.gwr, S.sky], {
    recheck: true,
  }),
  ucl: v("ucl", "European Cup winner · Liverpool · 2019", [S.wiki], { recheck: true }),
  pl: v("pl", "Premier League champion · Liverpool · 2019–20", [S.wiki], { recheck: true }),
  boot: v("boot", "Premier League Golden Boot 2018–19 · shared · 22 goals", [S.wiki], { recheck: true }),
  caf: v("caf", "CAF African Footballer of the Year · 2019 · 2022", [S.wiki], { recheck: true }),
  socrates: v("socrates", "Socrates Award · 2022 (inaugural)", [S.bayernSocrates, S.wiki]),
  ballon: v("ballon", "Ballon d'Or · runner-up · 2022", [S.wiki], { recheck: true }),
  afcon2022: v("afcon2022", "06.02.2022 · Yaoundé · Senegal 0–0 Egypt · 4–2 on penalties · deciding kick", [S.ap2022]),
  afcon2025Pitch: v("afcon2025Pitch", "AFCON 2025 final · Jan 2026 · Senegal 1–0 Morocco a.e.t. on the pitch", [
    S.afs2026,
    S.aa2026,
  ]),
  afcon2025Caf: v("afcon2025Caf", "Mar 2026 · CAF Appeal Board rules a forfeit · title awarded to Morocco (3–0)", [
    S.aa2026,
    S.nbc2026,
    S.ajCasOct,
  ]),
  afcon2025Cas: v(
    "afcon2025Cas",
    "Senegal's appeal heard by CAS 08.10.2026 · award expected end Nov 2026",
    [S.casRelease, S.ajCasOct],
    { recheck: true },
  ),
  wc2026: v("wc2026", "Named in Senegal's 2026 World Cup squad", [S.ajSquad]),
  hospital: v("hospital", "Hospital, Bambali · funded by Mané · inaugurated June 2021", [
    S.anfieldHospital,
    S.cnnHospital,
    S.dnHospital,
  ]),
  rightToPlay: v("rightToPlay", "Right To Play Global Ambassador · since 19.11.2020", [S.rtp]),

  // ---- disputed: both versions exist on the record ----
  afcon2025Title: {
    id: "afcon2025Title",
    line: "AFCON 2025 title",
    status: "disputed",
    sources: [S.aa2026, S.casRelease, S.ajCasOct],
    checked: CHECKED,
    note: "Won on the pitch by Senegal; awarded to Morocco by CAF; under appeal at CAS. Never write 'champions' or 'stripped' alone.",
  } satisfies OpenFact,

  // ---- not for the evidence layer ----
  hospitalAmount: o("hospitalAmount", "pending", "Hospital funding amount (£450,000–€530,000 reported)", [S.anfieldHospital, S.graphicHospital], "Figures differ between outlets."),
  hospitalReach: o("hospitalReach", "pending", "Hospital serves 34 surrounding villages", [S.anfieldHospital], "Single secondary source."),
  stadium: o("stadium", "pending", "Stadium, Bambali · inauguration reported Jan 2024", [S.claroStadium], "Reported in the press; reports differ on new build vs renovation."),
  school: o("school", "pending", "School, Bambali · reported 2019", [S.anfieldHospital, S.wiki], "Reported in the press."),
  connectivity: o("connectivity", "pending", "4G service, petrol station, post office", [S.wiki], "Reported in the press."),
  stipend: o("stipend", "pending", "Monthly payment to every family", [S.africaCheck], "Same lineage as a quotation rated false. High risk."),
  mosque: o("mosque", "pending", "Mosque, Bambali", [], "No reliable source found."),
  coordinates: o("coordinates", "pending", "Bambali coordinates and road distance to Dakar", [], "Use the ANSD gazetteer."),
  ferraris: o("ferraris", "excluded", "“Ten Ferraris…” quotation", [S.africaCheck], "Rated false. Mané's adviser denied it in 2019."),
  inventions: o("inventions", "illustrative", "Agro facility, bakery, trophy museum, health-centre signage", [], "Exist only in rejected concept images."),
} as const;

/** Projects shown in the homecoming ledger as still being checked. */
export const stillChecking: OpenFact[] = [facts.school, facts.stadium, facts.connectivity, facts.stipend];

/** Community register shown at the end of the page, in this order. */
export const initiatives: Fact[] = [
  facts.hospital,
  facts.rightToPlay,
  facts.hospitalAmount,
  facts.hospitalReach,
  facts.stadium,
  facts.school,
  facts.connectivity,
  facts.stipend,
  facts.mosque,
];

export const STATUS_LABEL: Record<Status, string> = {
  verified: "Verified",
  disputed: "Disputed",
  pending: "Reported",
  illustrative: "Illustrative",
  excluded: "Excluded",
};
