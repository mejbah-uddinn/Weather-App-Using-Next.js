/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          paper: "#EAF2F6",
          deep: "#0F2A3D",
          mid: "#3B6E8F",
          mist: "#C9DCE7",
        },
        sun: "#F2A33A",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
