/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'cal': ['Cal Sans', 'sans-serif']
      },
    },
  },
  plugins: [import("tailwindcss-radix")],
};
