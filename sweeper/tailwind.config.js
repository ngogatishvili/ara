/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: { width:{
      1000:"1000px",
      190:"190px"
      
     
    },},
  },
  plugins: [require("tailwind-scrollbar")],
}
