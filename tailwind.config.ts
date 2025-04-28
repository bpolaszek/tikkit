import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'wood': {
          light: '#FFF7E6',  // Pale yellow for backgrounds
          DEFAULT: '#D4B483', // Light wood color
          dark: '#8B7355'    // Dark wood color
        },
        'forest': {
          light: '#4A5D4C',  // Light forest green
          DEFAULT: '#2D3A2E', // Deep forest green
          dark: '#1A211B'    // Very dark green
        }
      }
    },
  },
  plugins: [],
} satisfies Config