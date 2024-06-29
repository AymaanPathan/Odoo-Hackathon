/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Roboto",
          "Poppins",
          "sans-serif",
          "Playfair Display",
          "Noto Serif",
        ],
        // Add other font families as needed
        "playfair-display": ['"Playfair Display"', "serif"],
        "Noto Serif": ["Noto Serif"],
      },
    },
  },
  plugins: [],
};
