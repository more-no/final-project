import Link from 'next/link';

export default function Homepage() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url(/bg_dark_theme.webp)',
      }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <img src="/slogan.png" alt="logo" className="pb-10" />
          <Link href="/register" className="btn btn-accent">
            Join us
          </Link>
        </div>
      </div>
    </div>
  );
}
