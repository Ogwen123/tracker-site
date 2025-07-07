/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "#282e32",
        "bgdark": "#1e2326",
        "main": "#906378",
        "maindark": "#5d3f4d",
        "secondary": "#6ca37a",
        "secondarydark": "#4a6f53",
        "success": "#778e54",
        "error": "#a1484a",
        "errordark": "#6d3132",
        "warning": "#ba9e68",
        "warningdark": "#86724b",
        "hr": "#444c56",
        "hrdark": "#292e36",
        "subtext": "#bebebe",
        "admin": "#388084",
        "hyperlink": "#57aeff",
        "never": "#01f5f6",
        "weekly": "#b1f700",
        "fortnightly": "#f85a01",
        "monthly": "#f60195"
      },
    },
  },
  plugins: [],
}

