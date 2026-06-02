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
        // Fond principal — parchemin de marché frais
        creme: '#F7FDF5',
        ivoire: '#F0FAF0',

        // Orange carotte — CTA principal
        orange: {
          DEFAULT: '#EE6B2F',
          light: '#F5A87A',
          pale: '#FDEADC',
        },

        // Herbe / basilic — accent vert
        sauge: {
          DEFAULT: '#3D9E4A',
          light: '#7EC880',
          pale: '#DDF2DE',
        },

        // Texte principal — vert très foncé (remplace le brun)
        brun: {
          DEFAULT: '#1A2E1C',
          mid: '#3A5E3E',
          light: '#6A9870',
          pale: '#C8E2CA',
        },

        // Citron / soleil — accent jaune
        citron: {
          DEFAULT: '#F5C535',
          pale: '#FEF5D0',
        },

        // Tomate — accent rouge/alerte
        tomate: {
          DEFAULT: '#E84C3D',
          pale: '#FDECEA',
        },

        // Aubergine — accent profond
        aubergine: {
          DEFAULT: '#6B3FA0',
          pale: '#EDE8F8',
        },
      },
      fontFamily: {
        lora: ['Lora', 'Georgia', 'serif'],
        jakarta: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
