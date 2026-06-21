import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Royal Arabian brand colors
        'ra-navy': '#1C355E',
        'ra-deep': '#102440',
        'ra-orange': '#C46A3B',
        'ra-gold': '#D0AF21',
        'ra-ink': '#172033',
        'ra-mist': '#F4F6F8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 6px 8px rgba(28, 53, 94, 0.09)',
      },
    },
  },
  plugins: [],
};

export default config;
