/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    // extend: {},
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        lightGrayBlue: '#DCDCDC', 
        lightWhite: '#ffff',
        fontColor: '606266',
        customGray: '#F0F2F5',
      },
    },
  },
  plugins: [],
}