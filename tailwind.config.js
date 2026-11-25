/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",   // موبايل كبير
      md: "768px",   // تابلت
      lg: "1024px",  // لابتوب
      xl: "1280px",  // شاشة كبيرة
      "2xl": "1536px", // شاشة عريضة جدًا
    },
    extend: {
      keyframes: {
    "task-in": {
      "0%": { opacity: "0", transform: "translateY(-8px) scale(0.98)" },
      "100%": { opacity: "1", transform: "none" },
    },
  },
  animation: {
    "task-in": "task-in 0.3s ease-out",
  },
    },
  },
  plugins: [],
}

