/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        custom: {
          50: "#FFFFFF",
          100: "#FFE4E2",
          150: "#FFB0A9",
          200: "#FF797D",
          250: "#FF585D",
          300: "#D9534F",
          350: "#FF4146",
          400: "#C9302C",
        },
      },
      fontFamily: {
        odin: ["Odin Rounded", "sans-serif"],
        sofia: ["Sofia Pro", "sans-serif"],
      },
      boxShadow: {
        "3xl": "-3px 3px 0px 1px rgba(255,65,70,1)",
        "4xl": "-3px 3px 0px 1px rgba(255,121,125,1)",
        "5xl": "-3px 3px 0px 1px rgba(255,176,169,1)",
        "6xl": "-3px 3px 0px 1px rgba(255,234,234,1)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
