module.exports = {
  content: ["./src/ui/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      display: ['"Poppins", sans-serif'],
      body: ['"Open Sans", sans-serif'],
    },
    extend: {
      animation: {
        "slide-in-blurred-left":
          "slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000)   both",
        "slide-in-left":
          "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
      keyframes: {
        "slide-in-blurred-left": {
          "0%": {
            transform: "translateX(-50px) scaleX(0.5) scaleY(.2)",
            "transform-origin": "100% 50%",
            filter: "blur(1px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0) scaleY(1) scaleX(1)",
            "transform-origin": "50% 50%",
            filter: "blur(0)",
            opacity: "1",
          },
        },
        "slide-in-left": {
          "0%": {
            transform: "translateX(-1000px)",
            opacity: "0",
          },
          to: {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
