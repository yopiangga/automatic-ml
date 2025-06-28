/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/daisyui/dist/**/*.js",
    "node_modules/react-daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },
      colors: {
        neutral: {
          100: "#FFFFFF",
          200: "#EBF0F4",
          300: "#E4E9EC",
          400: "#D8DCE0",
          500: "#BABEC1",
          600: "#989B9D",
          700: "#717375",
          800: "#5D5F61",
          900: "#2F2F2F",
          1000: "#0A0A0A",
        },
        primary: {
          main: "#6B4EFF",
          surface: "#fb923c",
          border: "#ea580c",
        },
        secondary: {
          main: "#FFEB3A",
          surface: "#FFD700",
          border: "#FFF8B7",
        },
        warning: {
          main: "#CD7B2E",
          surface: "#FFEAD1",
          border: "#EECEB0",
          hover: "#BF6919",
          pressed: "#734011",
        },
        danger: {
          main: "#CB3A31",
          surface: "#FFF4F2",
          border: "#EEB4B0",
          hover: "#BD251C",
          pressed: "#731912",
        },
        success: {
          main: "#43936C",
          surface: "#D1FFE9",
          border: "#B8DBCA",
          hover: "#367A59",
          pressed: "#20573D",
        },
        info: {
          main: "#3267E3",
          surface: "#F0F3FF",
          border: "#B1C5F6",
          hover: "#114CD6",
          pressed: "#11317D",
        },
      },
      boxShadow: {
        s1: "0px 4px 24px 0px rgba(0, 0, 0, 0.06)",
        s2: "0px 8px 72px 0px rgba(15, 23, 42, 0.16)",
        s3: "0px 16px 72px 0px rgba(15, 23, 42, 0.16)",
        s4: "0px 16px 72px 0px rgba(15, 23, 42, 0.16)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#004680",
          secondary: "#FFEB3A",
          accent: "#37cdbe",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light",
    ],
  },
  plugins: [require("daisyui")],
};
