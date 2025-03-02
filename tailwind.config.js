/** @type {import('tailwindcss').Config} */
export default {
  content: [ './src/**/*.{js,jsx,ts,tsx}',  './Expense-Tracker/index.html',],
  theme: {
    extend: {
      colors:{
        dashcor: 'grey',
        blueOne:'#F1F4FF',
        exIcon: '#E10E0E',
        balIcon: '#1C3FB7',
        inIcon: '#13C296',
        eIcon: '#D97706',
        back: '#F5F6FA',
        incomebar: '#17C666',
        incomelight: '#E1FBED',
        expensebar: '#EA4D4D',
        expenselight: '#FDEDED',
        savingsbar: '#FFA21D',
        savingslight: '#FFF6E0',
        white: '#FFFFFF',
        buttoncolor: '#487FFF',
        buttonlight: '#D9E6FD',
        hovercolor: '#E4F1FF',
        iconback: '#EBECEF',
        textcol: '#111827',
        textcoltwo: '#DCAC77',
      },
      fontFamily:{
        sans:['Lato', 'sans-serif'],
        title:['Playfair Display', 'serif'],
        body:['inter', 'serif']
      }
    },
  },
  plugins: [],
  purge: false,
}


