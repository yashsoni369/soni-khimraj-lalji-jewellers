/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./services/**/*.{js,ts,jsx,tsx}",
  ],
  // `hover:` utilities only apply on devices that can hover (no sticky hover after a tap).
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      // Velvet Counter world (measured from the approved mockup; see .impeccable/build/spec.json).
      fontFamily: {
        // "… Fallback" faces (index.css) are local fonts resized to the web fonts' metrics, so text
        // doesn't reflow when the web fonts arrive
        sans: ['Karla', '"Karla Fallback"', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['"Inria Serif"', '"Inria Fallback"', 'Georgia', 'serif'],
        display: ['"Inria Serif"', '"Inria Fallback"', 'Georgia', 'serif'],
        deva: ['"Tiro Devanagari Hindi"', '"Noto Serif Devanagari"', 'serif'],
      },
      colors: {
        counter: { DEFAULT: '#131917', 2: '#181c1a', 3: '#0c0f0e' },
        velvet: { DEFAULT: '#17392d', deep: '#0f2a21', hi: '#1f4a3b' },
        brass: { DEFAULT: '#ba995c', hi: '#d9bd84', soft: '#8a7347', ink: '#16130b' },
        glass: { DEFAULT: '#f7f7f5', soft: '#c3c9c5', mute: '#8d9690' },
        teak: '#7a4a24',
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
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s ease-out both',
      },
    },
  },
  plugins: [],
}
