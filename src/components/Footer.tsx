import { site, unsplashPhotographers } from "@/lib/content";

/* A small footer: the name, a few links, the credits, the year. */
export function Footer() {
  return (
    <footer className="foot">
      <div className="foot__row">
        <span className="wordmark">Kala &amp; Codes</span>
        <nav aria-label="Footer" className="foot__links">
          <a className="link" href="#work">
            Work
          </a>
          <a className="link" href="#studio">
            Studio
          </a>
          <a className="link" href="#process">
            Process
          </a>
          <a className="link" href={site.instagram}>
            Instagram
          </a>
          <a className="link" href={site.linkedin}>
            LinkedIn
          </a>
        </nav>
        <span className="foot__legal">© Kala &amp; Codes</span>
      </div>
      <p className="credits">
        Pictures and footage: <a className="link" href="https://commons.wikimedia.org/w/index.php?curid=25511080">“Blackmagic Cinema Camera with lens”</a> by MMuzammils, CC BY-SA 3.0;{" "}
        <a className="link" href="https://commons.wikimedia.org/wiki/File:Akeley_Motion_Picture_Camera,_New_York,_1922.jpg">“Akeley Motion Picture Camera, New York, 1922”</a> by Paul Strand, public domain;{" "}
        <a className="link" href="https://commons.wikimedia.org/w/index.php?curid=149053478">“Single lens Bell and Howell Eyemo 35mm motion picture camera”</a> by Sprocket.king, CC BY 4.0;{" "}
        <a className="link" href="https://commons.wikimedia.org/wiki/File:Film_reels.webm">“Film reels”</a> by La Fonderie, CC BY 3.0, all via Wikimedia Commons. Photographs by {unsplashPhotographers.join(", ")}, Unsplash licence, via picsum.photos. The dive is based on{" "}
        <a className="link" href="https://sketchfab.com/3d-models/scuba-diver-3cffae9b572d4506b3025e29d6ff068c">“Scuba Diver”</a> by <a className="link" href="https://sketchfab.com/turelljc">turelljc</a>, licensed under{" "}
        <a className="link" href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
      </p>
    </footer>
  );
}
