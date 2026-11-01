# Two Grounds

An independent interactive-documentary concept about Sadio Mané: the pitch, and Bambali.
A **private creative demonstration**: not an official website, and not affiliated with or
endorsed by its subject. Every picture is an AI-generated concept visualization, labelled where it
appears. Some show a likeness of Sadio Mané, and some show facilities that are not the real
buildings. Replace them with licensed photography in any authorised production.

Next.js (App Router) · React 19 · TypeScript · `next/font` · a 1 KB in-house scroll engine.
See `CHANGELOG.md` (Phase 3), `INTEGRITY.md` (facts and provenance) and `REQUIREMENTS.md`
(photography and content still needed).

---

## 1. Run locally

```bash
npm install
npm run dev                      # http://localhost:3000 (gate is open in development only)
npm run check                    # integrity gate (also runs before every build)
node tests/middleware.test.mjs   # access-gate tests (needs esbuild; see note in the file)
```

## 2. Private deployment

The site is **private by default and fails closed.** `middleware.ts` requires HTTP Basic auth on
every path, including `/_next` assets and optimised images. A production deployment without
credentials answers `503`; it does not serve the site.

| Variable        | Value                                                                 |
| --------------- | --------------------------------------------------------------------- |
| `SITE_USER`     | any username                                                          |
| `SITE_PASSWORD` | 12+ characters (shorter is refused with 503)                          |
| `ACCESS_MODE`   | `private` (default). Set `public` only for an approved public launch. |

### Vercel (recommended)
1. Push this folder to a **private** Git repository and import it in Vercel (preset: Next.js).
2. Settings → Environment Variables: add `SITE_USER` and `SITE_PASSWORD` for **Production and
   Preview**.
3. Settings → Deployment Protection: also enable Vercel Authentication or Password Protection.
   Two independent layers are better than one.
4. Deploy, then confirm: an incognito window must get a password prompt, and
   `curl -I https://<your-domain>/` must return `401` with `WWW-Authenticate`.

### Netlify (current setup: project `two-grounds-sadio-mane`)
Access is protected by **Netlify's site password**, enabled on all deploys. `ACCESS_MODE=public` is
set in Netlify so the app's own Basic-auth gate does not prompt a second time. To use the app gate
instead, remove that variable and set `SITE_USER` / `SITE_PASSWORD`.

Import the repo (the Next.js runtime is detected), add the same variables, deploy, and optionally
enable site-wide password protection.

### Self-host
`npm ci && npm run build && npm start` behind **HTTPS only**. Basic auth must never run over HTTP.

Every response also carries `X-Robots-Tag: noindex`. Metadata sets `noindex, nofollow,
noimageindex`, `robots.txt` disallows everything, and no Open Graph image is published.

**Rotating access:** change `SITE_PASSWORD` and redeploy. Browsers holding the old credentials are
challenged again.

## 3. Structure

```
app/            layout (fonts, boot script, metadata) · page · globals.css · error · not-found · robots · icon
components/     Opening · ActOne · ActTwo · Timeline · Homecoming · Coda · Footer · Landscape · primitives
content/        facts.ts (integrity register) · media.ts (provenance + photo slots) · timeline.ts
lib/            motion.ts (scroll engine) · landscape.ts (seeded drawing geometry) · boot.ts
middleware.ts   fail-closed private gate
scripts/        check-integrity.mjs (build gate)
tests/          middleware tests · sandbox type-check config
preview/        test harness used in the build sandbox (SSR + hydrate without Next); not deployed
```

## 4. Motion, accessibility and fallbacks

* A `<head>` script sets `js` (interactive components) and, unless reduced motion is requested,
  `motion` (pinned choreography and the timed intro). Without these classes the page is a complete
  static layout and nothing waits for a script.
* All choreography is CSS driven by one number per section (`--p`), animating transform and
  opacity only, plus three single-headline width changes. No GSAP was needed (and the npm registry
  was unreachable in the build sandbox).
* Skip link first; visible focus on every control; the timeline supports Arrow, Home and End keys;
  tap targets of at least 44px; Pitch and Roots are distinguished by position, shape, type and label,
  not by colour alone.
* Images: average-colour ground and blur preview while loading; on error, the image steps aside and
  the provenance plate stays.

## 5. Swapping in licensed photography

Each image is one entry in `content/media.ts`. Replace the file in `public/media/`, change `kind` to
`"photograph"` and add credit, date and licence. The plate updates automatically. Keep the
same aspect ratio and focal point for `bambaliDawn` (sun) and `ground` (ball): the opening match cut
depends on them.

## 6. Verification record (Phase 3, 31 October 2026)

**Run in the build sandbox:** Chromium/Playwright, using the preview harness, which renders these same
components with React 19 server rendering followed by hydration.
* Full story captured at 375, 768, 1440 and 1920px: no horizontal overflow, no console or hydration
  errors.
* 24 interaction checks passed (including: every image carries a concept label; the AFCON 2025 dispute is absent): keyboard (skip link, timeline arrows, Home, End, filters, pair jump,
  81 tab stops with visible focus), touch (expand rows, filters, 44px targets), reduced motion,
  JavaScript off at mobile and desktop, image-failure fallback, and timeline panel height stability.
* Emulated mobile (375px, 1.6 Mbps / 150 ms, CPU ×1 and ×4): CLS 0 at rest and after a full
  scroll; scroll frame median 16.7 ms, p95 16.8 ms. LCP was reported at 0.5–0.6 s, but Chrome
  attributed it to a paragraph inside the clipped reveal layer, so treat the LCP figure as
  indicative only. Rendering here is software-only, so real devices will differ.
* `middleware.ts`: 10 of 10 gate cases passed (fail-closed, 401s, malformed header, `:` in password,
  dev and public modes).
* TypeScript strict pass over all app code using minimal stand-in declarations
  (`tests/tsconfig.check.json`); compile-time proof that a pending fact cannot render as evidence;
  ESLint (core rules) on the scripts; integrity gate passed.

**Not run, because Next.js, @types/react, the web fonts, Lighthouse and axe could not be installed:**
`next build`, `next start`, `next/font`, `next/image` optimisation, the middleware inside the Next
runtime, rendering with the real fonts, Lighthouse, axe and screen readers. Run them before
presenting:

```bash
npm install && npm run build && SITE_USER=u SITE_PASSWORD='a-long-passphrase' npm start
npx tsc --noEmit
npx lighthouse http://u:a-long-passphrase@localhost:3000 --preset=desktop
npx @axe-core/cli http://localhost:3000
```

## 7. Before presenting

* After **30 November 2026**, update the AFCON 2025 record with the CAS award.
* Re-check facts marked `recheck: true`, and update `REVIEWED` in `content/facts.ts`. The build
  refuses a future date.
