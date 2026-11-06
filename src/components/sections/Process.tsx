import { stages } from "@/lib/site";

/*
  "One verb at a time", set typographically rather than over pictures:
  four panels, each one stage, each holding its verb at the centre of the
  screen while the panel passes. Read in order the verbs are both the
  heading and the sequence. The ground steps one tone darker at each
  stage, so the sequence is felt as well as read.
*/
const TONE = ["bg-bg", "bg-surface", "bg-surface-2", "bg-surface"];

export function Process() {
  return (
    <section aria-labelledby="stages-heading" className="bg-bg">
      <h2 id="stages-heading" className="sr-only">
        How a project runs
      </h2>

      {stages.map((stage, i) => (
        <div key={stage.verb} className={`relative h-[140svh] ${TONE[i]}`}>
          <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
            <div className="frame">
              <h3
                className="font-black tracking-[-0.05em] text-ink uppercase"
                style={{ fontSize: "var(--step-display)", lineHeight: 0.84 }}
              >
                {stage.verb}
              </h3>

              <div className="mt-8 grid gap-y-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
                <p className="lede lg:col-span-6">{stage.line}</p>

                {/* Where you are in the sequence, shown by position. */}
                <ol className="flex flex-wrap gap-x-5 gap-y-1 lg:col-span-4 lg:col-start-9 lg:justify-end">
                  {stages.map((other, j) => (
                    <li
                      key={other.verb}
                      className={`small uppercase ${
                        j === i ? "text-accent" : "text-muted"
                      }`}
                      aria-current={j === i ? "step" : undefined}
                    >
                      {other.verb}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
