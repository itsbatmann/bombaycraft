/* The name in type, four links, one pill. */
export function Header() {
  return (
    <header className="site-head">
      <a href="#hero-title" className="wordmark">
        626
      </a>
      <nav aria-label="Main" className="site-head__nav">
        <a className="link" href="#work">
          Work
        </a>
        <a className="link" href="#studio">
          Studio
        </a>
        <a className="link" href="#process">
          Process
        </a>
      </nav>
      <a className="pill pill--dark" href="#contact">
        Let’s talk
      </a>
    </header>
  );
}
