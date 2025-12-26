/** @type {import('tailwindcss').Config} */
module.exports = {
  // 1. ADD THIS LINE: This tells Tailwind to look for the "dark" class on the <html> tag
  darkMode: 'class', 

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
    // 2. ADD THESE (just in case you are using the /src folder structure)
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};