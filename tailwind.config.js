/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        maroon: {
          50: '#fdf2f2',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f28282',
          500: '#e95656',
          600: '#d52b2b',
          700: '#b21c1c',
          800: '#920a0a',
          900: '#760505',
          950: '#450202',
        },
        gold: {
          50: '#fffaeb',
          100: '#fef0c7',
          200: '#fde047',
          300: '#facc15',
          400: '#eab308',
          500: '#ca8a04',
          600: '#a16207',
          700: '#854d0e',
          800: '#713f12',
          900: '#642b09',
        },
        cream: {
          50: '#FFFBF5',
          100: '#FDF6E3',
          200: '#EEE8D5'
        },
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#920a0a",
        background: "#FFFBF5",
        foreground: "#450202",
      }
    },
  },
  plugins: [],
}
