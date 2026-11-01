"use client";

/** Runtime error boundary: keeps the identity, offers a retry, never shows a stack trace. */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="state">
      <p className="kicker">Two Grounds · independent concept</p>
      <h1 className="state__h roots">Something went wrong on the road.</h1>
      <p className="state__p">The page could not be displayed. Your connection may have dropped, or a file failed to load.</p>
      <p className="state__actions">
        <button type="button" className="state__btn" onClick={() => reset()}>
          Try again
        </button>
        <a className="state__link" href="/">
          Reload from the beginning
        </a>
      </p>
    </main>
  );
}
