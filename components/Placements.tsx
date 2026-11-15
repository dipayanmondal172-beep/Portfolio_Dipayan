import { analystPlacements } from "@/content/site";

export default function Placements({ className = "" }: { className?: string }) {
  return (
    <ul className={`stg border-t border-rule ${className}`}>
      {analystPlacements.map((p) => (
        <li key={p.report} className="grid gap-2 border-b border-rule py-5 sm:grid-cols-[11rem_1fr] sm:gap-8">
          <span className="wipe-in font-serif text-2xl leading-tight text-marigold">{p.placement}</span>
          <span>
            <span className="block">{p.report}</span>
            <span className="mt-1 block text-sm text-muted">
              {[p.date, p.context].filter(Boolean).join(", ")}.{" "}
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-paper">
                Press release<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}
