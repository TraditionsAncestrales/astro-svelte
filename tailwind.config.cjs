/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        dark: 'rgb(var(--color-dark) / <alpha-value>)',
        light: 'rgb(var(--color-light) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
      },
      data: {
        scrolled: 'scrolled=true',
        top: 'scrolled=false',
      },
      fontFamily: {
        heading: ['Candara'],
        sans: ['Raleway'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
