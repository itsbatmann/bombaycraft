import type { Project } from "@/lib/site";

// Until real case-study footage exists, each project shows a still of its own
// interface or film, built in HTML.
export function Fragment({ project }: { project: Project }) {
  switch (project.kind) {
    case "website":
      return <WebsiteStill />;
    case "crm":
      return <CrmStill />;
    case "film":
      return <FilmStill />;
    case "cms":
      return <CmsStill />;
  }
}

function WebsiteStill() {
  return (
    <div data-ui className="grid h-full grid-rows-[auto_1fr] bg-[#103b30] text-white">
      <div className="flex items-center justify-between px-[5%] py-[3%] text-[clamp(0.8125rem,1vw,1rem)]">
        <span className="font-serif font-black uppercase">Chowpatty Coffee</span>
        <span className="hidden gap-6 sm:flex">
          <span>Menu</span>
          <span>Order</span>
          <span>Visit</span>
        </span>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col justify-center gap-[6%] px-[10%]">
          <p className="font-serif text-[clamp(1.0625rem,2.1vw,1.875rem)] leading-[0.95] font-black uppercase">
            Coffee by the sea
          </p>
          <p className="text-[clamp(0.8125rem,1vw,1rem)]">Roasted at Girgaon, poured at Chowpatty since 6 a.m.</p>
          <span className="w-fit rounded-full bg-[#e9a23b] px-4 py-2 text-[clamp(0.8125rem,1vw,1rem)] font-medium text-[#103b30]">
            Order now
          </span>
        </div>
        {/* A cup seen from above */}
        <div className="grid h-full place-items-center bg-[#e9a23b]">
          <div className="grid aspect-square w-1/2 place-items-center rounded-full bg-[#f6efe4]">
            <div className="aspect-square w-3/4 rounded-full bg-[#5a3a22]" />
          </div>
        </div>
      </div>
    </div>
  );
}

const deals = [
  { company: "Dadar Distributors", stage: "Negotiation", value: 920000, owner: "Ravi" },
  { company: "Sewri Shipping", stage: "Negotiation", value: 920000, owner: "Asha" },
  { company: "Konkan Cold Chain", stage: "Proposal", value: 640000, owner: "Asha" },
  { company: "Malad Movers", stage: "Won", value: 475000, owner: "Imran" },
  { company: "Colaba Couriers", stage: "Lead", value: 210000, owner: "Neha" },
];
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const total = deals.reduce((sum, d) => sum + d.value, 0);
const negotiating = deals.filter((d) => d.stage === "Negotiation").reduce((s, d) => s + d.value, 0);

function CrmStill() {
  return (
    <div data-ui className="flex h-full flex-col bg-white p-[4%] text-[#1d2430]">
      <div className="flex items-baseline justify-between">
        <p className="text-[clamp(0.875rem,1.4vw,1.375rem)] font-medium">Fort Freight · Pipeline</p>
        <p className="text-[clamp(0.8125rem,1vw,1rem)]">Total {inr(total)}</p>
      </div>
      <p className="mt-[2%] text-[clamp(0.8125rem,1vw,1rem)] text-[#1f6f5c]">
        {inr(negotiating)} in negotiation this week
      </p>
      <table className="mt-[3%] w-full text-left text-[clamp(0.8125rem,0.95vw,0.95rem)]">
        <thead>
          <tr className="border-b border-[#d9d9d2]">{/* taste-skill-ignore: real table */}
            <th className="py-[1.2%] font-medium">Company</th>
            <th className="font-medium">Stage</th>
            <th className="hidden font-medium sm:table-cell">Owner</th>
            <th className="text-right font-medium">Value</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((d) => (
            <tr key={d.company} className="border-b border-[#e6e6df]">{/* taste-skill-ignore: real table */}
              <td className="py-[1.4%]">{d.company}</td>
              <td>
                <span className={`rounded px-2 py-0.5 ${d.stage === "Won" ? "bg-[#d6efe5]" : "bg-[#ecebe4]"}`}>{d.stage}</span>
              </td>
              <td className="hidden sm:table-cell">{d.owner}</td>
              <td className="text-right tabular-nums">{inr(d.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function FilmStill() {
  return (
    <div data-ui className="relative h-full bg-black text-[#f3efe6]">
      {/* Night sea with a string of city lights */}
      <div className="absolute inset-x-0 top-[12%] h-[76%] bg-[#0d1f2d]">
        <div className="absolute inset-x-[6%] top-[58%] flex justify-between" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <span key={i} className="size-1 rounded-full bg-[#f3d48a] shadow-[0_0_8px_#f3d48a]" />
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 top-[12%] flex h-[76%] flex-col items-center justify-center">
        <p className="font-serif text-[clamp(1.25rem,2.1vw,1.875rem)] font-black uppercase">Monsoon Edit</p>
        <p className="text-[clamp(0.8125rem,1vw,1rem)]">Three nights on Marine Drive</p>
      </div>
      <p className="absolute right-[4%] bottom-[3%] text-[clamp(0.8125rem,1vw,1rem)] tabular-nums">00:00:42:16</p>
    </div>
  );
}

function CmsStill() {
  return (
    <div data-ui className="grid h-full grid-cols-[28%_1fr] bg-white text-[#20201d]">
      <div className="flex flex-col gap-[6%] bg-[#f1efe9] p-[8%] text-[clamp(0.8125rem,1vw,1rem)]">
        <p className="font-medium">Bandra Book Club</p>
        <p className="font-medium text-[#8a3b2c]">Reviews</p>
        <p>Events</p>
        <p>Newsletter</p>
        <p>Members</p>
      </div>
      <div className="flex flex-col gap-[4%] p-[6%] text-[clamp(0.8125rem,1vw,1rem)]">
        <div className="flex items-center justify-between">
          <span>Draft · saved 2 min ago</span>
          <span className="rounded-full bg-[#20201d] px-4 py-1.5 text-white">Publish</span>
        </div>
        <p className="text-[clamp(1rem,2vw,1.75rem)] leading-tight font-medium">
          Six Bombay novels we keep rereading
        </p>
        <p>
          From the chawls of Girgaon to the sea face at Worli, this month&apos;s picks walk the city
          one chapter at a time.
        </p>
        <p className="text-[#6b6a63]">Tags: fiction, Bombay, monthly picks</p>
      </div>
    </div>
  );
}
