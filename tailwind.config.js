/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00E5BE', // Vibrant teal
        secondary: '#2563EB', // Sky blue
        
        footer:'#0f172a',
        accent: '#FF6B6B', // Coral
        earth: {
          100: '#F7F3E3', // Light sand
          200: '#E6D5AC', // Sand
          300: '#A0522D', // Terra cotta
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
}