// Central place for brand details. Update this file and every page,
// the metadata, sitemap and structured data pick it up.

export const site = {
  name: "Bombaycraft",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bombaycraft.com",
  tagline: "Video, cinematic shots and the websites they live on",
  description:
    "Bombaycraft is a creative studio making video, cinematic shots, websites and the software behind them. One team from the camera to the code.",
  keywords: [
    "video production agency",
    "cinematic brand films",
    "creative website design",
    "MERN stack development",
    "custom CRM development",
    "CMS website development",
    "digital agency Mumbai",
  ],
  email: "hello@bombaycraft.com",
  // PLACEHOLDER: replace with the studio's real number before launch.
  phone: "+91 00000 00000",
  hours: "Mon to Sat, 10 to 7",
  address: {
    // PLACEHOLDER: replace with the studio's real address before launch.
    street: "Your street address",
    locality: "Mumbai",
    region: "Maharashtra",
    postalCode: "400001",
    country: "IN",
  },
  socials: {
    instagram: "https://instagram.com/bombaycraft",
    linkedin: "https://linkedin.com/company/bombaycraft",
  },
  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Studio", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

// Opens the visitor's email with the subject filled in.
export const mailto = (subject: string, body?: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

export type Craft = {
  slug: string;
  title: string;
  summary: string;
  stack: string;
  deliverables: readonly string[];
  action: string;
};

/* The camera comes first: it is what the studio is known for. */
export const services: readonly Craft[] = [
  {
    slug: "video",
    title: "Video",
    summary:
      "Brand films, launch films and campaign cut-downs, written, shot and finished in one place.",
    stack: "Script, shoot, edit, grade, sound",
    deliverables: [
      "Concept and script",
      "Casting, location and shoot plan",
      "Direction and camera",
      "Edit, colour and sound",
      "Cut-downs for every channel",
    ],
    action: "Book a shoot",
  },
  {
    slug: "cinematic",
    title: "Cinematic shots",
    summary:
      "Product, food, interior and process work shot like a film rather than a catalogue: one light, one move, one idea.",
    stack: "Cinema camera, motion control, grade",
    deliverables: [
      "Shot list and look reference",
      "Lighting and set design",
      "Motion control and slow motion",
      "Product and macro work",
      "Stills pulled from the same setup",
    ],
    action: "Plan a shoot",
  },
  {
    slug: "websites",
    title: "Websites",
    summary:
      "Fast, animated, search-friendly sites built to carry the footage rather than squeeze it into a corner.",
    stack: "Next.js, GSAP, headless CMS",
    deliverables: [
      "Strategy and sitemap",
      "Art direction and design",
      "Animated build in Next.js",
      "Video delivery and compression",
      "SEO, analytics and launch",
    ],
    action: "Start a website",
  },
  {
    slug: "web-apps",
    title: "Web apps",
    summary:
      "Custom applications on MongoDB, Express, React and Node, built around the way your team actually works.",
    stack: "MongoDB, Express, React, Node",
    deliverables: [
      "Product discovery",
      "User flows and interface",
      "React front end",
      "Node and Express APIs",
      "Deployment and monitoring",
    ],
    action: "Plan an app",
  },
  {
    slug: "crm-cms",
    title: "CRM and CMS",
    summary:
      "The systems behind the site: one pipeline for your leads, one editor your team can run without a developer.",
    stack: "Pipelines, roles, reports, Sanity, Payload",
    deliverables: [
      "Pipeline and process mapping",
      "Lead capture and reporting",
      "Roles, permissions and approvals",
      "Content modelling",
      "Training and handover",
    ],
    action: "Scope a system",
  },
];

/* What is not on the menu yet, said plainly. */
export const comingSoon = {
  title: "Marketing",
  line: "Paid media, performance and campaign strategy join the studio next year. Until then we will happily point you at people we trust.",
};

/* The four stages. Read in order they are the process. */
export const stages = [
  {
    verb: "Scope",
    line: "One call, then a written scope: what we make, what it costs, and what it does not include.",
  },
  {
    verb: "Board",
    line: "Treatment, shot list and art direction. You see the film and the site at full size before anyone rolls or builds.",
  },
  {
    verb: "Shoot",
    line: "Three days or thirty. Our crew, our kit, your product, and a monitor you are welcome to stand behind.",
  },
  {
    verb: "Ship",
    line: "Graded, mastered, deployed and measured. You get the keys, the project files and a number to call.",
  },
] as const;

/*
  SAMPLE PROJECTS so the layout can be seen at full density. Replace every
  one with real work before launch. Each is shown as an empty film frame:
  nothing on this site pretends to be footage the studio has not shot.
*/
export type Project = {
  name: string;
  kind: string;
  year: string;
  line: string;
  runtime: string;
};

export const projects: Project[] = [
  {
    name: "Ridgeline",
    kind: "Brand film",
    year: "2025",
    line: "A ninety-second film for an outerwear label, shot over three wet nights and cut for cinema, social and the site hero.",
    runtime: "1:30",
  },
  {
    name: "Still Water",
    kind: "Cinematic product",
    year: "2025",
    line: "Forty macro shots of a single bottle on motion control, lit once and graded cold, delivered as film and as stills.",
    runtime: "0:45",
  },
  {
    name: "Chowpatty Coffee",
    kind: "Website",
    year: "2024",
    line: "A roastery storefront with a menu that updates itself, online orders, and pages that load before the kettle boils.",
    runtime: "—",
  },
  {
    name: "Fort Freight",
    kind: "CRM",
    year: "2024",
    line: "Four spreadsheets replaced by one pipeline, quotes in two clicks and a weekly report that writes itself.",
    runtime: "—",
  },
  {
    name: "Nightshift",
    kind: "Campaign",
    year: "2025",
    line: "Six cut-downs from one shoot, built so a four-week campaign never repeats the same opening frame twice.",
    runtime: "6 × 0:15",
  },
  {
    name: "Kalbadevi Supply",
    kind: "Web app",
    year: "2025",
    line: "A wholesale floor on MongoDB and Node: stock, orders and dues, readable on a phone in a crowded lane.",
    runtime: "—",
  },
];

// PLACEHOLDERS: replace with the two co-founders' real names and roles.
export const founders = [
  {
    name: "Founder name",
    role: "Direction and camera",
    bio: "Leads the shoot: treatment, lighting, camera, and the grade that holds it all together.",
  },
  {
    name: "Founder name",
    role: "Technology and design",
    bio: "Leads the build: websites, web apps, CRMs and the systems running behind them.",
  },
];

// The one Bombay moment on the site.
export const bombay = {
  src: "/archive/premier-padmini-driver-doing-maintenance-on-his.jpg",
  alt: "Two mechanics crouched at the wheel arch of a black-and-yellow Premier Padmini taxi in a Mumbai lane.",
  credit: "Photograph by Everhard van Eimeren, CC BY-SA 4.0, via Wikimedia Commons.",
};

// The brief builder's options.
export const timelines = ["Yesterday", "This quarter", "Next quarter", "Still thinking"] as const;
export const budgets = [
  "Under ₹2 lakh",
  "₹2–6 lakh",
  "₹6–15 lakh",
  "Over ₹15 lakh",
  "Tell me what it costs",
] as const;
