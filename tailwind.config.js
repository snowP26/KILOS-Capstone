
// module.exports = {
//     content: [
//         './app/**/*.{js,ts,jsx,tsx}',
//         './components/**/*.{js,ts,jsx,tsx}',
//         './styles/**/*.{css}'
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [],
// }

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './styles/**/*.{css}',
  ],
  theme: {
    extend: {
      keyframes: {
        shine: {
          '0%': { backgroundPosition: '200% 0' },
          '25%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        gradientFlow: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        shine: 'shine 3s ease-out infinite',
        'gradient-flow': 'gradientFlow 10s ease 0s infinite normal none running',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}

