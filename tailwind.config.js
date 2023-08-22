/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      rubik: ['Rubik', 'sans-serif'],
    },
    extend: {
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
      width: {
        100: '25rem',
        105: '26.25rem',
        110: '27.5rem',
        200: '50rem',
        225: '56.25rem',
        240: '60rem',
        250: '62.5rem',
        300: '75rem',
        400: '100rem',
        500: '125rem',
        600: '150rem',
      },
      height: {
        100: '25rem',
        125: '31.25rem',
        150: '37.5rem',
        200: '50rem',
        205: '51.25rem',
        210: '52.5rem',
        215: '53.75rem',
        225: '56.25rem',
        240: '60rem',
        250: '62.5rem',
        300: '75rem',
        400: '100rem',
        500: '125rem',
        600: '150rem',
        '9/10': '90vh',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        curveLineBg: `url('./src/assets/curve-line-bg.svg')`,
      },
      keyframes: {
        moveToLeft: {
          '0%': { transform: 'translateX(40%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        scale: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        openFromLeft: {
          '0%': { transform: 'translateX(20%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        scaleXY: {
          '0%': {
            transform: 'scale(0)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        swipeFromTop: {
          '0%, 50%': { transform: 'translateY(-100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        mtl: 'moveToLeft 0.75s cubic-bezier(.13,.49,.42,1.35)',
        show: 'scale 0.75s cubic-bezier(.13,.49,.42,1.35)',
        pfl: 'openFromLeft 0.75s ease',
        scale: 'scaleXY 0.2s',
        swipeFromTop: 'swipeFromTop 0.5s ease-out',
      },
      boxShadow: {
        input: '0px 0px 7px 2px rgba(78,33,183,0.52)',
        inputInvalid: '0px 0px 7px 0px rgba(255, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};
