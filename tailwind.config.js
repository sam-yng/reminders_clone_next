/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const darkMode = "class"
export const theme = {
  extend: {
    fontFamily: {
      robreg: ["robreg"],
      robmedium: ["robmedium"],
      roblight: ["roblight"],
    },
  },
};
export const plugins = [];
