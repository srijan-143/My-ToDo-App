// client/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode by adding 'dark' class to html
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Define your custom vibrant/dark colors
        'dark-bg': '#1a202c', // Primary dark background
        'dark-card': '#2d3748', // Darker card background
        'accent-blue': '#81e6d9', // A vibrant blue/cyan for accents
        'accent-purple': '#a78bfa', // A vibrant purple
        'dark-text': '#e2e8f0', // Light text for dark mode
        'dark-text-muted': '#a0aec0', // Muted text for dark mode
      },
      fontFamily: {
        // Add a modern, sans-serif font from Google Fonts (e.g., Poppins, Inter, Roboto)
        // We'll import this font in index.css
        'sans': ['Poppins', 'sans-serif'], // Example: Poppins. Ensure you add fallback generic font.
      },
    },
  },
  plugins: [],
}