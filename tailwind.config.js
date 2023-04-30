/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
    },
    colors: {
      darkPurple: '#180A38',
      lightPurple: '#7C5EC3',
      brightPurple: '#4E21B7',
      white: '#ffffff',
      gray: '#C8C8C8',
    },
    extend: {
      width: {
        1200: '75rem',
        2400: '150rem',
      },
      height: {
        '9/10': '90vh',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        moveToLeft: {
          '0%': { transform: ' translateX(40%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        show: {
          '0%': { transform: ' scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
      animation: {
        mtl: 'moveToLeft 0.75s cubic-bezier(.13,.49,.42,1.35)',
        show: 'show 0.75s cubic-bezier(.13,.49,.42,1.35)',
      },
    },
  },
  plugins: [],
};
