// Central place for brand details. Update this file and every page,
// the metadata, sitemap and structured data pick it up.

export const site = {
  name: "Bombaycraft",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bombaycraft.com",
  tagline: "Websites, CRMs, CMS & media, made in Bombay",
  description:
    "Bombaycraft is a Bombay-born digital studio building creative websites, MERN stack web apps, custom CRMs, CMS platforms and media & video for ambitious brands.",
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

export const services = [
  {
    slug: "creative-websites",
    short: "Websites",
    title: "Creative Websites",
    summary:
      "Bold, animated, search-friendly websites designed to make your brand impossible to scroll past.",
  },
  {
    slug: "mern-stack",
    short: "MERN Stack",
    title: "MERN Stack Development",
    summary:
      "Custom web apps on MongoDB, Express, React and Node. Fast, scalable and built around your workflow.",
  },
  {
    slug: "crm",
    short: "CRM",
    title: "Custom CRMs",
    summary:
      "Leads, sales and customers in one place, shaped to how your team actually works.",
  },
  {
    slug: "cms",
    short: "CMS",
    title: "CMS Solutions",
    summary:
      "Websites your team can update in minutes, without waiting on a developer.",
  },
  {
    slug: "media",
    short: "Media & Video",
    title: "Media & Video",
    summary:
      "Brand films, reels, product shoots and motion graphics that tell your story.",
  },
] as const;

// Videos: host large files on a CDN (Cloudinary, Mux, Vercel Blob, Bunny)
// rather than in git, then paste the URL here. Leave null for "Coming soon".
export const showreel: { src: string | null; poster: string | null } = {
  src: null, // e.g. "https://cdn.example.com/bombaycraft-showreel.mp4"
  poster: null, // e.g. "/showreel-poster.jpg"
};

type Project = {
  title: string;
  category: string;
  year: string;
  video: string | null;
  poster: string | null;
};

export const projects: Project[] = [
  { title: "Project One", category: "Creative Website", year: "2026", video: null, poster: null },
  { title: "Project Two", category: "Custom CRM", year: "2026", video: null, poster: null },
  { title: "Project Three", category: "Brand Film", year: "2025", video: null, poster: null },
  { title: "Project Four", category: "MERN Web App", year: "2025", video: null, poster: null },
];
