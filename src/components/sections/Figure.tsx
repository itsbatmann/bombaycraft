import { Frame } from "@/components/Frame";

/*
  "One figure owns the screen", with the far side closed by a second
  frame rather than left empty. The figure is static text in lining
  numerals and does not count up: it is a fact about the studio, not a
  scoreboard.
*/
export function Figure() {
  return (
    <section aria-labelledby="figure-heading" className="bg-surface py-[var(--gap)]">
      <div className="frame lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <h2
            id="figure-heading"
            className="max-w-[18ch] text-[length:var(--step-lead)] leading-[1.05] font-black tracking-[-0.03em]"
          >
            Camera and code, one room.
          </h2>

          <p data-reveal className="mt-10 flex items-start leading-none">
            <span
              className="font-black tracking-[-0.05em] tabular-nums"
              style={{ fontSize: "var(--step-figure)", lineHeight: 0.8 }}
            >
              1
            </span>
            <span
              className="mt-[0.1em] ml-3 font-black tracking-[-0.03em] text-accent uppercase"
              style={{ fontSize: "var(--step-head)", lineHeight: 0.9 }}
            >
              team
            </span>
          </p>

          <p className="mt-6 max-w-[34ch] leading-[1.5]">
            The people who light the shot and the people who write the code
            sit in the same room, close enough to argue.
          </p>
        </div>

        <div className="mt-14 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <Frame
            slate="Behind the scenes"
            meta="Coming soon"
            note="Stills from the floor, reserved for the studio’s own shoot."
          />
          <p className="mt-7 leading-[1.5]">
            That is why the film in your hero was cut by someone who knows how
            heavy it is allowed to be, and the enquiry form under it lands in
            a system built by the person sitting opposite. No handover between
            agencies, and no invoice for the gap in between.
          </p>
        </div>
      </div>
    </section>
  );
}
