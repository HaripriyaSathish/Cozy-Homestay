/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#18231E",
        charcoal: "#161616",
        cream: "#F7F3EA",
        beige: "#E7DDCE",
        gold: "#C8A66A",
        olive: "#6B7A6A",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C8A66A 0%, #E7DDCE 50%, #C8A66A 100%)",
        "forest-gradient": "linear-gradient(160deg, #18231E 0%, #0d130f 100%)",
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "spin-slow": "spin 12s linear infinite",
        "pulse-slow": "pulse 3.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-move": "gradient-move 8s ease infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "gradient-move": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};
