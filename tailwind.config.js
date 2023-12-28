/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00B517',
        secondary2: '#db4444',
        lightgrey: '#777777',
        greybg: '#f5f5f5',
        littledarkgrey: '#f5f5f5',
        bordergrey: '#7e7e7e'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-popp)'],
      },
    },
  },
  plugins: [],
}
