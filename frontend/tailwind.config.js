export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#3f72af',
          light: '#f9f7f7',
          white:'#FFFFFF',
          secondary: '#dbe2ef',
          dark: '#112d4e',
        },
      },
    },
  },
  plugins: [],
}