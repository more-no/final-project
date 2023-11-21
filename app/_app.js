import RootLayout from './layout';
import Head from 'next/head';
import { useEffect } from 'react';

function determineInitialTheme() {
  // Check system preferences or set a default theme
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;
  return prefersDarkMode ? 'dark' : 'retro';
}

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Ensure that the initial theme is set on the server side
    document.documentElement.setAttribute(
      'data-theme',
      determineInitialTheme(),
    );
  }, []);

  return (
    <RootLayout>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        {/* <!-- Leaflet CSS file --> */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css"
          integrity="sha256-kLaT2GOSpHechhsozzB+flnD+zUyjE2LlfWPgU04xyI="
          crossOrigin=""
        />
        {/* leaflet-control-geocoder CSS file */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"
        />
        {/* <!-- Leaflet JavaScript file after Leaflet’s CSS: --> */}
        <script
          src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"
          integrity="sha256-WBkoXOwTeyKclOHuWtc+i2uENFpDZ9YPdf5Hf+D7ewM="
          crossOrigin=""
        />
        {/* leaflet-control-geocoder */}
        <script src="https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js" />

        {/* GEOCODE */}
        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle/dist/css/autocomplete-theme-classic.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle" /> */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle/dist/css/autocomplete-theme-classic.min.css"
        />
        <script src="https://cdn.jsdelivr.net/npm/@opencage/geosearch-bundle" />
        <script type="text/javascript" src="dist/purify.min.js" />
      </Head>
      <Component {...pageProps} />
    </RootLayout>
  );
}
