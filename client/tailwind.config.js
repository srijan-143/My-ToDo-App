/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#1a202c',
        'dark-card': '#2d3748',
        'accent-blue': '#81e6d9',
        'accent-purple': '#a78bfa',
        'dark-text': '#e2e8f0',
        'dark-text-muted': '#a0aec0',

        // Hello Kitty Theme Colors
        'hk-pink': '#FF69B4',
        'hk-light-pink': '#FFD1DC',
        'hk-red': '#FF0000',
        'hk-white': '#FFFFFF',
        'hk-blue': '#ADD8E6',
        'hk-dark-primary': '#4B0082', // A deep purple for the background
      },
      // backgroundImage: { ... REMOVED ... }
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // wavyBG: { ... REMOVED ... }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-out forwards',
        // wavyBG: 'wavyBG 30s linear infinite', // REMOVED
      }
    },
  },
  plugins: [],
};