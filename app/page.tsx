import Link from "next/link";
import Image from "next/image";
import { Download, Mail, ArrowUpRight } from "lucide-react";
import {
  profile, hero, about, experience, contributions, caseStudies,
  skills, certifications, awards, education, contact,
} from "@/content/site";
import Placements from "@/components/Placements";
import { Reveal, CountUp, WordRise } from "@/components/motion";
import { HeroSystem, Glyph } from "@/components/diagrams";
import Evidence from "@/components/Evidence";
import ExperienceRail from "@/components/ExperienceRail";
import { RoleVisual } from "@/components/diagrams";
import { StackCards, SkillsExplorer, Marquee, NetworkField, Magnetic } from "@/components/fx";

const analystFirms = ["Gartner", "IDC", "Everest Group", "Forrester", "Celent"];
const marqueeA = ["Product positioning", "Analyst relations", "RFI management", "Content strategy", "Go-to-market", "SEO", "Market research", "Demo storytelling"];
const marqueeB = ["Agentic AI", "Intelligent document processing", "Claims", "Underwriting", "Event marketing", "Email marketing", "Sales enablement", "Community building"];

export default function Home() {

  return (
    <>
      {/* ───────── Hero ───────── */}
      <section id="home" aria-labelledby="hero-title" className="page pb-20 pt-28 sm:pt-36 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="reveal max-w-xl text-muted" style={{ animationDelay: "0ms" }}>{profile.positioning}</p>
            <h1
              id="hero-title"
              className="mt-6 max-w-[16ch] text-[2.6rem] leading-[1.05] tracking-[-0.02em] sm:text-6xl lg:text-[4.4rem]"
              style={{ fontWeight: 350 }}
            >
              <WordRise text={hero.headline} startDelay={120} />
            </h1>
            <p className="reveal mt-8 max-w-xl text-lg text-paper/85" style={{ animationDelay: "900ms" }}>{hero.intro}</p>
            <div className="reveal mt-8 flex flex-wrap gap-3" style={{ animationDelay: "1050ms" }}>
              <Magnetic><Link href="#work" className="btn btn-primary">Explore my work</Link></Magnetic>
              <Magnetic><a href={profile.resume} download className="btn btn-ghost"><Download size={17} aria-hidden />Download my resume</a></Magnetic>
            </div>
          </div>
          <div className="reveal mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none" style={{ animationDelay: "300ms" }}>
            <HeroSystem />
          </div>
        </div>

        {/* The proof index: each line opens its case study. */}
        <ol className="mt-16 border-t border-rule lg:mt-24" aria-label="Selected proof">
          {hero.proof.map((p, i) => (
            <li key={p.href} className="reveal border-b border-rule" style={{ animationDelay: `${1200 + i * 110}ms` }}>
              <Link href={p.href} className="sweep group grid gap-1 py-5 sm:py-6 lg:grid-cols-12 lg:items-baseline lg:gap-12">
                <span className="font-serif text-2xl italic text-paper/90 transition-transform duration-500 group-hover:translate-x-2 group-hover:text-marigold sm:text-3xl lg:col-span-4">
                  {p.audience}
                </span>
                <span className="flex items-baseline justify-between gap-6 text-muted transition-colors group-hover:text-paper lg:col-span-8">
                  <span>{p.line}</span>
                  <ArrowUpRight size={18} aria-hidden className="shrink-0 translate-y-0.5 opacity-40 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-marigold group-hover:opacity-100" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p className="reveal mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" style={{ animationDelay: "1700ms" }}>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-paper">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="link-underline hover:text-paper">{profile.email}</a>
          {profile.instagram && <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-paper">Instagram</a>}
        </p>
      </section>

      {/* ───────── About ───────── */}
      <section id="about" aria-labelledby="about-title" className="border-t border-rule py-20 lg:py-28">
        <div className="page split">
          <div className="split-head">
            <Reveal><h2 id="about-title" className="section-title">{about.heading}</h2></Reveal>
            {profile.portrait && (
              <Image src={profile.portrait} alt={`Portrait of ${profile.name}`} width={480} height={600} className="mt-8 w-full max-w-xs grayscale" />
            )}
          </div>
          <div className="split-body max-w-[40rem] space-y-5 font-serif text-[1.25rem] leading-[1.65] text-paper/90">
            {about.paragraphs.map((t, i) => <Reveal key={i} delay={i * 90}><p>{t}</p></Reveal>)}
          </div>
        </div>
      </section>

      {/* ───────── Key contributions ───────── */}
      <section aria-labelledby="contrib-title" className="border-t border-rule bg-surface py-20 lg:py-24">
        <div className="page">
          <Reveal><h2 id="contrib-title" className="section-title">Key contributions</h2></Reveal>
          <ul className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {contributions.map((c, i) => (
              <Reveal as="li" key={c.label} delay={i * 110}>
                <Link href={c.href} className="group block h-full border-t border-rule pt-5 transition-colors hover:border-marigold">
                  <div>
                    {c.figure ? (
                      <CountUp value={c.figure} className="block h-[3.75rem] font-serif text-6xl leading-none text-marigold lg:h-[4.5rem] lg:text-7xl" style={{ fontWeight: 300 }} />
                    ) : (
                      <Glyph kind={c.glyph ?? "research"} />
                    )}
                    <span className="mt-4 flex items-center gap-1.5 font-medium">
                      {c.label}
                      <ArrowUpRight size={15} aria-hidden className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-marigold group-hover:opacity-100" />
                    </span>
                    <span className="mt-1 block text-[0.95rem] text-muted">{c.detail}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Experience ───────── */}
      <section id="experience" aria-labelledby="exp-title" className="border-t border-rule py-20 lg:py-28">
        <div className="page">
          <Reveal><h2 id="exp-title" className="section-title">Experience</h2></Reveal>
          <ExperienceRail>
          <ol className="mt-12">
            {experience.map((role) => (
              <Reveal as="li" key={role.org} className="grid gap-8 border-t border-rule py-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6 lg:py-14">
                <div className="lg:col-span-7 lg:row-start-1">
                  <h3 className="text-3xl sm:text-4xl" style={{ fontWeight: 350 }}>{role.org}</h3>
                  <p className="mt-1 text-muted">{role.orgNote}</p>
                  <p className="mt-3 text-sm text-muted">{[role.dates, role.location].filter(Boolean).join(", ")}</p>
                  <p className="mt-6 text-lg font-medium">{role.title}</p>
                  <p className="mt-2 max-w-2xl text-paper/80">{role.summary}</p>
                </div>

                <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1">
                  <div className="lg:sticky lg:top-24">
                    <RoleVisual slugs={role.visuals} />
                  </div>
                </div>

                <div className="lg:col-span-7 lg:row-start-2">
                  <div className={`grid gap-8 ${role.groups.length > 1 ? "md:grid-cols-2" : ""}`}>
                    {role.groups.map((g) => (
                      <div key={g.name} className={g.name === "In progress" ? "md:col-span-2" : ""}>
                        <h4 className="text-sm font-medium text-marigold">{g.name}</h4>
                        <ul className="stg mt-3 space-y-2.5 text-[0.98rem] text-paper/80">
                          {g.items.map((it) => (
                            <li key={it} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-muted">{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem]">
                    {role.caseStudies.map((c) => (
                      <Link key={c.href} href={c.href} className="link-underline">{c.label}</Link>
                    ))}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
          </ExperienceRail>
        </div>
      </section>

      {/* ───────── Work: a sticky stack, each card carrying its live diagram ───────── */}
      <section id="work" aria-labelledby="work-title" className="border-t border-rule py-20 lg:py-28">
        <div className="page">
          <div className="split items-end">
            <Reveal className="split-head"><h2 id="work-title" className="section-title">Selected work</h2></Reveal>
            <Reveal delay={150} className="split-body"><p className="max-w-xl text-muted">
              Five case studies across corporate, independent and creator work. Each says what I did, what came of it, and where the credit is shared.
            </p></Reveal>
          </div>

          <StackCards>
            <ol className="mt-14 space-y-6 md:space-y-0">
              {caseStudies.map((c, i) => (
                <li key={c.slug} data-stack-card="" className="md:sticky md:pb-12" style={{ top: `calc(5.5rem + ${i * 1.4}rem)` }}>
                  <article data-stack-inner="" className="relative overflow-hidden border border-rule bg-surface shadow-[0_-24px_60px_-30px_rgb(0_0_0/0.45)]">
                    <div className="grid lg:grid-cols-12">
                      <div className="flex flex-col p-6 sm:p-10 lg:col-span-5">
                        <p className="flex items-center justify-between text-sm text-muted">
                          <span>{c.pillar}</span>
                          <span aria-hidden className="font-serif text-base">{String(i + 1).padStart(2, "0")} / {String(caseStudies.length).padStart(2, "0")}</span>
                        </p>
                        <h3 className="mt-5 text-3xl leading-[1.12] sm:text-4xl" style={{ fontWeight: 350 }}>{c.title}</h3>
                        <p className="mt-4 text-paper/80">{c.summary}</p>
                        {c.slug === "analyst-relations" && (
                          <div className="mt-6 border-t border-rule pt-4">
                            <p className="text-sm text-muted">10+ global analyst firms, including</p>
                            <p className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-serif text-xl">
                              {analystFirms.map((f) => <span key={f}>{f}</span>)}
                            </p>
                          </div>
                        )}
                        <div className="mt-8 lg:mt-auto lg:pt-8">
                          <Link href={`/work/${c.slug}`} className="btn btn-primary">Read the case study</Link>
                        </div>
                      </div>
                      <div className="relative min-h-[16rem] overflow-hidden border-t border-rule bg-ink lg:col-span-7 lg:min-h-[28rem] lg:border-l lg:border-t-0">
                        <Evidence slug={c.slug} />
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </StackCards>
        </div>
      </section>

      {/* ───────── Skills: kinetic marquee + explorer ───────── */}
      <section id="skills" aria-labelledby="skills-title" className="overflow-hidden border-t border-rule py-20 lg:py-28">
        <div className="page split">
          <Reveal className="split-head"><h2 id="skills-title" className="section-title">Skills and tools</h2></Reveal>
          <Reveal delay={150} className="split-body"><p className="max-w-xl text-muted">Pick a category to see what’s in it. No ratings: the case studies show the level.</p></Reveal>
        </div>
        <div className="mt-12 space-y-2 font-serif text-3xl sm:text-5xl lg:text-6xl" style={{ fontWeight: 300 }}>
          <Marquee items={marqueeA} />
          <Marquee items={marqueeB} reverse className="text-muted" />
        </div>
        <Reveal className="page mt-16">
          <SkillsExplorer groups={skills} />
        </Reveal>
      </section>

      {/* ───────── Recognition ───────── */}
      <section id="recognition" aria-labelledby="rec-title" className="border-t border-rule py-20 lg:py-28">
        <div className="page split">
          <div className="split-head">
            <h2 id="rec-title" className="section-title">Recognition &amp; professional highlights</h2>
          </div>
          <div className="split-body space-y-16">
            <Reveal>
              <h3 className="text-2xl">Analyst placements from cycles I worked on</h3>
              <p className="mt-3 max-w-2xl text-[0.95rem] text-muted">
                These recognise Neutrinos, not me personally. I owned the RFI and demo work behind them.
              </p>
              <Placements className="mt-6" />
              <Link href="/work/analyst-relations" className="group mt-6 inline-flex items-center gap-1.5 text-[0.95rem]">
                <span className="link-underline">How I worked on these</span>
                <ArrowUpRight size={15} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>

            {awards.length > 0 && (
              <div>
                <h3 className="text-2xl">Awards</h3>
                <ul className="mt-6 border-t border-rule">
                  {awards.map((a) => (
                    <li key={a.title} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[1fr_auto]">
                      <span>{a.title}<span className="block text-sm text-muted">{a.from}{a.note ? `. ${a.note}` : ""}</span></span>
                      <span className="text-sm text-muted">{a.year}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Reveal>
              <h3 className="text-2xl">Certifications</h3>
              <ul className="stg mt-6 border-t border-rule">
                {certifications.map((c) => (
                  <li key={c.name} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <span>{c.name}</span>
                    <span className="text-sm text-muted sm:text-right">
                      {c.image ? <a href={c.image} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-paper">{c.issuer}, view certificate</a> : c.issuer}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── Education ───────── */}
      <section aria-labelledby="edu-title" className="border-t border-rule py-20 lg:py-24">
        <div className="page split">
          <h2 id="edu-title" className="section-title split-head">Education</h2>
          <ul className="split-body grid gap-10 sm:grid-cols-2">
            {education.entries.map((e, i) => (
              <Reveal as="li" key={e.school} delay={i * 120}>
                <p className="text-sm text-muted">{e.dates}</p>
                <h3 className="mt-2 text-2xl leading-snug">{e.school}</h3>
                <p className="mt-2 text-paper/80">
                  {e.degree}{education.showGrades && e.grade ? `, ${e.grade}` : ""}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Contact: a live network you can pull on ───────── */}
      <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-rule bg-surface py-28 lg:py-40">
        <NetworkField />
        <div className="page pointer-events-none relative">
          <Reveal><h2 id="contact-title" className="section-title max-w-[18ch] !text-4xl !leading-[1.06] sm:!text-6xl lg:!text-[5.5rem]" style={{ fontWeight: 350 }}>{contact.heading}</h2></Reveal>
          <Reveal delay={200}><p className="mt-6 max-w-xl text-lg text-paper/80">{contact.body}</p></Reveal>
          <Reveal delay={350} className="pointer-events-auto mt-10 flex flex-wrap gap-3">
            <Magnetic><a href={`mailto:${profile.email}`} className="btn btn-primary"><Mail size={17} aria-hidden />Email me</a></Magnetic>
            <Magnetic><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost bg-ink/60 backdrop-blur">LinkedIn</a></Magnetic>
            <Magnetic><a href={profile.resume} download className="btn btn-ghost bg-ink/60 backdrop-blur"><Download size={17} aria-hidden />Download my resume</a></Magnetic>
            {profile.instagram && (
              <Magnetic><a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost bg-ink/60 backdrop-blur">Instagram</a></Magnetic>
            )}
          </Reveal>
          <Reveal delay={450}><p className="pointer-events-auto mt-8 inline-block text-muted">
            {profile.email}
            {profile.phone ? `, ${profile.phone}` : ""}
          </p></Reveal>
        </div>
      </section>
    </>
  );
}
