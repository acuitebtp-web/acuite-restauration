import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        creme: '#FDFAF4',
        ivoire: '#FFF8EE',
        orange: {
          DEFAULT: '#F2854A',
          light: '#F9C4A0',
          pale: '#FDE8D8',
        },
        sauge: {
          DEFAULT: '#7A9E7E',
          light: '#B8D4BA',
          pale: '#E8F2E8',
        },
        brun: {
          DEFAULT: '#2C1A0E',
          mid: '#6B4226',
          light: '#A0745A',
          pale: '#E8D5C4',
        },
      },
      fontFamily: {
        lora: ['Lora', 'Georgia', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
