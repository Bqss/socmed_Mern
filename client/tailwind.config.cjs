/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {

        orange: "#fca61f",
        black: "#242d49",

        //   "profileShadow": 0px 4px 17px 2px "rgba(0, 0, 0, 0.25)",
        hrColor: "#cfcdcd",
        cardColor: "rgba(255, 255, 255, 0.64)",
        "button-grad1": "#f9a225",
        "button-grad2": "#f95f35",
        //   "buttonBg": linear-gradient(98.63deg, "", 0%, "", 100%)
        inputColor: "rgba(40, 52, 62, 0.07)",
        photo: "#4CB256",
        video: "#4A4EB7",
        location: "#EF5757",
        schedule: "#E1AE4A",
        background: "#f3f3f3"
      },

    },
  },
  plugins: [],
};
