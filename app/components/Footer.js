import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer p-5 bg-base-200 text-base-content justify-around">
      <Link className="normal-case text-xl p-5" href="/">
        <img src="/logo-transp-bg.png" alt="logo" width="80" height="80" />
      </Link>
      <nav>
        <header className="footer-title">Help us</header>
        <fieldset className="form-control">
          <label className="label">
            <span className="label-text">Sustain the project!</span>
          </label>
          <div className="relative">
            <a
              className="btn btn-sm btn-accent top-0 right-0 rounded"
              href="/donate"
            >
              Donate
            </a>
          </div>
        </fieldset>
      </nav>
      <nav>
        <header className="footer-title">Project</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Volunteer</a>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <form>
        <header className="footer-title">Newsletter</header>
        <fieldset className="form-control">
          <label className="label">
            <span className="label-text">Stay in contact!</span>
          </label>
          <div className="relative">
            <input
              placeholder="username@site.com"
              className="input input-sm input-bordered pr-16"
            />
            <button className="btn btn-sm btn-accent absolute top-0 right-0 rounded-l-none">
              Subscribe
            </button>
          </div>
        </fieldset>
      </form>
    </footer>
  );
}
