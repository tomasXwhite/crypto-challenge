/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        modal: "90vh"
      },
      minWidth: {
        modal: "90vw"
      }
    },
    screens: {
      'mobile': {'min': '200px', 'max': '600px'},
    }
  },
  plugins: [],
})
