import { mailto, site } from "@/lib/site";

// Contact as a golden cinema ticket: admit one, your next project.
export function Ticket({ label = "IV — Admit one" }: { label?: string }) {
  return (
    <section aria-labelledby="ticket-heading" className="frame bg-bg py-28 md:py-44">
      <div className="caps rule flex justify-between gap-6 border-b pb-4">
        <span>{label}</span>
        <span className="text-dim">Bookings open</span>
      </div>

      <div data-reveal className="relative mx-auto mt-16 max-w-6xl md:mt-24">
        <div className="relative grid overflow-hidden bg-ticket text-ticket-ink md:grid-cols-[1fr_13rem]">
          <div className="pointer-events-none absolute inset-3 border border-current opacity-30" aria-hidden="true" />

          <div className="relative p-8 md:p-14">
            <p className="caps">{site.name} presents</p>
            <h2 id="ticket-heading" className="display mt-6 text-[clamp(3.5rem,10vw,9rem)]">
              Admit one
            </h2>
            <p className="mt-2 font-script text-[clamp(2.5rem,5vw,4.5rem)] leading-none">your next project</p>

            <dl className="caps mt-12 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="opacity-70">Date</dt>
                <dd className="mt-1">Whenever you are ready</dd>
              </div>
              <div>
                <dt className="opacity-70">Venue</dt>
                <dd className="mt-1">Bombay and online</dd>
              </div>
              <div>
                <dt className="opacity-70">Seat</dt>
                <dd className="mt-1">Front row</dd>
              </div>
            </dl>

            <a
              href={mailto("Admit one: a new project")}
              className="mt-12 inline-block font-serif text-[clamp(1.5rem,3.6vw,3.25rem)] break-all italic underline decoration-1 underline-offset-[0.2em] transition-opacity hover:opacity-70 sm:break-normal"
            >
              {site.email}
            </a>
          </div>

          {/* The stub, behind a perforated tear line */}
          <div className="relative flex items-center justify-between gap-6 border-t border-dashed border-current p-8 md:flex-col md:border-t-0 md:border-l md:p-10">
            <p className="caps md:[writing-mode:vertical-rl]">No. 0001</p>
            <p className="font-script text-4xl leading-none md:text-5xl">Action</p>
            <p className="caps md:[writing-mode:vertical-rl]">Bombay</p>
          </div>
        </div>
        {/* Notches where the stub tears off */}
        <span className="absolute -top-4 right-[13rem] hidden size-8 translate-x-1/2 rounded-full bg-bg md:block" aria-hidden="true" />
        <span className="absolute right-[13rem] -bottom-4 hidden size-8 translate-x-1/2 rounded-full bg-bg md:block" aria-hidden="true" />
      </div>
    </section>
  );
}
