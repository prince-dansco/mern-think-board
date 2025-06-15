export default {
   plugins: process.env.NODE_ENV === 'production' ? {} : {
    tailwindcss: {},
    autoprefixer: {},
  },
}
