/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero': "url('/src/assets/bg.svg')",
        'footer-texture': "url('/img/footer-texture.png')",
      },
      fontFamily:{
        fuggles: ["fuggles", 'regular'],
      },
      screens: {
        sm: '412px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      }
    },
  },
  plugins: [],
}
