/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // screens: {
    //   tablet: '1378px',
    // },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-home':
          'linear-gradient(292.61deg, #C894E0 26.55%, #835DB2 119.31%)',
        'gradient-stolen':
          'linear-gradient(111.7deg, rgba(199, 48, 203, 0.59) 7.53%, rgba(131, 93, 178, 0.71) 99.04%)',
      },
      colors: {
        'btn-purple': 'rgba(199, 48, 203, 1)',
        'btn-purple-light': 'rgba(193, 167, 240, 1)',
        'span-purple': 'rgba(205, 129, 207, 1)',
        'span-purple-light': 'rgba(90, 72, 160, 1)',
      },
    },
  },
  plugins: [],
};
