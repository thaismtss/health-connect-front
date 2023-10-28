import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#504CFF',
          dark: '#3430ED',
          light: '#A4A2FF',
        },
        secondary: {
          DEFAULT: '#252452',
        },
        tertiary: {
          DEFAULT: '#F2F2FF',
          dark: '#D1D1FF',
        },
        quarternary: {
          DEFAULT: '#B6E0FE',
        },
      },
      keyframes: {
        toastHide: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        toastSlideIn: {
          from: {
            transform: 'translateX(calc(100% + var(--viewport-padding)))',
          },
          to: { transform: 'translateX(0)' },
        },
        toastSwipeOut: {
          from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          to: { transform: 'translateX(calc(100% + var(--viewport-padding)))' },
        },
      },
      animation: {
        toastHide: 'toastHide 100ms ease-in',
        toastSlideIn: 'toastSlideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        toastSwipeOut: 'toastSwipeOut 100ms ease-out',
      },
    },
  },
  plugins: [],
};
export default config;
