import { profile } from "@/content/site";
import { Reveal } from "./motion";

export default function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-rule">
      <Reveal className="page overflow-hidden pt-14">
        <p aria-hidden className="rise-big whitespace-nowrap font-serif leading-[0.9] tracking-[-0.03em] text-paper/[0.09]" style={{ fontSize: "clamp(2.75rem, 11.2vw, 11.25rem)", fontWeight: 350 }}>
          {profile.name}
        </p>
      </Reveal>
      <div className="page flex flex-col gap-3 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{profile.name}, {profile.location}</p>
        <p className="flex gap-5">
          <a className="link-underline hover:text-paper" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {profile.instagram && <a className="link-underline hover:text-paper" href={profile.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
          <a className="link-underline hover:text-paper" href={`mailto:${profile.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}
