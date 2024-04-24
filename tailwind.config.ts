import type { Config as TailwindConfig } from 'tailwindcss'

const config: TailwindConfig = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B88E2F',
        secondary: '#F9F1E7',
        white: '#FFFFFF',
        black: '#000000',
        gray: '#9F9F9F',
      },
    },
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
}

export default config
