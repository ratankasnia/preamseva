/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Roboto, sans-serif",
    },
    extend: {
      colors: {
        primary: "#6EBEFB",
        "primary-dark": "#04518D",
      },
    },
  },
  plugins: [],
});
