import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page flex min-h-[70vh] flex-col justify-center pt-24">
      <p className="text-muted">404</p>
      <h1 className="mt-4 max-w-[16ch] text-5xl leading-tight sm:text-6xl" style={{ fontWeight: 350 }}>This page doesn’t exist.</h1>
      <p className="mt-6 max-w-lg text-lg text-paper/80">The link may be out of date. Start from the home page or go straight to the work.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">Go to the home page</Link>
        <Link href="/#work" className="btn btn-ghost">See the work</Link>
      </div>
    </section>
  );
}
