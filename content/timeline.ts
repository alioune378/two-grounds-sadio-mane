import { facts, type Fact } from "./facts";

export type Track = "pitch" | "roots";

export interface Entry {
  id: string;
  /** Display year; approximate years are marked "≈". */
  year: string;
  track: Track;
  title: string;
  /** One or two sentences for the detail panel. Facts only; no adjectives of praise. */
  detail: string;
  fact: Fact;
  /** Optional id of the entry on the other track this one should be read against. */
  pair?: string;
}

/**
 * The dual timeline. Roots = Bambali, family and community commitments;
 * Pitch = football. Ordered chronologically; same-year pairs are linked.
 */
export const timeline: Entry[] = [
  { id: "born", year: "1992", track: "roots", title: "Born in Bambali", detail: "Born on 10 April 1992 in Bambali, in Senegal's Sédhiou region.", fact: facts.born },
  { id: "father", year: "≈1999", track: "roots", title: "His father dies", detail: "His father, the village imam, died when Sadio was seven.", fact: facts.father },
  { id: "dakar", year: "≈2007", track: "roots", title: "Leaves for Dakar", detail: "At fifteen he left Bambali for Dakar to play football.", fact: facts.dakar },
  { id: "gf", year: "2009", track: "pitch", title: "Génération Foot", detail: "Spotted in M'Bour, he joined the Génération Foot academy.", fact: facts.generation },
  { id: "metz", year: "2011", track: "pitch", title: "Metz", detail: "His first European club, in France.", fact: facts.clubs },
  { id: "salz", year: "2012", track: "pitch", title: "Salzburg", detail: "Two seasons in Austria with Red Bull Salzburg.", fact: facts.clubs },
  { id: "soton", year: "2014", track: "pitch", title: "Southampton", detail: "His arrival in the Premier League.", fact: facts.clubs },
  { id: "hat", year: "2015", track: "pitch", title: "Three goals in 2:56", detail: "Against Aston Villa, the fastest hat-trick in Premier League history.", fact: facts.hattrick },
  { id: "lfc", year: "2016", track: "pitch", title: "Liverpool", detail: "Six seasons at Anfield.", fact: facts.clubs },
  { id: "ucl", year: "2019", track: "pitch", title: "European Cup", detail: "Winner of the Champions League with Liverpool.", fact: facts.ucl, pair: "school" },
  { id: "school", year: "2019", track: "roots", title: "School, Bambali", detail: "A school in Bambali is reported to have been funded by him in 2019.", fact: facts.school, pair: "ucl" },
  { id: "pl", year: "2020", track: "pitch", title: "Premier League", detail: "Champion with Liverpool, 2019–20.", fact: facts.pl, pair: "rtp" },
  { id: "rtp", year: "2020", track: "roots", title: "Right To Play", detail: "Named a Global Ambassador of Right To Play, which runs sport-and-education programmes in Senegal.", fact: facts.rightToPlay, pair: "pl" },
  { id: "hosp", year: "2021", track: "roots", title: "Hospital, Bambali", detail: "The hospital he funded in his home village was inaugurated in June 2021.", fact: facts.hospital },
  { id: "afcon", year: "2022", track: "pitch", title: "Africa Cup of Nations", detail: "He scored the deciding penalty as Senegal won their first continental title.", fact: facts.afcon2022 },
  { id: "nassr", year: "2023", track: "pitch", title: "Al-Nassr", detail: "After a season at Bayern Munich, he moved to Riyadh.", fact: facts.clubs },
  { id: "stadium", year: "2024", track: "roots", title: "Stadium, Bambali", detail: "The inauguration of a stadium in Bambali, attended by Mané, was reported in January 2024.", fact: facts.stadium },
];
