import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gentle: {
          DEFAULT: "#FFBC00",
          light: "#D9D9D9",
          dark: "#717171",
          text: "#222222",
        },
        bublitt: {
          DEFAULT: "#FC5732",
          secondary: "#BA2DBC",
          text: "#27262F",
          light: "#66656B",
        },
        primary: {
          DEFAULT: "#20247E",
        },
        neutral: {
          dark: "#020202",
          normal: "#F6F8FA",
          light: "#ECF1F6",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
