import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Setel Poppins sebagai font default
      },
      colors: {
        customBrown: '#8D6B44',
        customBrowntwo: '#BD9260',
        customOrage: '#FF8A00',
        customBlue: '#0A2640',
        customGreen: '#0A400C',
        customOrangetwo: '#FF9D23',
        customBluedark: '#061E29',
        customGraydark: '#213C51',
        custmBluesky: '#0D1A63'
      },
   keyframes: {
        slide: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        slide: 'slide 10s linear infinite',
      },
    },
  },
  plugins: [],
});
