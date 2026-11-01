// Runs middleware.ts against real Request objects (Node 20+ fetch API, Web Crypto).
//   node tests/middleware.test.mjs
import { build } from "/opt/npm-tools/node_modules/esbuild/lib/main.js";
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { tmpdir } from "node:os";

const root = new URL("..", import.meta.url).pathname;
const out = join(tmpdir(), `mw-${process.pid}.mjs`);
await build({
  entryPoints: [join(root, "middleware.ts")],
  bundle: true, platform: "node", format: "esm", outfile: out, logLevel: "error",
  alias: { "next/server": join(root, "tests/next-server-shim.ts") },
});
const { middleware } = await import(pathToFileURL(out).href);

const basic = (u, p) => "Basic " + Buffer.from(`${u}:${p}`).toString("base64");
const req = (auth) => new Request("https://preview.example/", auth ? { headers: { authorization: auth } } : {});
const env = (vars) => { for (const k of ["ACCESS_MODE", "SITE_USER", "SITE_PASSWORD", "NODE_ENV"]) delete process.env[k]; Object.assign(process.env, vars); };

const cases = [
  ["production, no credentials configured → 503 (fail closed)", { NODE_ENV: "production" }, null, 503],
  ["production, short password configured → 503", { NODE_ENV: "production", SITE_USER: "u", SITE_PASSWORD: "short" }, basic("u", "short"), 503],
  ["no Authorization header → 401 + WWW-Authenticate", { NODE_ENV: "production", SITE_USER: "preview", SITE_PASSWORD: "correct-horse-battery" }, null, 401],
  ["wrong password → 401", { NODE_ENV: "production", SITE_USER: "preview", SITE_PASSWORD: "correct-horse-battery" }, basic("preview", "wrong-password-123"), 401],
  ["wrong user → 401", { NODE_ENV: "production", SITE_USER: "preview", SITE_PASSWORD: "correct-horse-battery" }, basic("someone", "correct-horse-battery"), 401],
  ["malformed header → 401", { NODE_ENV: "production", SITE_USER: "preview", SITE_PASSWORD: "correct-horse-battery" }, "Basic %%%not-base64", 401],
  ["correct credentials → pass, private no-store", { NODE_ENV: "production", SITE_USER: "preview", SITE_PASSWORD: "correct-horse-battery" }, basic("preview", "correct-horse-battery"), 200],
  ["password containing ':' → pass", { NODE_ENV: "production", SITE_USER: "preview", SITE_PASSWORD: "a:b:c-long-enough" }, basic("preview", "a:b:c-long-enough"), 200],
  ["development without credentials → pass (local only)", { NODE_ENV: "development" }, null, 200],
  ["ACCESS_MODE=public → pass", { NODE_ENV: "production", ACCESS_MODE: "public" }, null, 200],
];
let fail = 0;
for (const [name, vars, auth, want] of cases) {
  env(vars);
  const res = await middleware(req(auth));
  let ok = res.status === want;
  if (want === 401) ok &&= /^Basic realm=/.test(res.headers.get("www-authenticate") ?? "");
  if (want === 200 && vars.SITE_USER) ok &&= res.headers.get("cache-control") === "private, no-store";
  if (want !== 200) ok &&= res.headers.get("cache-control") === "no-store";
  console.log(`${ok ? "PASS" : "FAIL"} ${name} (got ${res.status})`);
  if (!ok) fail++;
}
process.exit(fail ? 1 : 0);
