const crafts = ["Websites", "Web apps", "CRMs", "CMS", "Films"];

// A slow, endless band of the five crafts.
export function Marquee() {
  const half = (
    <div className="flex shrink-0">
      {[...crafts, ...crafts].map((c, i) => (
        <span key={i} className="flex items-center gap-[0.5em] pr-[0.5em]">
          <span>{c}</span>
          <span className="text-[0.4em] text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="rule overflow-hidden border-y bg-bg py-8 md:py-10" aria-hidden="true">
      <div className="flex w-max animate-[marquee_45s_linear_infinite] font-serif text-[clamp(2.75rem,6.5vw,6rem)] leading-none italic [font-variation-settings:'opsz'_96]">
        {half}
        {half}
      </div>
    </div>
  );
}
