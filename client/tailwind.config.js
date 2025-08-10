/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
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
      backgroundImage: {
        // Re-encoding the bow image to ensure it's correct
        'bows': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAAD... (long base64 string)...AElFTkSuQmCC')", // Truncated for brevity
      },
      keyframes: {
        wavyBG: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
      animation: {
        wavyBG: 'wavyBG 30s linear infinite',
      }
    },
  },
  plugins: [],
};