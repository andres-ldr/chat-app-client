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
      grayLight: '#FAFAFA',
      gray: '#C8C8C8',
      grayReg: '#E0E0E0',
      grayDark: '#474747',
      red: '#F64A4A',
    },
    extend: {
      width: {
        100: '25rem',
        200: '50rem',
        250: '62.5rem',
        300: '75rem',
        400: '100rem',
        500: '125rem',
        600: '150rem',
      },
      height: {
        100: '25rem',
        200: '50rem',
        250: '62.5rem',
        300: '75rem',
        400: '100rem',
        500: '125rem',
        600: '150rem',
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
      boxShadow: {
        input: '0px 0px 6px 3px rgba(78,33,183,0.52)',
      },
    },
  },
  plugins: [],
};
