# Factual-integrity and asset-provenance report

> **Phase 3.1 note (1 Nov 2026):** for the private demonstration, the AFCON 2025 dispute is omitted
> from the page; community projects other than the hospital and Right To Play are shown with a
> "Reported" tag; and the project's AI concept imagery is used throughout, each frame labelled
> "Concept visualization". That includes concept images in the likeness of Sadio Mané, and of
> facilities that are not the real buildings. The record below is otherwise unchanged.

**Review date: 31 October 2026** (America/Toronto). Nothing below was checked after this date.
The machine-readable register is `content/facts.ts`. This report mirrors it.

Classes: **Verified**, supported by an identified source · **Disputed**, conflicting official
positions on the record · **Pending**, reported but not confirmed · **Illustrative**, concept only
· **Excluded**, contradicted or denied.

Only Verified items can render in the monospace evidence style, and this is enforced by the
TypeScript type `VerifiedFact`. A compile-time test confirms that a pending item is rejected.

## 1. Statements on the homepage

| Statement | Status | Sources | Where |
|---|---|---|---|
| Born 10 April 1992, Bambali, Sédhiou, Senegal | Verified | Wikipedia | Reveal, timeline |
| Bambali is in the Sédhiou region of the Casamance, south of The Gambia | Verified | Wikipedia | Act I |
| His father, the village imam, died when he was seven | Verified | Wikipedia (citing Mané's interviews) | Act I, timeline |
| Left Bambali for Dakar at 15 to play football | Verified | Wikipedia | Act I, Act III, timeline |
| 2009: spotted in M'Bour, joined Génération Foot | Verified | Wikipedia | Journey, timeline |
| Clubs: Metz 2011, Salzburg 2012, Southampton 2014, Liverpool 2016, Bayern 2022, Al-Nassr 2023 | Verified | Wikipedia; recent Al-Nassr match reports | Journey, Act III, timeline |
| Fastest Premier League hat-trick: 2:56, 16 May 2015, Southampton 6–1 Aston Villa | Verified (re-check at launch) | Guinness World Records; Sky Sports | Act II |
| Timestamp of the second goal | Pending | Match log needed | Not shown |
| European Cup 2019; Premier League 2019–20; shared Golden Boot 2018–19 (22 goals) | Verified (confirm with UEFA / PL) | Wikipedia | Record, timeline |
| CAF African Footballer of the Year 2019 and 2022 | Verified (confirm with CAF) | Wikipedia | Record |
| Socrates Award 2022 (inaugural) | Verified | FC Bayern; Wikipedia | Record |
| Ballon d'Or runner-up 2022 | Verified (confirm with France Football) | Wikipedia | Record |
| AFCON final, 6 Feb 2022, Yaoundé: 0–0, 4–2 on penalties, deciding kick | Verified | AP (via theGrio) | Senegal |
| AFCON 2025 final, Jan 2026: Senegal 1–0 Morocco a.e.t. on the pitch | Verified | AfricaSoccer; Anadolu | Senegal record |
| Mar 2026: CAF Appeal Board rules a forfeit, title to Morocco (3–0) | Verified | Anadolu; NBC Sports; Al Jazeera | Senegal record |
| Senegal's appeal heard by CAS on 8 Oct 2026; award expected end Nov 2026 | Verified (**re-check before any presentation after 30 Nov**) | CAS media release; Al Jazeera 19 Oct 2026 | Senegal record |
| **Who holds the AFCON 2025 title** | **Disputed** | As above | Tagged, never asserted |
| Exact day of the AFCON 2025 final | Pending | CAF match report needed | "Jan 2026" shown |
| Hospital in Bambali funded by Mané, inaugurated June 2021 | Verified | This Is Anfield; CNN Español; Daily News | Act III, timeline, register |
| Right To Play Global Ambassador since 19 Nov 2020 | Verified | Right To Play (organisation's page) | Timeline, register |

## 2. Community claims shown only as "being verified"

| Claim | Status | Why |
|---|---|---|
| Hospital funding amount (£450,000–€530,000) | Pending | Figures differ between outlets |
| Hospital serves 34 surrounding villages | Pending | Single secondary source |
| Stadium in Bambali, inauguration reported Jan 2024 | Pending | Reports conflict on new build vs renovation; no official source |
| School in Bambali, reported 2019 | Pending | Secondary sources only |
| 4G service, petrol station, post office | Pending | Secondary round-ups only |
| Monthly payment to every family | Pending, high risk | Same lineage as a quotation rated false |
| Mosque in Bambali | Pending | No reliable source found |

## 3. Excluded and illustrative

| Item | Status | Note |
|---|---|---|
| "Ten Ferraris, twenty diamond watches…" quotation | **Excluded** | Rated false by Africa Check; Mané's media adviser denied it (2019). Never shown. |
| Agro facility "SM10 Agro", bakery, trophy museum, health-centre and school signage | Illustrative | Exist only in rejected concept images |
| Quotations of any kind | None used | No quotation has a verified primary recording |
| Endorsements, partnerships, foundation affiliations | None claimed | The site states it is independent and unaffiliated |

Editorial sentences that are not facts, such as "a footballer of the world's biggest stadiums"
and "the stadiums changed; the village stayed where it was", carry no numbers, dates or claims
about outcomes.

## 4. Asset provenance

| Asset | Kind | Plate shown | Status |
|---|---|---|---|
| `ground-illustration` (concept B03, boy and ball) | AI illustration | "Illustration · AI concept · not Sadio Mané · not a historical photograph" | Prototype only |
| `ground-detail-illustration` (crop of B03) | AI illustration | "…not a historical photograph" | Prototype only |
| `baobab-illustration` (concept B12) | AI illustration | "…not a historical photograph" | Prototype only |
| Drawn landscapes (opening, Act I, Act III) | Generated SVG (`lib/landscape.ts`) | "Drawing · generated landscape · not a depiction of a specific place" | Original work; contains no buildings, people or institutions |
| Schematic map | Hand-built SVG | "Schematic · outlines simplified · Bambali position approximate" | Replace outlines with Natural Earth data before launch |
| Portrait slot | Empty | "Portrait reserved for a licensed photograph" | **Needs licensed photograph** |
| B02 / A01 village aerials | AI illustration | n/a | **Retired in Phase 3**: invented buildings read as Bambali |
| B01, B04, B05 (synthetic likenesses of Mané) | AI | n/a | **Rejected; never used**; blocked by the build gate |
| B06, B08, A02–A04, A06, A08, A09 (invented signage, businesses, buildings) | AI | n/a | **Rejected**; blocked by the build gate |

All three AI illustrations were enlarged from a contact sheet and hold roughly 500px of real
detail. They are displayed graded, in motion or in apertures, and must be replaced before any
public use.
