// The process as a film shoot: four scenes, each on a Bombay location.
const scenes = [
  { name: "Brief", location: "Nariman Point", text: "We listen first: your business, your people and what success looks like." },
  { name: "Design", location: "Kala Ghoda", text: "Layouts, type and storyboards. Every screen and frame drawn before it is built." },
  { name: "Build", location: "Lower Parel", text: "We code, shoot and edit, with a working preview you can open every week." },
  { name: "Launch", location: "Marine Drive", text: "We go live, measure what works and keep the lights on after." },
];
const ROMAN = ["i", "ii", "iii", "iv"];

export function Scenes({ label = "III — The shoot" }: { label?: string }) {
  return (
    <section aria-labelledby="scenes-heading" className="frame bg-night py-28 text-ivory md:py-44">
      <div className="caps flex justify-between gap-6 border-b border-[#c9a45c]/40 pb-4">
        <span>{label}</span>
        <span className="text-ivory/60">Four scenes, one film</span>
      </div>

      <h2 id="scenes-heading" data-reveal className="heading mt-16 md:mt-24">
        Lights, camera,
        <span className="mt-2 block pl-[12%] font-script text-[1.15em] leading-none text-[#c9a45c]">launch</span>
      </h2>

      <ol className="mt-20 grid md:mt-28 md:grid-cols-2 lg:grid-cols-4">
        {scenes.map((s, i) => (
          <li
            key={s.name}
            data-reveal
            className="group relative flex min-h-[22rem] flex-col justify-between overflow-hidden border-t border-[#c9a45c]/40 p-6 md:border-l md:p-8 lg:min-h-[30rem]"
          >
            <span
              className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-[#c9a45c]/10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100"
              aria-hidden="true"
            />
            <p className="caps relative text-[#c9a45c]">Scene {ROMAN[i]}</p>
            <div className="relative">
              <h3 className="font-serif text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-0.03em] transition-all duration-500 [font-variation-settings:'opsz'_96] group-hover:italic">
                {s.name}
              </h3>
              <p className="mt-5 max-w-[30ch] text-sm text-ivory/70">{s.text}</p>
              <p className="caps mt-6 text-ivory/60">Location · {s.location}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
