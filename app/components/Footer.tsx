import React from 'react';

export default function Footer() {
  return (
    <footer className="footer p-5 bg-base-200 text-base-content justify-around">
      <nav>
        <header className="footer-title">Help us</header>
        <fieldset className="form-control">
          <span className="label-text">Sustain the project!</span>
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
        <a className="link link-hover">Contact us</a>
        <a className="link link-hover">Volunteer</a>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
      </nav>
      <form>
        <header className="footer-title">Newsletter</header>
        <fieldset className="form-control">
          <span className="label-text">Stay in contact!</span>
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
