import { projects } from "@/lib/content";

/* Six projects, two across, each a rounded picture with its kind, year and name. The pictures drift a little inside their frames as the page scrolls. */
export function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <div className="work__head">
        <h2 id="work-title" data-reveal>
          Selected work
        </h2>
        <p data-reveal style={{ "--d": "80ms" } as React.CSSProperties}>
          Films first, then the sites that carry them. Names and years are placeholders until the studio&rsquo;s own work goes in.
        </p>
      </div>
      <ul className="work__grid">
        {projects.map((p, i) => (
          <li key={p.name} data-reveal style={{ "--d": `${(i % 2) * 90}ms` } as React.CSSProperties}>
            <a href={p.href} className="card">
              <span className="card__media">
                <img src={p.src} alt={p.alt} width={1200} height={1500} loading={i < 2 ? "eager" : "lazy"} decoding="async" data-parallax />
              </span>
              <span className="card__name">{p.name}</span>
              <span className="card__meta">
                {p.kind}, {p.year}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
