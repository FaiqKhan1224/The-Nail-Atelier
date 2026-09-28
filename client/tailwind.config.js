/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F3EF',
        cream: '#FFF9F6',
        gold: '#C4A484',
        blush: '#E8C9C5',
        charcoal: '#211C1C',
        mocha: '#4A3535',
        beige: '#EADDD8',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
