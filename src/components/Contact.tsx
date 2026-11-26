import { site } from "@/lib/content";

/* Let's talk: one line, the address, one button, and a picture to close the row. */
export function Contact() {
  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="contact__copy">
        <h2 id="contact-title">Tell us what you are making.</h2>
        <p>A film, a shoot, a website or the system behind it. Say which, and when it has to be live.</p>
        <div className="contact__row">
          <a className="pill pill--dark" href={`mailto:${site.email}?subject=${encodeURIComponent("A project for Kala & Codes")}`}>
            Start a project
          </a>
          <a className="link contact__mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </div>
      <figure className="contact__pic">
        <img src="/photos/p1005.jpg" alt="A person in a scarf looking at the sea at dusk" width={1200} height={1500} loading="lazy" decoding="async" data-parallax />
      </figure>
    </section>
  );
}
