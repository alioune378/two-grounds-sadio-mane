// Test-only stand-in for next/server: the subset middleware.ts uses.
export class NextResponse extends Response {
  static next() {
    const r = new NextResponse(null, { status: 200 });
    r.headers.set("x-middleware-next", "1");
    return r;
  }
}
export type NextRequest = Request;
