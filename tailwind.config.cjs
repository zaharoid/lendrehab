/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.vue",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./pages/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        primaryLight: "#dbeafe",
        accent: "#10b981"
      },
      borderRadius: {
        xl: "0.75rem"
      }
    }
  },
  plugins: []
}