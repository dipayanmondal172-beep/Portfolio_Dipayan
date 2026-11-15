import Image from "next/image";
import type { Block } from "@/content/site";
import Placements from "./Placements";
import { Reveal } from "./motion";

function Head({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl leading-snug sm:text-3xl lg:col-span-4">{children}</h2>;
}

export default function CaseBlocks({ blocks, coverSrc }: { blocks: Block[]; coverSrc?: string }) {
  // The cover already sits at the top of the page, so galleries skip it.
  const shown = blocks
    .map((b) => (b.kind === "gallery" ? { ...b, images: b.images.filter((im) => im.src !== coverSrc) } : b))
    .filter((b) => b.kind !== "gallery" || b.images.length > 0);
  return (
    <>
      {shown.map((b, i) => (
        <Reveal as="section" key={i} className="border-t border-rule py-12 lg:py-16">
          {b.kind === "gallery" ? (
            <>
              <h2 className="text-2xl sm:text-3xl">{b.heading}</h2>
              <div className={`mt-8 grid items-start gap-8 ${b.cols === 3 ? "sm:grid-cols-3" : b.cols === 2 ? "sm:grid-cols-2" : b.images.some((im) => im.tall) ? "sm:grid-cols-2 lg:max-w-4xl" : ""}`}>
                {b.images.map((im) => (
                  <figure key={im.src} className={im.wide ? "sm:col-span-full" : ""}>
                    <a href={im.src} target="_blank" rel="noopener noreferrer" className="img-wipe block overflow-hidden border border-rule bg-surface" aria-label={`Open full-size image: ${im.alt}`}>
                      <Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes={im.wide || !b.cols ? (im.tall ? "(min-width: 640px) 45vw, 100vw" : "(min-width: 1024px) 80vw, 100vw") : b.cols === 3 ? "(min-width: 640px) 30vw, 100vw" : "(min-width: 640px) 45vw, 100vw"} className="h-auto w-full" />
                    </a>
                    <figcaption className="mt-3 text-sm text-muted">{im.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          ) : (
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
              <Head>{b.heading}</Head>
              <div className="min-w-0 lg:col-span-8">
                {b.kind === "text" && (
                  <div className="max-w-[40rem] space-y-5 font-serif text-[1.2rem] leading-[1.65] text-paper/90">
                    {b.body.map((p, j) => <p key={j}>{p}</p>)}
                  </div>
                )}

                {b.kind === "list" && (
                  <>
                    {b.intro && <p className="mb-6 max-w-2xl text-paper/80">{b.intro}</p>}
                    <dl className="stg grid gap-x-10 gap-y-7 sm:grid-cols-2">
                      {b.items.map((it) => (
                        <div key={it.title}>
                          <dt className="font-medium">{it.title}</dt>
                          <dd className="mt-1.5 text-paper/75">{it.body}</dd>
                        </div>
                      ))}
                    </dl>
                  </>
                )}

                {b.kind === "flow" && (
                  <>
                    {b.intro && <p className="mb-6 max-w-2xl text-paper/80">{b.intro}</p>}
                    <div className="relative">
                    <span aria-hidden className="flow-spine absolute left-0 top-0 h-full w-px bg-rule" />
                    <ol className="stg relative">
                      {b.steps.map((st, j) => (
                        <li key={st.title} className="relative pb-7 pl-8 last:pb-0">
                          <span aria-hidden className="absolute -left-[0.8rem] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-marigold bg-ink text-xs text-marigold">{j + 1}</span>
                          <p className="font-medium">{st.title}</p>
                          <p className="mt-1 max-w-2xl text-paper/75">{st.body}</p>
                        </li>
                      ))}
                    </ol>
                    </div>
                  </>
                )}

                {b.kind === "figures" && (
                  <>
                    <dl className="stg grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
                      {b.items.map((f) => (
                        <div key={f.label}>
                          <dt className="sr-only">{f.label}</dt>
                          <dd>
                            <span className="block font-serif text-5xl leading-none text-marigold" style={{ fontWeight: 300 }}>{f.figure}</span>
                            <span className="mt-3 block text-[0.95rem] text-paper/80">{f.label}</span>
                          </dd>
                        </div>
                      ))}
                    </dl>
                    {b.note && <p className="mt-8 max-w-2xl text-sm text-muted">{b.note}</p>}
                  </>
                )}

                {b.kind === "table" && (
                  <>
                    {b.intro && <p className="mb-6 max-w-2xl text-paper/80">{b.intro}</p>}
                    {/* Stacked rows on phones, a real table from sm up. */}
                    <ul className="stg border-t border-rule sm:hidden">
                      {b.rows.map((r) => (
                        <li key={r[0]} className="border-b border-rule py-4">
                          <p className="text-paper">{r[0]}</p>
                          {b.columns.length === 3 ? (
                            <p className="mt-1 flex items-baseline justify-between gap-4 text-sm text-muted">
                              <span>{r[1]}</span>
                              <span className="font-serif text-lg text-marigold">{r[2]}</span>
                            </p>
                          ) : b.columns.length > 3 ? (
                            <dl className="mt-2 grid grid-cols-3 gap-2 text-sm">
                              {r.slice(1).map((cell, k) => (
                                <div key={k}>
                                  <dt className="text-muted">{b.columns[k + 1]}</dt>
                                  <dd className={k === 1 ? "font-serif text-lg text-marigold" : "text-paper/80"}>{cell}</dd>
                                </div>
                              ))}
                            </dl>
                          ) : (
                            <p className="mt-1 text-paper/75">{r.slice(1).join(" ")}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                    <table className="hidden w-full text-left text-[0.98rem] sm:table">
                      <thead>
                        <tr className="border-b border-rule text-sm text-muted">
                          {b.columns.map((c) => <th key={c} scope="col" className="py-3 pr-6 font-normal">{c}</th>)}
                        </tr>
                      </thead>
                      <tbody className="stg">
                        {b.rows.map((r) => (
                          <tr key={r[0]} className="border-b border-rule align-top">
                            {r.map((cell, k) => (
                              <td key={k} className={`py-3.5 pr-6 ${k === 0 ? "text-paper" : "text-paper/75"} ${(k === r.length - 1 && b.columns.length === 3) || (k === 2 && b.columns.length === 4) ? "whitespace-nowrap font-serif text-lg text-marigold" : ""}`}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {b.note && <p className="mt-6 max-w-2xl text-sm text-muted">{b.note}</p>}
                  </>
                )}

                {b.kind === "placements" && (
                  <>
                    {b.intro && <p className="mb-6 max-w-2xl text-sm text-muted">{b.intro}</p>}
                    <Placements />
                  </>
                )}
              </div>
            </div>
          )}
        </Reveal>
      ))}
    </>
  );
}
