# Changelog

## Phase 3.1: private demonstration cut (1 November 2026)

Direction change: this is a **private creative demonstration** for Sadio Mané and his
representatives, not a public launch.

- **The project's own AI imagery is back at the centre.** 15 of the 24 concept images are now used
  (see `content/media.ts`). Every frame carries a "Concept visualization · AI-generated · not …" plate.
- **Opening:** the Bambali sunrise (B02) arrives under the opening words. On scroll, its sun falls,
  rolls and becomes the football in the boy image (B03). The two images share an aspect ratio and
  their focal points are pinned, so the sun lands exactly on the ball at any screen size. The camera
  pushes into the ball, and an iris opens onto the concept portrait (B01) as the name resolves.
- **Act I:** the Casamance aerial (A01) as a full-bleed panorama, and a new childhood scene (A12
  with a B03 detail).
- **Act II:** full-bleed concept image behind *The pitch* (B04), a trophy-cabinet band above the
  record (B09), and the Senegal 2022 chapter beside the trophy concept (B05).
- **Act III:** the floodlight closes to a point that lands on the sun of the opening's sunrise. The
  horizon opens and the same image returns. A new "What came back" section shows the hospital
  (verified), the school, the stadium and connectivity (reported), each as a labelled concept
  visualization, plus the Right To Play role.
- **Finale:** a pinned six-frame montage (ball, stadiums, cup, way home, next generation, baobab)
  resolves into *The pitch / the roots* title card, then the end navigation.
- **Removed:** the unresolved AFCON 2025 dispute (not needed for the story), the drawn landscapes,
  the empty portrait frame, and the long verification ledgers. The community claims keep a light
  "Reported" tag, and the sources list shows only what the page uses.
- **Unchanged:** the private access gate, noindex, reduced-motion and no-JS layouts, keyboard and
  touch behaviour, and the independent-concept notice.
- **Not used, and why:** "SM10 Agro" images (an invented business in his name), the bakery and
  mosque (no reported project behind them), the globe (its hub sits off Senegal), the textile (a
  misattributed weave), and duplicates.

## Phase 3: cinematic production refinement (reviewed 31 October 2026)

### Experience
- **Opening, rebuilt.** It now opens on a quiet drawn Casamance horizon at first light. A timed
  intro of about 6 seconds runs on load: the words *"Before the stadiums, there was this ground."*
  arrive over darkness, then the night lifts beneath them. The horizon draws, the sun rises, and
  the tree lines settle in depth. On scroll, **the sun drops onto the red road and rolls towards
  the viewer as a football**. The labelled illustration of an anonymous boy takes over, the camera
  pushes into his ball, and an iris opens on the name.
- **Act I.** A new drawn panorama ("Flat land, a long horizon, red earth.") with parallax depth
  layers. The map gains a pulsing home marker and a country label. The "15" scene now carries
  evidence lines for both facts it states.
- **Act II.** "The road goes north" is now a pinned **horizontal journey** on desktop: the red road
  runs through seven stops from Dakar to Riyadh, and an outlined year counter advances as each
  stop lights. Mobile keeps a stepped vertical list. The record adds the Socrates Award. Its
  sources fold into a disclosure. The AFCON 2025 note is tagged **Disputed**.
- **Dual timeline, rebuilt** as an interactive editorial board (≥1100px with JS). Pitch entries
  stand above the red road and Roots entries hang below it. Same-year pairs are joined by a
  glowing thread across the road. There are filters (Both / Pitch / Roots), a detail panel with
  status and sources, and a "same year, other ground" jump. Arrow, Home and End keys move through
  time. Mobile and no-JS get one chronological list of expandable rows, with the same filters.
- **Act III.** Full time → the floodlight narrows to a point → silence → the point opens into the
  horizon → **the same drawn landscape as the opening returns** → the road draws itself from the
  horizon towards the viewer → *Bambali*. The page ends where it began. The light point is placed
  mathematically on the drawing's vanishing point at every viewport size.
- **Finale.** The baobab coda. *The pitch* and *the roots* meet on either side of one road. Clear
  end navigation leads to the timeline, community initiatives, sources and method, and image
  provenance. Supporting stories are listed as "not yet published".
- **New registers:** a community-initiatives table (verified / being verified, with notes and
  sources), sources and method, and image provenance.

### Integrity
- Review date corrected to **31 October 2026**, the reviewer's local date (America/Toronto).
  Phase 2 had recorded 1 November, the UTC date at the time of review, which presented the check
  as happening a day later than it did.
- New status **Disputed** (AFCON 2025 title). Status tags now appear everywhere a claim is shown.
- Re-verified: CAS hearing on 8 Oct 2026, with the award expected at the end of November 2026
  (CAS release, Al Jazeera 19 Oct). CAF's forfeit ruling awarded the match 3–0. The hospital was
  inaugurated in June 2021. He has been a Right To Play Global Ambassador since 19 Nov 2020
  (organisation's own page). The Socrates Award is confirmed by FC Bayern.
- **Corrected a Phase 1 classification:** a stadium in Bambali was reported inaugurated in
  January 2024, so it moves from "illustrative" to "being verified". Reports conflict on new build
  versus renovation.
- **Retired the B02 village illustration.** It shows invented buildings that would be read as
  Bambali. It is replaced by a generated drawing with no buildings, people or institutions.
- The build gate now also fails on a future review date and on retired images.

### Engineering
- Blur-up placeholders and average-colour grounds for every image. Error fallback that keeps the
  composition and provenance plate. `app/error.tsx`, `app/not-found.tsx`, `app/robots.ts`
  (disallow all), `app/icon.svg`, noindex metadata with `noimageindex`, and no Open Graph image.
- Boot script now sets `js` (interactive components) separately from `motion` (choreography), so
  reduced-motion visitors still get the interactive timeline.
- Intro animations use backwards fill so they never fight the scroll choreography. All motion is
  transform and opacity, plus three single-headline width changes.
- Access-gate tests (`tests/middleware.test.mjs`) and a sandbox type-check config
  (`tests/tsconfig.check.json`).
