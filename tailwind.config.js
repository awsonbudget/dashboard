/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      fontFamily: {
        Inter: ["Inter"],
      },
      transitionDelay: {
        20: "20ms",
      },
      transitionDuration: {
        275: "275ms",
      },
    },
  },
  plugins: [],
};
