/* One quiet statement between the hero and the work. */
export function Statement() {
  return (
    <section className="statement" aria-labelledby="statement-title">
      <h2 id="statement-title" className="sr-only">
        What we do
      </h2>
      <p className="statement__text" data-reveal>
        We write the script and the sitemap in the same meeting, shoot on cinema cameras, and build the site around the footage.
      </p>
      <p className="statement__aside" data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
        Film, stills, real-time websites, and the CRM and CMS that run behind them.
      </p>
    </section>
  );
}
