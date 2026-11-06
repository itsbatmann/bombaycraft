import Image from "next/image";
import { bombay } from "@/lib/site";

/*
  The one Bombay moment on the site. The studio is named after the city
  and the wordmark is lettered in two scripts; this is where that is
  said out loud, once, and then dropped. Everything else on the page is
  about the work.
*/
export function Bombay() {
  return (
    <section aria-labelledby="bombay-heading" className="bg-bg py-[var(--gap)]">
      <div className="frame grid gap-y-10 lg:grid-cols-12 lg:items-center lg:gap-x-8">
        <div className="lg:col-span-5">
          <h2 id="bombay-heading" className="heading">
            Named after
            <br />
            the city
          </h2>
          <p className="lede mt-7">
            Bombay fixes what it owns and shoots more film than anywhere on
            earth. We took the name and the habit.
          </p>
          <p className="mt-6 max-w-[48ch] leading-[1.5] text-ink/85">
            The crew, the kit and the edit suite are all here. Shoots travel;
            the studio does not.
          </p>
        </div>

        <figure className="lg:col-span-6 lg:col-start-7">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
            <Image
              src={bombay.src}
              alt={bombay.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="eager"
              className="object-cover object-[55%_60%]"
            />
          </div>
          <figcaption className="small mt-3 text-muted">
            A kaali-peeli under repair in a Bombay lane. {bombay.credit}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
