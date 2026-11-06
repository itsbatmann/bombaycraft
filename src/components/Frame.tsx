/*
  A film frame: square corners, one tone step above the page, the title
  set large at the top and the slate line along the foot the way an edit
  bin lists a cut.

  Every frame on this site is empty on purpose. The studio's own footage
  and stills have not landed yet, and nothing here is dressed up to look
  like work that does not exist. When the reel is cut, each frame takes a
  poster image or a looping clip behind the same slate.
*/
export function Frame({
  slate,
  meta,
  title,
  note,
  ratio = "aspect-[16/9]",
  size = "md",
  tone = "dark",
}: {
  slate: string;
  meta?: string;
  title?: string;
  note?: string;
  ratio?: string;
  size?: "md" | "lg";
  tone?: "dark" | "accent";
}) {
  const accent = tone === "accent";

  return (
    <div
      className={[
        // A titled frame holds the picture's shape and spreads its title
        // and slate to the two edges. A frame with nothing in it yet takes
        // only the room its own words need: a reserved slot, not a large
        // empty box. The shape returns with the footage.
        "relative flex w-full flex-col overflow-hidden p-5 transition-colors duration-300 md:p-7",
        title ? `justify-between ${ratio}` : "justify-end gap-6",
        accent
          ? "bg-accent text-accent-ink"
          : "bg-surface-2 text-ink group-hover:bg-[color-mix(in_srgb,var(--surface-2)_62%,var(--ink)_12%)]",
      ].join(" ")}
    >
      {title ? (
        <p
          className={[
            "font-black tracking-[-0.045em] uppercase transition-colors duration-300",
            accent ? "" : "group-hover:text-accent",
          ].join(" ")}
          style={{
            fontSize:
              size === "lg"
                ? "clamp(2.5rem, 7vw, 7rem)"
                : "clamp(2rem, 4.4vw, 3.5rem)",
            lineHeight: 0.88,
          }}
        >
          {title}
        </p>
      ) : (
        /* An empty frame says what it is waiting for, legibly. */
        <p
          className={
            accent
              ? "max-w-[34ch] leading-[1.35] text-accent-ink"
              : "max-w-[34ch] leading-[1.35] text-muted"
          }
          style={{ fontSize: "var(--step-lead)" }}
        >
          {note ?? "Reserved for the studio’s own footage and stills."}
        </p>
      )}

      {/* The slate line, along the foot. */}
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
        <span
          className={`small uppercase ${accent ? "text-accent-ink" : "text-accent"}`}
        >
          {slate}
        </span>
        {meta ? (
          <span
            className={`small uppercase tabular-nums ${
              accent ? "text-accent-ink/70" : "text-muted"
            }`}
          >
            {meta}
          </span>
        ) : null}
      </div>
    </div>
  );
}
