import React from 'react';

export default function notfound() {
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
          <div className="text-6xl pb-8">Whooops!</div>
          <p className="pb-2"> This page does not exists...</p>
          <p>...or you're not authorized to access it!</p>
        </div>
      </div>
    </div>
  );
}
