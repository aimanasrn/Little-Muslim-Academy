import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17324d",
        cream: "#fff8ef",
        sky: "#a8ddff",
        mint: "#bdecc8",
        peach: "#ffd0bf",
        sun: "#ffe38b"
      },
      borderRadius: {
        "4xl": "2rem"
      },
      boxShadow: {
        cloud: "0 18px 50px rgba(23, 50, 77, 0.12)"
      }
    }
  },
  plugins: []
} satisfies Config;
