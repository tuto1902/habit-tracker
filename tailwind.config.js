/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Montserrat"', 'Arial', 'sans-serif']
      },
      colors: {
        'primary': {
          600: '#7F56D9'
        }
      }
    },
  },
  plugins: [],
}
