// tailwind.config.js
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",      // Added /src and mdx
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",   // Added /src and mdx
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // Added /src and mdx
    // If you have other top-level directories using Tailwind, add them too:
    // "./public/**/*.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        cursive: ["Dancing Script", "cursive"],
      },
      maxWidth: {
        'full': '100%',
      },
      width: {
        '45p': '45%',
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        'gradient-x': 'gradient-x 10s ease infinite',
        'gradient-y': 'gradient-y 10s ease infinite',
        'gradient-xy': 'gradient-xy 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(100px)', filter: 'blur(33px)' },
          '100%': { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-y': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'top center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'bottom center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left top',
          },
          '50%': {
            'background-size': '400% 400%',
            'background-position': 'right bottom',
          },
        },
      },
    },
  },
  plugins: [],
};