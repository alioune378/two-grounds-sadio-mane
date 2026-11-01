// Preview harness: server-renders the real homepage components with React 19, then
// hydrates them in the browser. This mirrors what Next.js does, so the markup,
// static layout, motion and no-JS behaviour can be tested without Next installed.
//
//   node preview/build.mjs [outDir] [mediaBase] [fontsLink:yes|no]
import { build } from "/opt/npm-tools/node_modules/esbuild/lib/main.js";
import { mkdirSync, readFileSync, writeFileSync, cpSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = new URL("..", import.meta.url).pathname;
const out = resolve(process.argv[2] ?? join(root, "preview/dist"));
const mediaBase = process.argv[3] ?? "";
const fonts = (process.argv[4] ?? "yes") === "yes";
mkdirSync(out, { recursive: true });

const NM = "/opt/npm-tools/node_modules";
const common = {
  bundle: true,
  jsx: "automatic",
  logLevel: "warning",
  alias: { "next/image": join(root, "preview/shims/image.tsx"), "@": root },
  nodePaths: [NM],
  define: { "process.env.NODE_ENV": '"production"' },
  loader: { ".css": "css" },
};

// server bundle
await build({
  ...common,
  entryPoints: [join(root, "preview/server.tsx")],
  platform: "node",
  format: "cjs",
  outfile: join(out, "_server.cjs"),
});
// client bundle
await build({
  ...common,
  entryPoints: [join(root, "preview/client.tsx")],
  platform: "browser",
  format: "iife",
  minify: true,
  outfile: join(out, "app.js"),
});

globalThis.__MEDIA_BASE__ = mediaBase;
const { createRequire } = await import("node:module");
const { render } = createRequire(import.meta.url)(join(out, "_server.cjs"));
const markup = render();
const css = readFileSync(join(out, "_server.css"), "utf8");
const boot = (await import(pathToFileURL(join(root, "lib/boot.ts")).href).catch(() => null))?.MOTION_BOOT
  ?? readFileSync(join(root, "lib/boot.ts"), "utf8").match(/`([\s\S]*)`/)[1];
const js = readFileSync(join(out, "app.js"), "utf8");
const fontLink = fonts
  ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,100..900&family=IBM+Plex+Mono:wght@400;500&family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,400&display=swap">`
  : "";

const head = `<title>Two Grounds</title>
<meta name="robots" content="noindex, nofollow">
<meta name="claude:viewport-fit-sides" content="cover">
<script>${boot}</script>
${fontLink}
<style>${css}</style>`;
const body = `<div id="root">${markup}</div>
<script>window.__MEDIA_BASE__=${JSON.stringify(mediaBase)};</script>
<script>${js}</script>`;

// Fragment for the Artifact host (it supplies doctype/head/body), and a full document for local tests.
writeFileSync(join(out, "fragment.html"), head + "\n" + body);
writeFileSync(
  join(out, "index.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">${head}</head><body>${body}</body></html>`,
);
cpSync(join(root, "public/media"), join(out, "media"), { recursive: true });
console.log("preview built:", out, `(${(js.length / 1024).toFixed(0)} KB js, ${(css.length / 1024).toFixed(0)} KB css)`);
