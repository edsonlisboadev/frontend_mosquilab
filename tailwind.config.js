/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-dark':  '#1a5c2a',
        'green-light': '#6abf3e',
        'sand':        '#f0ead6',
        'orange':      '#e87722',
        'red-brand':   '#d32f2f',
        'purple':      '#7b2d8b',
        'lime':        '#c8d400',
        'teal':        '#3aada8',
        'navy':        '#1a4f8a',
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'cursive'],
        'body': ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
