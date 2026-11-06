"use client";

import { useState } from "react";
import { budgets, mailto, services, site, timelines } from "@/lib/site";

/*
  The live thing, built into the section where it proves the claim: pick
  what you need, when, and what you can spend, and the card writes your
  brief as you go. The button hands the finished text to your own mail
  client, so nothing is collected here and nothing is faked.

  Without script the card still renders and the plain email link below it
  works, so nobody is stranded.
*/
export function Brief() {
  const [crafts, setCrafts] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("");
  const [budget, setBudget] = useState<string>("");

  const chosen = crafts.length ? crafts.join(", ") : "not decided yet";
  const body = [
    "Hello Bombaycraft,",
    "",
    `What I need: ${chosen}`,
    `When: ${timeline || "not decided yet"}`,
    `Budget: ${budget || "not decided yet"}`,
    "",
    "A bit about the project:",
    "",
  ].join("\n");

  const subject = crafts.length ? `Brief: ${chosen}` : "A brief for Bombaycraft";

  const toggle = (title: string) =>
    setCrafts((prev) =>
      prev.includes(title) ? prev.filter((c) => c !== title) : [...prev, title],
    );

  return (
    <section id="brief" aria-labelledby="brief-heading" className="bg-bg py-[var(--gap)]">
      <div className="frame">
        <div className="coupon mx-auto w-full max-w-[72rem] bg-surface">
          <div className="md:grid md:grid-cols-[40%_60%]">
            {/* Left of the perforation: what this is. */}
            <div className="flex flex-col justify-between gap-10 p-7 md:p-12">
              <div>
                <h2
                  id="brief-heading"
                  className="text-[length:var(--step-lead)] leading-[0.95] font-black tracking-[-0.04em] uppercase"
                >
                  Tear this off,
                  <br />
                  send it to us
                </h2>
                <p className="mt-5 max-w-[32ch] leading-[1.5]">
                  Tick what you need. The card writes the brief and opens it in
                  your own mail, so we never see it until you press send.
                </p>
              </div>

              <dl className="space-y-4">
                <div>
                  <dt className="small text-muted uppercase">We reply in</dt>
                  <dd className="font-bold">One working day</dd>
                </div>
                <div>
                  <dt className="small text-muted uppercase">Studio hours</dt>
                  <dd className="font-bold">{site.hours}</dd>
                </div>
              </dl>
            </div>

            {/* Right of the perforation: the builder. */}
            <form
              className="border-t-[5px] border-dotted border-bg p-7 md:border-t-0 md:border-l-[5px] md:p-12"
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = mailto(subject, body);
              }}
            >
              <Group legend="What do you need?">
                {services.map((craft) => (
                  <Choice
                    key={craft.slug}
                    type="checkbox"
                    name="craft"
                    label={craft.title}
                    checked={crafts.includes(craft.title)}
                    onChange={() => toggle(craft.title)}
                  />
                ))}
              </Group>

              <Group legend="When do you need it?">
                {timelines.map((option) => (
                  <Choice
                    key={option}
                    type="radio"
                    name="timeline"
                    label={option}
                    checked={timeline === option}
                    onChange={() => setTimeline(option)}
                  />
                ))}
              </Group>

              <Group legend="What is the budget?">
                {budgets.map((option) => (
                  <Choice
                    key={option}
                    type="radio"
                    name="budget"
                    label={option}
                    checked={budget === option}
                    onChange={() => setBudget(option)}
                  />
                ))}
              </Group>

              <button type="submit" className="button mt-9 h-14 w-full">
                Send this brief
              </button>

              <p className="small mt-4 leading-relaxed text-muted">
                Or write to{" "}
                <a href={`mailto:${site.email}`} className="link font-bold text-ink">
                  {site.email}
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Group({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-8 border-0 p-0 first:mt-0">
      <legend className="small mb-3 text-muted uppercase">{legend}</legend>
      <div className="flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

function Choice({
  type,
  name,
  label,
  checked,
  onChange,
}: {
  type: "checkbox" | "radio";
  name: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className={`chip ${checked ? "chip-on" : ""}`}>
      <input
        type={type}
        name={name}
        value={label}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {label}
    </label>
  );
}
