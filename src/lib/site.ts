// Central place for brand details. Update this file and every page,
// the metadata, sitemap and structured data pick it up.

export const site = {
  name: "Bombaycraft",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bombaycraft.com",
  tagline: "Websites, CRMs, CMS & films, made in Bombay",
  description:
    "Bombaycraft is a Bombay digital studio building creative websites, MERN stack web apps, custom CRMs, CMS platforms and films for brands that want to be remembered.",
  keywords: [
    "web design agency Mumbai",
    "creative website design",
    "MERN stack development",
    "custom CRM development",
    "CMS website development",
    "video production Mumbai",
    "digital agency Mumbai",
  ],
  email: "hello@bombaycraft.com",
  phone: "+91 00000 00000",
  hours: "Mon to Sat, 10 to 7",
  address: {
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
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

// Opens the visitor's email with the subject filled in.
export const mailto = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;

export const services = [
  {
    slug: "creative-websites",
    deliverables: ["Strategy and sitemap","Art direction and design","Animated build in Next.js","SEO and analytics setup","Content management","Launch and care"],
    tagline: "that people remember",
    slide: "Websites",
    short: "Websites",
    title: "Creative websites",
    summary:
      "Bold, animated, search-friendly websites that make your brand impossible to scroll past.",
    stack: "Next.js, GSAP, headless CMS",
    action: "Start a website",
  },
  {
    slug: "mern-stack",
    deliverables: ["Product discovery","User flows and interface","React front end","Node and Express APIs","MongoDB data design","Deployment and monitoring"],
    tagline: "that carry the load",
    slide: "Web apps",
    short: "MERN apps",
    title: "MERN web apps",
    summary:
      "Custom web apps on MongoDB, Express, React and Node, built around the way your team works.",
    stack: "MongoDB, Express, React, Node",
    action: "Plan an app",
  },
  {
    slug: "crm",
    deliverables: ["Pipeline and process mapping","Lead capture and import","Roles and permissions","Quotes, tasks and reminders","Reports and dashboards","Training for your team"],
    tagline: "that never lose a lead",
    slide: "CRMs",
    short: "CRMs",
    title: "Custom CRMs",
    summary:
      "Leads, sales and customers in one place, with the pipeline, reports and roles you need.",
    stack: "Pipelines, roles, reports",
    action: "Scope a CRM",
  },
  {
    slug: "cms",
    deliverables: ["Content modelling","An editor your team enjoys","Pages, blogs and catalogues","Roles and approvals","Image and SEO controls","Training and handover"],
    tagline: "you can run yourself",
    slide: "CMS",
    short: "CMS",
    title: "CMS platforms",
    summary:
      "Websites your team updates in minutes: pages, blogs and catalogues without a developer.",
    stack: "Sanity, Strapi, Payload",
    action: "Set up a CMS",
  },
  {
    slug: "media",
    deliverables: ["Concept and script","Shoot planning in Bombay","Direction and camera","Edit, colour and sound","Reels and cut-downs","Motion graphics"],
    tagline: "that move people",
    slide: "Films",
    short: "Films",
    title: "Films and media",
    summary:
      "Brand films, reels, product shoots and motion graphics, shot and cut in Bombay.",
    stack: "Films, reels, motion",
    action: "Book a shoot",
  },
] as const;

// PLACEHOLDERS: replace with the two co-founders' real names and roles.
export const founders = [
  { name: "Founder name", role: "Co-founder · Design and film", bio: "Leads art direction, brand films and everything people see first." },
  { name: "Founder name", role: "Co-founder · Technology", bio: "Leads the build: websites, MERN web apps, CRMs and CMS platforms." },
];

// Videos: host large files on a CDN (Cloudinary, Mux, Vercel Blob, Bunny)
// rather than in git, then paste the URL here.
export const showreel: { src: string | null; poster: string | null } = {
  src: null, // e.g. "https://cdn.example.com/bombaycraft-showreel.mp4"
  poster: null,
};

// Plays behind the hero until the showreel is ready.
export const ambientClip = {
  src: "/media/the-changing-colours-of-mumbai-cst-railway.webm",
  poster: "/media/the-changing-colours-of-mumbai-cst-railway-poster.jpg",
  caption: "Now playing: CST station at night. Our showreel lands soon.",
};

// SAMPLE projects so the layout can be seen at full density.
// Replace with real work before launch.
export type Project = {
  name: string;
  category: string;
  kind: "website" | "crm" | "film" | "cms";
  description: string;
  video: string | null;
  poster: string | null;
};

export const projects: Project[] = [
  {
    name: "Chowpatty Coffee",
    category: "Creative website",
    kind: "website",
    description:
      "A roastery by the sea needed a site as warm as its counter. We built an animated storefront with a menu that updates itself, online orders and pages that load before the kettle boils.",
    video: null,
    poster: null,
  },
  {
    name: "Fort Freight",
    category: "Custom CRM",
    kind: "crm",
    description:
      "A logistics firm tracked leads in four spreadsheets. We replaced them with one CRM: a shared pipeline, quotes in two clicks, roles for every desk and a weekly report that writes itself.",
    video: null,
    poster: null,
  },
  {
    name: "Monsoon Edit",
    category: "Brand film",
    kind: "film",
    description:
      "A ninety-second film for a fashion label, shot on Marine Drive over three wet nights. Cut for cinema, reels and the website hero, with a grade built around the city lights.",
    video: null,
    poster: null,
  },
  {
    name: "Bandra Book Club",
    category: "CMS platform",
    kind: "cms",
    description:
      "A reading club wanted to publish weekly without calling anyone. We set up a CMS with reviews, events and a newsletter, and trained the team in one afternoon.",
    video: null,
    poster: null,
  },
];
