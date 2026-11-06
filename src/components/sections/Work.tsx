import Link from "next/link";
import { Frame } from "@/components/Frame";
import { projects } from "@/lib/site";

/*
  Selected work, as a reel of film frames. Each frame is empty on
  purpose: these are sample projects and the studio's own footage has
  not landed, so nothing here is dressed up as a still from a film that
  does not exist. The frame carries the slate instead, and the writing
  under it does the work a thumbnail would.
*/
export function Work({
  heading = "Selected work",
  lede = "Six recent jobs, from a three-night shoot to a wholesale floor running on Node.",
  items = projects,
  id = "work",
}: {
  heading?: string;
  lede?: string;
  items?: typeof projects;
  id?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="bg-bg py-[var(--gap)]">
      <div className="frame">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
          <h2 id={`${id}-heading`} className="heading lg:col-span-7">
            {heading}
          </h2>
          <p className="lede lg:col-span-4 lg:col-start-9">{lede}</p>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {items.map((project, i) => (
            <li
              key={project.name}
              data-reveal
              className={i % 3 === 0 ? "md:col-span-2" : ""}
            >
              <Link href="/work" className="group block">
                <Frame
                  slate={project.kind}
                  meta={`${project.runtime} · ${project.year}`}
                  title={project.name}
                  size={i % 3 === 0 ? "lg" : "md"}
                  ratio={i % 3 === 0 ? "aspect-[5/2]" : "aspect-[16/9]"}
                  tone={i === 1 ? "accent" : "dark"}
                />
              </Link>

              <p className="mt-4 max-w-[52ch] leading-[1.5]">{project.line}</p>
            </li>
          ))}
        </ul>

        <p className="mt-14 max-w-[56ch] text-muted">
          Sample projects, written so the studio can be seen at full density.
          The frames fill with real footage and stills as each client clears
          them.
        </p>
      </div>
    </section>
  );
}
