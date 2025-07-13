/** @type {import('tailwindcss').Config} */
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        custom: {
          50: '#FFF4F5',
          100: '#FFE4E2',
          150: '#FFB0A9',
          200: '#FF797D',
          250: '#FF585D',
          300: '#FF4146',
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
