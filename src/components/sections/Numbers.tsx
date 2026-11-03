import { VideoBlock } from "@/components/VideoBlock";
import { ambientClip, numbers } from "@/lib/site";

// The city on the left, two figures on the right, no gaps: a mosaic.
export function Numbers() {
  return (
    <section aria-labelledby="numbers-heading" className="bg-bg pb-16 md:pb-32">
      <h2 id="numbers-heading" className="frame heading pb-10 text-[clamp(2rem,3vw,2.75rem)]">
        In numbers
      </h2>
      <div className="grid md:grid-cols-3">
        <div className="relative aspect-[4/3] md:col-span-2 md:aspect-auto">
          <VideoBlock
            src={ambientClip.webm}
            poster={ambientClip.poster}
            label="Marine Drive, Bombay, at dusk"
            className="absolute inset-0 h-full w-full"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1">
          {numbers.map((n, i) => (
            <div key={n.caption} className={`flex aspect-square flex-col p-7 ${i ? "bg-sand text-night" : "bg-night text-ivory"}`}>
              <p className="font-serif text-[clamp(3.5rem,5.6vw,6rem)] leading-none [font-variation-settings:'opsz'_96]">{n.figure}</p>
              <p className="mt-3 max-w-[18ch] text-base leading-snug opacity-80">{n.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
