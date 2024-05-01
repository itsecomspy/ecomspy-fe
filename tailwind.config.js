/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{html,js}",
    "./components/**/*.{html,js}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "395px",
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        xxl: "1400px",
      },
    },
    colors: {
      black: "#000",
      white: "#FFF",
      primary: "#2D55FB",
      secondary: "#010828",
      background: "#010519",
      button: {
        primary: "#2D55FB",
        "primary-hover": "#4669FB",
        "primary-active": "#1441FB",
        secondary: "#010828",
        "secondary-hover": "#020D41",
        "secondary-active": "#02125A",
        "ghost-white": "#F0F3FF",
        lavender: "#D6DEFF",
      },
      accents: {
        thistle: "#F0D3F7",
        cream: "#E7EFC5",
        celadon: "#A1E8AF",
      },
      "eerie-black": "#181B1A",
      "gray-400": "#7F8190",
      "gray-700": "#A8A9B3",
      "gray-500": "#727483",
      "gray-800": "#C3C4CB",
      "white-50": "rgba(255,255,255,.5)",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.8rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
      h2: [
        "46px",
        {
          lineHeight: "53px",
          fontWeight: "500",
          letterSpacing: ".46px",
        },
      ],
      h3: [
        "35px",
        {
          lineHeight: "44px",
          fontWeight: "500",
          letterSpacing: ".36px",
        },
      ],
      h4: [
        "32px",
        {
          lineHeight: "40px",
          fontWeight: "500",
          letterSpacing: ".32px",
        },
      ],
      "display-2": [
        "64px",
        {
          lineHeight: "72px",
          fontWeight: "600",
          letterSpacing: ".64px",
        },
      ],
      "display-2-md": [
        "40px",
        {
          lineHeight: "48px",
          fontWeight: "500",
          letterSpacing: ".4px",
        },
      ],
    },
  },
  plugins: [],
};
