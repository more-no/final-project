import React from 'react';

export default function FooterLogged() {
  return (
    <footer className="footer p-5 bg-base-200 text-base-content justify-around">
      {/* <img src="/logo-transp-bg.png" alt="logo" width="80" height="80" /> */}
      <nav>
        <header className="footer-title">Help us</header>
        <fieldset className="form-control">
          <div className="label">
            <span className="label-text">Sustain the project!</span>
          </div>
          <div className="relative">
            <button className="btn btn-sm btn-accent top-0 right-0 rounded">
              Donate
            </button>
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
          <div>
            <span>Stay in contact!</span>
          </div>
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
