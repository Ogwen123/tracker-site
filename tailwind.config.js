/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "#22272e",
        "bgdark": "#1c2128",
        "main": "#009788",
        "maindark": "#00645a",
        "secondary": "#03a9f4",
        "secondarydark": "#0276aa",
        "success": "#27ea60",
        "error": "#c0392b",
        "errordark": "#9c2e22",
        "warning": "#e67e22",
        "warningdark": "#ab5e1a",
        "hr": "#444c56",
        "hrdark": "#292e36",
        "subtext": "#bebebe",
        "admin": "#2563eb",
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

