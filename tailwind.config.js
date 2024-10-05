/** @type {import('tailwindcss').Config} */
export default {
  content: [ './src/**/*.{js,jsx,ts,tsx}',  './Expense-Tracker/index.html',],
  theme: {
    extend: {
      colors:{
        dashcor: '#FCF1FE',
        exIcon: '#E10E0E',
        balIcon: '#1C3FB7',
        inIcon: '#13C296',
        eIcon: '#D97706'
      },
      fontFamily:{
        sans:['Lato', 'sans-serif'],
        title:['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}

