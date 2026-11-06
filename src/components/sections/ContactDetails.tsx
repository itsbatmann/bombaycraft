import { Frame } from "@/components/Frame";
import { site } from "@/lib/site";

/*
  The ways to reach the studio. The email and the phone are written into
  running sentences rather than a labelled table, so nothing reads as a
  small label stacked above a heading.
*/
export function ContactDetails() {
  return (
    <section aria-labelledby="reach-heading" className="bg-surface py-[var(--gap)]">
      <div className="frame grid gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-6">
          <h2 id="reach-heading" className="heading">
            Reach us
          </h2>

          <p className="lede mt-8">
            Write to{" "}
            <a href={`mailto:${site.email}`} className="link font-black text-accent">
              {site.email}
            </a>{" "}
            or call{" "}
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="link font-black text-accent"
            >
              {site.phone}
            </a>
            .
          </p>

          <p className="mt-7 max-w-[52ch] leading-[1.5] text-ink/85">
            We are in {site.address.locality}, {site.address.region}, and we
            answer every brief within one working day. {site.hours}, and on a
            shoot most weeks. If your project is urgent, say so in the first
            line and we will tell you honestly whether we can take it.
          </p>

          <p className="mt-7 flex flex-wrap gap-x-7 gap-y-2">
            <a
              href={site.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="link font-bold"
            >
              Instagram
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="link font-bold"
            >
              LinkedIn
            </a>
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <Frame
            slate="Latest work"
            meta="Coming soon"
            ratio="aspect-[4/3]"
            note="The newest cut lands here first."
          />
        </div>
      </div>
    </section>
  );
}
