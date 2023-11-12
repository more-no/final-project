import Link from 'next/link';

export default function Homepage() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url(/bg_dark_theme.jpg)',
      }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <Link href="/register" className="btn btn-accent">
            Join us
          </Link>
        </div>
      </div>
    </div>
  );
}
