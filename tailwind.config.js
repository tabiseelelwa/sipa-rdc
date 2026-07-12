/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocre: {
          50: '#fdf8f0',
          100: '#f9edda',
          200: '#f2d9b0',
          300: '#e8be7e',
          400: '#db9a4a',
          500: '#c97d28',
          600: '#8B4513',
          700: '#7a3a10',
          800: '#642f10',
          900: '#532710',
        },
        foret: {
          50: '#f0f7e8',
          100: '#d9edcc',
          200: '#b5db9e',
          300: '#87c166',
          400: '#5fa33b',
          500: '#4a8a2a',
          600: '#2D5016',
          700: '#274614',
          800: '#213a12',
          900: '#1c3110',
        },
        terre: {
          400: '#d4784a',
          500: '#C4622D',
          600: '#a84f22',
          700: '#8a3f1c',
        },
        brun: {
          900: '#1A0A00',
          800: '#2d1200',
          700: '#401a00',
        },
        ivoire: '#F5F0E8',
      },
      fontFamily: {
        display: ['Georgia', 'Cambria', 'serif'],
        body: ['system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'foret-gradient': 'linear-gradient(135deg, #1A0A00 0%, #2D5016 50%, #1A0A00 100%)',
      },
    },
  },
  plugins: [],
}
