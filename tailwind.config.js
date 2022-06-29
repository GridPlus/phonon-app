module.exports = {
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // jit: true,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: "BandeinsSansBold",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,

};
