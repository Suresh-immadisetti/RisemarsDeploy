/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f5ff',
          100: '#cceaff',
          200: '#99d5ff',
          300: '#66c0ff',
          400: '#33aaff',
          500: '#0095ff', // Primary blue
          600: '#0077cc',
          700: '#005999',
          800: '#003c66',
          900: '#001e33',
        },
        skyblue: {
          50: '#f0f9ff',
          100: '#e0f4fe',
          200: '#bae3fd',
          300: '#7dcefc', // Light sky blue
          400: '#36b6f9',
          500: '#0c9aef', // Sky blue
          600: '#0082d9',
          700: '#0068af',
          800: '#00548f',
          900: '#004675',
        },
        secondary: {
          50: '#edf8ff',
          100: '#daf1ff',
          200: '#ade0ff',
          300: '#7cc8ff',
          400: '#4aa7ff',
          500: '#1a85ff', // Secondary blue
          600: '#0066cc',
          700: '#0052a3',
          800: '#003d7a',
          900: '#002952',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};