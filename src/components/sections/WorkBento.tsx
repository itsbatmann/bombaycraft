import Link from "next/link";
import { Fragment } from "./Fragments";
import { mailto, projects, services } from "@/lib/site";

// Four inks, two pairings. A brown tile always carries cream; every
// light tile carries brown. Cream-on-cream tiles take a hairline.
const tone = {
  brown: "bg-night text-ivory",
  sand: "bg-sand text-night",
  cream: "bg-ivory text-night",
  ivory: "bg-ivory text-night",
} as const;

const ROMAN = ["I", "II", "III", "IV", "V"];
const tile = "group relative flex flex-col justify-between overflow-hidden rounded-[6px] p-6 md:p-8";

function Craft({ i, span, look }: { i: number; span: string; look: keyof typeof tone }) {
  const s = services[i];
  return (
    <li data-reveal className={`${tile} ${tone[look]} ${span}`}>
      <span className="font-serif text-2xl italic opacity-70" aria-hidden="true">
        {ROMAN[i]}
      </span>
      <div>
        <h3 className="font-serif text-[clamp(2.5rem,4.2vw,4.5rem)] leading-none tracking-[-0.03em] transition-all duration-500 [font-variation-settings:'opsz'_96] group-hover:pl-2 group-hover:italic">
          {s.slide}
        </h3>
        <p className="script mt-2 text-3xl text-current">{s.tagline}</p>
        <p className="mt-4 max-w-[36ch] text-base leading-snug opacity-80">{s.summary}</p>
        <p className="caps mt-5 opacity-70">{s.stack}</p>
      </div>
    </li>
  );
}

function Work({ i, span, look }: { i: number; span: string; look: keyof typeof tone }) {
  const p = projects[i];
  return (
    <li data-reveal className={`${tile} ${tone[look]} ${span} gap-6`}>
      <div className="overflow-hidden rounded-[4px] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025]">
        <div className="aspect-[16/10]">
          <Fragment project={p} />
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl italic md:text-3xl">{p.name}</h3>
        <span className="caps opacity-70">{p.category}</span>
      </div>
    </li>
  );
}

export function WorkBento() {
  return (
    <section id="work" aria-labelledby="work-heading" className="frame scroll-mt-0 bg-bg py-[var(--margin)]">
      <ul className="grid auto-rows-[minmax(11rem,auto)] grid-cols-2 gap-2.5 md:grid-cols-4 lg:grid-cols-6">
        {/* The title tile */}
        <li data-reveal className={`${tile} ${tone.brown} col-span-2 row-span-2`}>
          <h2 id="work-heading" className="font-serif text-[clamp(2.5rem,4vw,4.25rem)] leading-[0.92] tracking-[-0.03em] [font-variation-settings:'opsz'_96]">
            Our work
            <span className="mt-2 block pl-[10%] font-script text-[0.95em] leading-none whitespace-nowrap text-sand">what we make</span>
          </h2>
          <p className="max-w-[30ch] text-base leading-snug opacity-80">
            Websites, web apps, CRMs, CMS platforms and films, made by one studio in Bombay.
          </p>
        </li>

        <Craft i={0} span="col-span-2" look="sand" />
        <Work i={0} span="col-span-2 row-span-2" look="ivory" />
        <Craft i={1} span="col-span-1" look="cream" />
        <Craft i={2} span="col-span-1" look="brown" />

        <Work i={1} span="col-span-2 row-span-2 md:col-span-3" look="sand" />
        <Craft i={4} span="col-span-2 row-span-2 md:col-span-1" look="brown" />
        <Craft i={3} span="col-span-2" look="cream" />
        <li data-reveal className={`${tile} ${tone.sand} col-span-2`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="font-serif text-3xl italic">Have something in mind?</p>
            <a href={mailto("New project with Bombaycraft")} className="pill">
              Begin a project
            </a>
          </div>
        </li>

        <Work i={2} span="col-span-2 row-span-2" look="brown" />
        <Work i={3} span="col-span-2 row-span-2" look="cream" />
        <li data-reveal className={`${tile} ${tone.sand} col-span-2 row-span-2`}>
          <span className="font-serif text-2xl italic opacity-70" aria-hidden="true">
            VI
          </span>
          <div>
            <p lang="mr" className="font-marathi text-[clamp(3rem,5vw,5.5rem)] leading-none">
              एकदम झकास
            </p>
            <p className="mt-4 font-serif text-2xl italic">Ekdum jhakaas: simply brilliant.</p>
            <p className="mt-3 max-w-[34ch] text-base leading-snug opacity-80">The standard every pixel and every frame is held to.</p>
          </div>
          <Link href="/work" className="caps link self-start">
            See all work
          </Link>
        </li>
      </ul>
    </section>
  );
}
