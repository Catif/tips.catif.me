/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'background': '#1A304D',
      'primary': '#8FB2DF'
    },

    container: {
      center: true,
    },
    
    extend: {},
  },
  plugins: [],
}
