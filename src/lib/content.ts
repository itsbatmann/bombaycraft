// Everything the page says. Sample projects are placeholders for the
// studio's real work; the credits are real and stay with their pictures.

export const site = {
  name: "Kala & Codes",
  // PLACEHOLDER: confirm the studio's real address before launch.
  email: "hello@kalaandcodes.com",
  // PLACEHOLDER: replace with the studio's real number before launch.
  phone: "+91 00000 00000",
  instagram: "https://instagram.com/kalaandcodes",
  linkedin: "https://linkedin.com/company/kalaandcodes",
} as const;

export type Project = {
  name: string;
  kind: string;
  year: string;
  href: string;
  src: string;
  alt: string;
};

/* SAMPLE CONTENT: six projects so the grid is seen at full density. */
export const projects: readonly Project[] = [
  { name: "Northline", kind: "Brand film", year: "2026", href: "#contact", src: "/photos/p338.jpg", alt: "A figure in a hooded coat facing a misty sea" },
  { name: "Halva", kind: "Website", year: "2026", href: "#contact", src: "/photos/p91.jpg", alt: "A person holding a twin-lens camera at chest height" },
  { name: "Orbit Studio", kind: "Film and site", year: "2025", href: "#contact", src: "/photos/p550.jpg", alt: "A woman looking out over a city at dusk" },
  { name: "Meridian", kind: "Product film", year: "2025", href: "#contact", src: "/photos/p821.jpg", alt: "A woman on a platform as a train passes in a blur" },
  { name: "Salt House", kind: "Website", year: "2024", href: "#contact", src: "/photos/p1005.jpg", alt: "A person in a scarf looking at the sea at dusk" },
  { name: "Lantern", kind: "Launch film", year: "2024", href: "#contact", src: "/photos/p685.jpg", alt: "A man sitting on a rock above a sea of cloud" },
];

export const services = [
  { name: "Film", line: "Brand films, launch films and cut-downs. Written, shot, graded and mixed by one crew." },
  { name: "Stills", line: "Product, food, interiors and process, lit and framed like a film and pulled from the same setup." },
  { name: "Websites", line: "Real-time, animated and fast. Built in Next.js, GSAP and three.js to play the footage at full size." },
  { name: "Systems", line: "Web apps, CRM and CMS. Your leads in one pipeline, your content in an editor your team runs." },
] as const;

export const steps = [
  { verb: "Write", line: "A script, a shot list and a sitemap come out of the same conversation." },
  { verb: "Shoot", line: "Cinema camera, motion control, grade and sound, finished in-house." },
  { verb: "Build", line: "The site is built around the footage, with the compression done by the people who shot it." },
  { verb: "Ship", line: "Hosting, analytics and the CRM handed over with the training to run them." },
] as const;

export const unsplashPhotographers = [
  "Patryk Sobczak",
  "Jennifer Trovato",
  "Christopher Sardegna",
  "Eutah Mizushima",
  "Matthew Wiebe",
  "Joshua Earle",
] as const;
