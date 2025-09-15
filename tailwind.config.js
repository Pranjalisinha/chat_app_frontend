/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        dark: {
          bg: {
            primary: '#0f172a',
            secondary: '#1e293b',
            accent: '#2d3748',
          },
          text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
            accent: '#94a3b8',
          }
        },
        light: {
          bg: {
            primary: '#ffffff',
            secondary: '#f8fafc',
            accent: '#f1f5f9',
          },
          text: {
            primary: '#0f172a',
            secondary: '#334155',
            accent: '#64748b',
          }
        }
      }
    },
  },
  plugins: [],
}