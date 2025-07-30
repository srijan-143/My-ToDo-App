// client/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",             // Scan the main HTML file
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all JavaScript, TypeScript, JSX, and TSX files in the src/ directory and its subfolders
  ],
  theme: {
    extend: {}, // This is where you can add custom colors, fonts, spacing etc., later
  },
  plugins: [], // This is where you can add Tailwind plugins later
}