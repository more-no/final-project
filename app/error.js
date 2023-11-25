'use client';
import React from 'react';

export default function Error() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: 'url(/bg_light_theme.jpg)',
      }}
    >
      <div className="hero-overlay bg-opacity-60" />
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <div className="text-8xl pb-8">Ooops!</div>
          <p className="text-3xl pb-2">An error occurred</p>
        </div>
      </div>
    </div>
  );
}
