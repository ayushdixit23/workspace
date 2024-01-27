/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        nunito: ['var(--font-nunito)'],
      },
      boxShadow: {
        'def': '0px 1.566px 4.698px 0px rgba(13, 10, 44, 0.08)',
        'new': '0px 0px 0px 4px rgba(112, 144, 176, 0.08)'
      },
      zIndex: {
        '200': '200',
      }
    },

    screens: {
      pn: "130px",
      vs: "200px",
      ss: "360px",
      pp: "500px",
      sm: "821px",
      md: "1180px",
      lg: "1440px",
      xl: "1536px",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
