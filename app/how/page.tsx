import React from 'react';

export function generateMetadata() {
  return {
    title: 'How it works...',
  };
}

export default function How() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url(/bg_info.webp)',
      }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center">
        <div className="max-w-xl">
          <p className="font-bold text-4xl mb-8">How does it work?</p>
          <h2 className="font-semibold text-2xl mb-4">
            {' '}
            <p>
              <span className="font-bold">OpenTribe</span> has a very simple
              suggestion:
            </p>{' '}
            Wander around, meet fantastic people who want to hang out with you:
            find where other travelers are and offer a hand. It's so simple!{' '}
          </h2>
          <h2 className="font-semibold text-2xl mb-4">
            Whether it's sharing your spot, swapping stories, or just making
            connections: consider what you'd want to know about your traveling
            friends, tell them who you are and let 'em in on your own deal!
          </h2>
          <p className="font-bold text-2xl mb-8">Just keep it genuine.</p>
        </div>
      </div>
    </div>
  );
}
