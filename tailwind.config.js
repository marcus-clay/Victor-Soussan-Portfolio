/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  // hover: utilities only apply on devices that can really hover (mouse, trackpad), so a tap
  // on a phone never leaves a card zoomed or a pill filled. Touch gets the :active states.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-public-sans)', 'Public Sans', 'sans-serif'],
      },
      // Type scale. Sizes carry their own optical tracking and leading: the larger
      // the text, the tighter both get (Apple, "The Details of UI Typography").
      // Utilities such as tracking-* or leading-* still override these defaults.
      //
      //   role         class          size
      //   page title   title-1        24 to 28px (fluid), 600
      //   section      title-2        20px, 600
      //   sub-section  title-3        17px, 600
      //   lead         lg             18px
      //   body         base           16px
      //   UI           sm             15px
      //   caption      xs             13px
      //   micro        micro          11px
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1.3' }],
        xs: ['0.8125rem', { lineHeight: '1.4' }],
        sm: ['0.9375rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.55', letterSpacing: '-0.005em' }],
        xl: ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        '2xl': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.022em' }],
        '3xl': ['1.875rem', { lineHeight: '1.15', letterSpacing: '-0.027em' }],
        '4xl': ['2.25rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.032em' }],
        '6xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.034em' }],
        '7xl': ['4.5rem', { lineHeight: '1.02', letterSpacing: '-0.036em' }],
        // Semantic roles
        'title-1': ['clamp(1.5rem, 1.35rem + 0.6vw, 1.75rem)', { lineHeight: '1.18', letterSpacing: '-0.025em', fontWeight: '600' }],
        'title-2': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title-3': ['1.0625rem', { lineHeight: '1.4', letterSpacing: '-0.012em', fontWeight: '600' }],
      },
      colors: {
        // Secondary text. Tailwind's #6B7280 lands at 4.4:1 on the #F9F9F9 and gray-100
        // surfaces; this value keeps it above WCAG AA (4.5:1) on every light surface.
        gray: { 500: '#646B77' },
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
