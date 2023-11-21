/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  extend: {},
  plugins: [require('@tailwindcss/typography'), require('daisyui')],

  daisyui: {
    themes: [
      'retro',
      {
        dark: {
          primary: '#c500ff',

          secondary: '#efa500',

          accent: '#00ffcd',

          neutral: '#351e2a',

          'base-100': '#372414',

          info: '#009eba',

          success: '#009e46',

          warning: '#ffbc00',

          error: '#ff5f69',
        },
      },
    ],
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};
