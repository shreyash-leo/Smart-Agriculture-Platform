/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        'primary-dark': '#1B5E20',
        'accent-brown': '#8D6E63',
        'accent-blue': '#42A5F5',
        'background-beige': '#F5F5DC',
      }
    },
  },
  plugins: [],
}