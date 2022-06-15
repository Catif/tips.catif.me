/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
   content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
   ],
   theme: {
      container: {
         center: true,
      },

      extend: {
         colors: {
            'background': '#1A304D',
            'primary': '#99C2F7'
         },
      },
   },
   plugins: [],
}
