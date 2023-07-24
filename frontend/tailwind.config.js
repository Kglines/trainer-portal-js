/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: 'rgb(79, 0, 69)',
      primaryHover: 'rgb(99, 20, 75)',
      disabledPrimary: 'rgba(79, 0, 69, .4)',
      secondary: '#0099D8',
      secondaryHover: '#008AC3',
      white: 'rgb(256, 256, 256)',
      black: 'rgb(0, 0, 0)',
      lightGrey: 'rgb(240, 240, 240)',
      red: 'rgb(255, 0, 0)',
      gray: 'rgb(128, 128, 128)'
    },
  },
  plugins: [],
};

