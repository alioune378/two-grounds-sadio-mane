#!/usr/bin/env node
/**
 * Pre-build integrity gate. Fails the build when:
 *  1. Display copy spells the name without its accent ("Mane" instead of "Mané").
 *  2. A concept image the team decided not to use (invented business, misattributed
 *     culture, geographic error, unbacked projects) is in /public.
 *  3. The media register contains an entry without a `kind` (provenance) field.
 *  4. Excluded content (the false "ten Ferraris" quotation) appears in components.
 *  5. A review date later than today is recorded (future verification claimed as done).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const errors = [];

function walk(dir, exts, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, exts, out);
    else if (exts.some((e) => p.endsWith(e))) out.push(p);
  }
  return out;
}

// 1 + 4: copy checks (URLs are stripped first; they legitimately contain "sadio-mane")
for (const file of walk(join(root, "components"), [".tsx", ".ts"]).concat(walk(join(root, "content"), [".ts"]))) {
  const text = readFileSync(file, "utf8").replace(/https?:\/\/\S+/g, "");
  text.split("\n").forEach((line, i) => {
    if (/\bMane\b/.test(line)) errors.push(`${relative(root, file)}:${i + 1} "Mane" without accent`);
    if (/Ferrari/i.test(line) && file.includes("components"))
      errors.push(`${relative(root, file)}:${i + 1} excluded quotation used in a component`);
  });
}

// 2: rejected concept images
const banned = /(the_land|agro|mango_processing|bakery|mosque|global_impact|cultural_signature)/i;
for (const file of walk(join(root, "public"), [".jpg", ".jpeg", ".png", ".webp", ".avif"])) {
  if (banned.test(file)) errors.push(`${relative(root, file)} is a rejected concept image`);
}

// 3: provenance on every media entry
const mediaSrc = readFileSync(join(root, "content/media.ts"), "utf8");
const block = mediaSrc.split("export const media = {")[1]?.split("} satisfies")[0] ?? "";
const entries = block.match(/^\s{2}\w+: \{/gm) ?? [];
const kinds = block.match(/kind: "(concept|photograph)"/g) ?? [];
if (entries.length !== kinds.length) errors.push(`content/media.ts: ${entries.length} entries but ${kinds.length} provenance kinds`);

// 5: review date must not be in the future (local date of the machine running the build)
const reviewed = (readFileSync(join(root, "content/facts.ts"), "utf8").match(/REVIEWED = "(\d{4}-\d{2}-\d{2})"/) ?? [])[1];
const now = new Date();
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
if (!reviewed) errors.push("content/facts.ts: REVIEWED date missing");
else if (reviewed > today) errors.push(`content/facts.ts: REVIEWED ${reviewed} is later than today (${today})`);

if (errors.length) {
  console.error("Integrity check failed:\n  " + errors.join("\n  "));
  process.exit(1);
}
console.log(`Integrity check passed (${entries.length} media entries, copy and asset rules clean).`);
