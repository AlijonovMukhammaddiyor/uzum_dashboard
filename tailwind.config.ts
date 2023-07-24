import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      base: '992px',
      lg: '1300px', // Change this value
      xl: '1380px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        primary: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: 'rgb(var(--tw-color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--tw-color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--tw-color-accent) / <alpha-value>)',
        image: 'rgb(var(--tw-color-image) / <alpha-value>)',
        border: 'rgb(var(--tw-color-border) / <alpha-value>)',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
