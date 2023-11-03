/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "login-side-bg": "url('/src/assets/backgrounds/login-div-side.jpg')",
      },
      scale: {
        200: "2",
      },
      colors: {
        brown: "#5d5c61",
        beige: "#b1a296",
      },
      screens: {
        "3xl": "3840px",
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
};
