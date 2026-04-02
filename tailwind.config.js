/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-public-sans)', 'Public Sans', 'sans-serif'],
      },
      fontSize: {
        sm: ['0.9375rem', { lineHeight: '1.5' }],
      },
      colors: {
        apple: {
          gray: '#F5F5F7',
          dark: '#1D1D1F',
          blue: '#0071E3',
          glass: 'rgba(255, 255, 255, 0.72)',
          glassBorder: 'rgba(255, 255, 255, 0.5)',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    }
  },
  plugins: [],
}
