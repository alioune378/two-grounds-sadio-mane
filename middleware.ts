import { NextResponse, type NextRequest } from "next/server";

/**
 * Private-preview gate (HTTP Basic auth over HTTPS), fail-closed.
 *
 *   ACCESS_MODE   "private" (default) | "public"
 *   SITE_USER     required when private
 *   SITE_PASSWORD required when private, at least 12 characters
 *
 * In production, a private deployment without credentials answers 503 instead of
 * silently serving the site. Every path is covered, including /_next assets and
 * optimised images, so nothing leaks through an unprotected route.
 */
export const config = { matcher: "/:path*" };

const encoder = new TextEncoder();

async function sha256(value: string): Promise<Uint8Array> {
  return new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));
}

/** Constant-time comparison: both sides are hashed to equal length first. */
async function safeEqual(a: string, b: string): Promise<boolean> {
  const [x, y] = await Promise.all([sha256(a), sha256(b)]);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}

function plain(status: number, body: string, extra: Record<string, string> = {}) {
  return new NextResponse(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", ...extra },
  });
}

export async function middleware(req: NextRequest) {
  const mode = (process.env.ACCESS_MODE ?? "private").toLowerCase();
  if (mode === "public") return NextResponse.next();

  const user = process.env.SITE_USER;
  const pass = process.env.SITE_PASSWORD;

  if (!user || !pass) {
    if (process.env.NODE_ENV === "development") return NextResponse.next();
    return plain(503, "Access control is not configured. Set SITE_USER and SITE_PASSWORD, or ACCESS_MODE=public.");
  }
  if (pass.length < 12) {
    return plain(503, "SITE_PASSWORD must be at least 12 characters.");
  }

  const header = req.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    let decoded = "";
    try {
      decoded = atob(header.slice(6).trim());
    } catch {
      decoded = "";
    }
    const sep = decoded.indexOf(":");
    if (sep >= 0) {
      const [okUser, okPass] = await Promise.all([
        safeEqual(decoded.slice(0, sep), user),
        safeEqual(decoded.slice(sep + 1), pass),
      ]);
      if (okUser && okPass) {
        const res = NextResponse.next();
        res.headers.set("Cache-Control", "private, no-store");
        return res;
      }
    }
  }

  return plain(401, "Authentication required.", {
    "WWW-Authenticate": 'Basic realm="Two Grounds private preview", charset="UTF-8"',
  });
}
