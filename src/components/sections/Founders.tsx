import { Frame } from "@/components/Frame";
import { founders, stages, site } from "@/lib/site";

// The studio: who is in the room, how a job runs, and where we are.
export function Founders() {
  return (
    <>
      <section aria-labelledby="room-heading" className="bg-surface py-[var(--gap)]">
        <div className="frame grid gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="room-heading" className="heading lg:col-span-5">
            Camera and
            <br />
            code
          </h2>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="lede">
              The people who light the shot and the people who write the code
              sit close enough to argue. That is the whole idea.
            </p>
            <p className="mt-6 max-w-[56ch] leading-[1.5] text-ink/85">
              It means the film in your website&apos;s hero was cut by someone
              who knows how heavy it is allowed to be, and the enquiry form
              under it lands in a system built by the person sitting opposite.
              No handover, no three agencies blaming each other, no invoice for
              the gap in between.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="reel-heading" className="bg-bg py-[var(--gap)]">
        <div className="frame grid gap-y-10 md:grid-cols-12 md:gap-x-8">
          <div className="md:col-span-5">
            <h2 id="reel-heading" className="heading">
              The reel
            </h2>
            <p className="lede mt-7">
              Being cut now. It will open with the shot we argued about
              longest.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <Frame
              slate="Studio reel"
              meta="Coming soon"
              note="This frame takes the reel the day it lands, at full width and without a layout change."
            />
            <p className="mt-7 leading-[1.5] text-ink/85">
              Until then, the writing under each piece of work does the job a
              thumbnail would. We would rather tell you what we made and how
              than fill the page with somebody else&apos;s footage.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="people-heading" className="bg-surface py-[var(--gap)]">
        <div className="frame">
          <h2 id="people-heading" className="heading">
            Who you work with
          </h2>

          <ul className="mt-12 grid gap-8 md:grid-cols-2">
            {founders.map((person, i) => (
              <li key={i} data-reveal className="bg-surface-2 p-7 md:p-9">
                <h3 className="text-[length:var(--step-lead)] leading-none font-black tracking-[-0.04em] uppercase">
                  {person.name}
                </h3>
                <p className="small mt-2 text-accent uppercase">{person.role}</p>
                <p className="mt-5 leading-[1.5] text-ink/85">{person.bio}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-muted">
            Names and portraits go in before launch.
          </p>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="bg-bg py-[var(--gap)]">
        <div className="frame">
          <h2 id="how-heading" className="heading">
            How it runs
          </h2>

          <ol className="mt-12 grid gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => (
              <li key={stage.verb} data-reveal>
                <h3 className="text-[length:var(--step-lead)] leading-none font-black tracking-[-0.04em] text-accent uppercase">
                  {stage.verb}
                </h3>
                <p className="mt-4 leading-[1.5]">{stage.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="where-heading" className="bg-surface py-[var(--gap)]">
        <div className="frame grid gap-y-10 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <div className="lg:col-span-6">
            <h2 id="where-heading" className="heading">
              Where we are
            </h2>
            <p className="lede mt-7">
              {site.address.locality}, {site.address.region}. {site.hours}, and
              on a shoot most weeks.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="leading-[1.5] text-ink/85">
              Shoots travel anywhere you need them. The crew, the kit and the
              edit suite stay here, which is why a cut comes back in days
              rather than weeks.
            </p>
            <a href={`mailto:${site.email}`} className="button mt-7">
              Write to us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
