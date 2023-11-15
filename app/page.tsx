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
          <img src="/slogan.png" alt="logo" className="pb-10" />
          <Link href="/register" className="btn btn-accent">
            Join us
          </Link>
          {/* <p className="mb-5 pt-10">
            OpenTribe is a global tribe of hosts and travelers united by a
            passion for exploration and a commitment to open-minded hospitality.
            Join us and become part of a worldwide network.
          </p> */}
        </div>
      </div>
    </div>
  );
}
