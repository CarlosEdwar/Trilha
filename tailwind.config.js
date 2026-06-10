/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22C55E',
          light:   '#4ADE80',
          dark:    '#16A34A',
        },
        surface: {
          DEFAULT: '#000000',
          card:    '#0A0A0A',
          glass:   'rgba(10,10,10,0.9)',
          border:  'rgba(255,255,255,0.06)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: { glass: '12px' },
      animation: {
        'fade-in':    'fadeIn 0.25s ease',
        'slide-up':   'slideUp 0.3s ease',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
