/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '0px',
        'sm': '500px',
        'md': '1000px',
        'lg': '1950px'
      },
      fontFamily: {
        explora: ['font-explora', 'serif'], // Add your custom font here
      },
    },
  },
  plugins: [],
}

