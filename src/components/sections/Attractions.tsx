import { Fragment } from "./Fragments";
import { projects } from "@/lib/site";

// SAMPLE projects (see site.ts), billed as coming attractions: each a still
// of its own screen in a gold poster frame.
export function Attractions() {
  return (
    <section aria-labelledby="attractions-heading" className="frame bg-bg-2 py-28 md:py-44">
      <div data-reveal className="caps rule flex justify-between gap-6 border-b pb-4">
        <span>II — Coming attractions</span>
        <span className="text-dim">Case studies soon</span>
      </div>
      <h2 id="attractions-heading" data-reveal className="heading mt-14 text-center">
        Selected work
        <span className="script mt-3 block text-[0.9em]">a first look</span>
      </h2>

      <ul className="mt-20 grid gap-x-10 gap-y-20 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.name} className={i % 2 ? "md:mt-32" : ""}>
            <div data-reveal className="bg-bg-2 p-3">
              <div className="aspect-[16/10] overflow-hidden">
                <Fragment project={p} />
              </div>
            </div>
            <div data-reveal className="mt-6 flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-4xl italic md:text-5xl">{p.name}</h3>
              <span className="caps text-gold">{p.category}</span>
            </div>
            <p data-reveal className="mt-4 max-w-[52ch] text-base text-dim">{p.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
