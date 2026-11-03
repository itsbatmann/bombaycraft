import { LiveClock } from "./LiveClock";
import { mailto, site } from "@/lib/site";

const brief = [
  "What you want made: a website, an app, a CRM, a CMS or a film.",
  "Who it is for, and what they should do next.",
  "Sites, apps or films you admire.",
  "When you need it, and a rough budget.",
];
const ROMAN = ["i", "ii", "iii", "iv"];

// How to reach the studio, and what a good brief includes.
export function ContactDetails() {
  return (
    <section aria-labelledby="write-heading" className="frame bg-bg pb-28 md:pb-44">
      <div data-reveal className="caps rule flex justify-between gap-6 border-b pb-4">
        <span>II — Write to us</span>
        <span className="text-dim">We reply within a working day</span>
      </div>

      <div className="mt-16 grid gap-20 md:mt-24 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <h2 id="write-heading" className="caps text-dim">
            Email
          </h2>
          <a
            data-reveal
            href={mailto("A new project with Bombaycraft")}
            className="mt-4 block font-serif text-[clamp(1.9rem,3.4vw,3.4rem)] leading-tight italic transition-colors hover:text-gold"
          >
            {/* Wraps only before the @ on narrow screens */}
            {site.email.split("@")[0]}
            <wbr />@{site.email.split("@")[1]}
          </a>

          <dl data-reveal className="mt-16 grid gap-10 sm:grid-cols-2">
            <div>
              <dt className="caps text-dim">Phone</dt>
              <dd className="mt-2 font-serif text-2xl">
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="link">
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="caps text-dim">Studio</dt>
              <dd className="mt-2 font-serif text-2xl">
                {site.address.locality} {site.address.postalCode}
              </dd>
            </div>
            <div>
              <dt className="caps text-dim">Hours</dt>
              <dd className="mt-2 font-serif text-2xl">{site.hours}</dd>
            </div>
            <div>
              <dt className="caps text-dim">Right now</dt>
              <dd className="caps mt-3 text-gold">
                <LiveClock />
              </dd>
            </div>
          </dl>
        </div>

        <div data-reveal className="bg-bg-2 p-8 md:p-12 lg:col-span-5 lg:col-start-8">
          <h3 className="font-serif text-4xl italic">A good brief</h3>
          <p className="mt-3 text-dim">A few lines are enough. These help most:</p>
          <ol className="mt-10 space-y-6">
            {brief.map((line, i) => (
              <li key={line} data-reveal className="flex gap-5">
                <span className="w-8 shrink-0 font-serif text-2xl text-gold italic">{ROMAN[i]}</span>
                <span className="pt-1">{line}</span>
              </li>
            ))}
          </ol>
          <a href={mailto("Project brief for Bombaycraft")} className="pill mt-12">
            Send a brief
          </a>
        </div>
      </div>
    </section>
  );
}
