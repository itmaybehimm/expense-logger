/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      darkMode: ["class", '[data-mode="dark"]'],
      backgroundImage: {
        "login-side-bg": "url('/src/assets/backgrounds/login-div-side.jpg')",
        "login-side-dark-bg":
          "url('/src/assets/backgrounds/login-div-dark-side.jpg')",
      },
      scale: {
        200: "2",
      },
      colors: {
        mercury: "hsl(var(--color-mercury) / <alpha-value>)",
        "cs-white": "hsl(var(--color-bgwhite) / <alpha-value>)",
        "cs-black": "hsl(var(--color-bgblack) / <alpha-value>)",
        purple: "hsl(var(--color-accent-purple) / <alpha-value>)",
        pink: "hsl(var(--color-accent-pink) / <alpha-value>)",
        red: "hsl(var(--color-accent-red) / <alpha-value>)",
        green: "hsl(var(--color-accent-green) / <alpha-value>)",
      },
      screens: {
        "4k": "3840px",
        "2k": "2560px",
        // => @media (min-width: 992px) { ... }
      },
      boxShadow: {
        "neon-full-xl": "0 0 30px 30px rgba(206,70,206,0.4)",
        "neon-full-sm": "0 0 30px 10px rgba(206,70,206,0.3)",
        "black-full": "0 0 30px 5px rgba(0,0,0,0.2)",
      },
    },
  },
  plugins: [],
};
