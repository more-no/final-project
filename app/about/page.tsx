import React from 'react';

export function generateMetadata() {
  return {
    title: 'About us',
  };
}

export default function About() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url(/bg_info.jpg)',
      }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <p className="font-bold text-4xl mb-8">Manifesto</p>
          <h2 className="font-semibold text-2xl mb-4">
            <p>
              Imagine a world that champions trust, adventure, and the rich
              tapestry of intercultural connections. The impulse to assist one
              another knows no boundaries.
            </p>
          </h2>
          <h2 className="font-semibold text-2xl mb-4">
            OpenTribe is not just free; it's forever free! We're advocates for
            beauty, simplicity, and upfront honesty.
          </h2>
          <p className="font-bold text-2xl mb-8">
            But most importantly, we stand for community.
          </p>
        </div>
      </div>
    </div>
  );
}
