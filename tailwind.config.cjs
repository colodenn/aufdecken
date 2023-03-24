/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'cal': ['Cal Sans', 'sans-serif'],
        'open-sans': ['Open sans', 'sans-serif']
      },
    },
  },
  plugins: [import("tailwindcss-radix")],
};
