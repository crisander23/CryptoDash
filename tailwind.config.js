/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // Add the Orbitron font for a Web3 feel
        web3: ['Orbitron', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee 15s linear infinite', // Keep the marquee animation
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      colors: {
        // Custom colors for Web3 style
        'primary': '#118CFE', // Add a cool Web3 color (adjust as needed)
        'secondary': '#1a1a1a', // Dark secondary color for background or sections
        'highlight': '#00ffcc', // Neon color for buttons/links
      },
    },
  },
  plugins: [],
};
