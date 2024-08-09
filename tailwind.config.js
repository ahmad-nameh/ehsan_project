/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'custom-5': 'repeat(5, minmax(130px, 1fr))',
        'custom-8': 'repeat(8, minmax(100px, 1fr))',
      },
    },
  },
  plugins: [],
}
