import Image from "next/image";
import { analystPlacements, caseStudies } from "@/content/site";
import { Reveal } from "./motion";

/** Real proof for a work card: the placements for analyst relations, a screenshot for the rest. */
export default function Evidence({ slug }: { slug: string }) {
  if (slug === "analyst-relations") {
    return (
      <Reveal className="flex h-full flex-col justify-center p-6 sm:p-10">
        <p className="text-sm text-muted">Placements from evaluation cycles I worked on</p>
        <ul className="stg mt-6">
          {analystPlacements.map((p) => (
            <li key={p.report} className="border-t border-rule py-4 last:border-b">
              <span className="wipe-in block font-serif text-3xl leading-tight text-marigold sm:text-4xl" style={{ fontWeight: 350 }}>{p.placement}</span>
              <span className="mt-1 block text-sm text-paper/75">{p.report}, {p.date}</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-xs text-muted">Recognitions of Neutrinos by independent firms. No affiliation or endorsement implied.</p>
      </Reveal>
    );
  }
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c?.cover) return null;
  const position: Record<string, string> = { zenwrath: "object-[50%_78%]", marketplace: "object-left-top", bluebridge: "object-center", enablement: "object-center" };
  return (
    <Reveal className="absolute inset-0">
      <div className="img-wipe zoom absolute inset-0">
        <Image src={c.cover.src} alt={c.cover.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className={`object-cover ${position[slug] ?? "object-top"}`} />
      </div>
      {slug === "enablement" && (
        <span className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-3 py-1.5 text-xs text-paper backdrop-blur">Blurred: internal and confidential</span>
      )}
    </Reveal>
  );
}
