import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { caseStudies, profile } from "@/content/site";
import CaseBlocks from "@/components/CaseBlocks";
import { CaseVisual } from "@/components/diagrams";
import { WordRise, Reveal } from "@/components/motion";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/work/${c.slug}` },
    openGraph: { title: c.title, description: c.summary, type: "article", images: ["/opengraph-image.png"] },
    twitter: { card: "summary_large_image", title: c.title, description: c.summary, images: ["/opengraph-image.png"] },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const index = caseStudies.findIndex((x) => x.slug === slug);
  if (index === -1) notFound();
  const c = caseStudies[index];
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="page pb-10 pt-28 sm:pt-32">
      <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted hover:text-paper">
        <ArrowLeft size={16} aria-hidden /> All work
      </Link>

      <header className="pb-12 pt-8 lg:pb-16">
        <p className="text-muted">{c.pillar}</p>
        <h1 className="mt-4 max-w-[22ch] text-4xl leading-[1.06] tracking-[-0.015em] sm:text-5xl lg:text-[4rem]" style={{ fontWeight: 350 }}>
          <WordRise text={c.title} step={45} />
        </h1>
        <p className="reveal mt-6 max-w-2xl text-lg text-paper/85 sm:text-xl" style={{ animationDelay: "500ms" }}>{c.summary}</p>

        <dl className="reveal mt-10 grid gap-6 border-t border-rule pt-6 sm:grid-cols-3" style={{ animationDelay: "650ms" }}>
          <div className="sm:col-span-2">
            <dt className="text-sm text-muted">My role</dt>
            <dd className="mt-1 max-w-xl">{c.role}</dd>
          </div>
          {(c.tools.length > 0 || c.liveUrl) && (
            <div>
              {c.tools.length > 0 && (
                <>
                  <dt className="text-sm text-muted">Tools</dt>
                  <dd className="mt-1">{c.tools.join(", ")}</dd>
                </>
              )}
              {c.liveUrl && (
                <>
                  <dt className={`text-sm text-muted ${c.tools.length ? "mt-4" : ""}`}>Live</dt>
                  <dd className="mt-1">
                    <a href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="link-underline">{c.liveUrl.replace("https://", "")}</a>
                  </dd>
                </>
              )}
            </div>
          )}
        </dl>
      </header>

      <div className="reveal mb-12" style={{ animationDelay: "800ms" }}>
        <CaseVisual slug={c.slug} />
      </div>

      {c.cover && (
        <Reveal className="mb-4"><div className="img-wipe overflow-hidden border border-rule bg-surface">
          <Image
            src={c.cover.src}
            alt={c.cover.alt}
            width={c.cover.width}
            height={c.cover.height}
            priority
            sizes="100vw"
            className={`h-auto w-full ${c.cover.height > c.cover.width ? "mx-auto max-h-[80vh] w-auto" : ""}`}
          />
        </div></Reveal>
      )}

      <CaseBlocks blocks={c.blocks} coverSrc={c.cover?.src} />

      <section className="border-t border-rule py-12 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <h2 className="text-2xl sm:text-3xl lg:col-span-4">What this shows</h2>
          <p className="max-w-[40rem] font-serif text-2xl leading-snug lg:col-span-8">{c.demonstrates}</p>
        </div>
        {c.samplesOnRequest && (
          <p className="mt-10 lg:ml-[33.4%] lg:pl-4">
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent("Request: enablement content samples")}`} className="btn btn-primary">
              Request full samples
            </a>
          </p>
        )}
      </section>

      <nav aria-label="Next case study" className="border-t border-rule pt-10">
        <Link href={`/work/${next.slug}`} className="group block">
          <span className="text-sm text-muted">Next case study</span>
          <span className="mt-2 block font-serif text-3xl transition-colors group-hover:text-marigold sm:text-4xl">{next.title}</span>
        </Link>
      </nav>
    </article>
  );
}
