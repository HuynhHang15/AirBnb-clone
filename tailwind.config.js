/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": {
          1000: "#ff385c",
          500: "#ff385c52"
        },
      },
      // spacing: {
      //   "76px": "76px",
      //   "400px": "400px",
      //   "500px": "500px",
      // },
      // padding: {
      //   "76px": "76px",
      // },
      // width: {
      //   "400px": "400px",
      //   "500px": "500px",
      // },
      // height: {
      //   "500px": "500px",
      // }
    },
  },
  plugins: [],
};
