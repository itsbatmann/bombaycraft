import { founders, site } from "@/lib/site";

// The two people behind the studio, then the story in one statement.
export function Founders() {
  return (
    <section aria-labelledby="founders-heading" className="frame bg-bg-2 py-28 md:py-44">
      <div className="caps rule flex justify-between gap-6 border-b pb-4">
        <span>II — The founders</span>
        <span className="text-dim">Two people, one city</span>
      </div>

      <h2 id="founders-heading" data-reveal className="heading mt-16 md:mt-24">
        Two founders,
        <span className="script mt-2 block pl-[12%] text-[1.15em]">one atelier</span>
      </h2>

      <div className="mt-20 grid gap-6 md:mt-28 md:grid-cols-2">
        {founders.map((f, i) => (
          <article
            key={i}
            data-reveal
            className={`flex min-h-[26rem] flex-col justify-between p-8 md:p-12 ${i ? "bg-night text-ivory" : "bg-bg"}`}
          >
            <div className="flex items-start justify-between gap-6">
              <p className="caps opacity-70">{f.role}</p>
              <span className="font-script text-6xl leading-none text-[#c9a45c]" aria-hidden="true">
                {f.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-serif text-[clamp(2.75rem,5vw,4.5rem)] leading-none tracking-[-0.03em]">{f.name}</h3>
              <p className="mt-5 max-w-[34ch] text-sm opacity-75">{f.bio}</p>
            </div>
          </article>
        ))}
      </div>

      <p data-reveal className="lede mx-auto mt-24 max-w-[34ch] text-center md:mt-32">
        {site.name} began with a simple idea: one studio in Bombay where the people who design,
        build and film your work sit at the same table.
      </p>
    </section>
  );
}
