/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          mono: ['Roboto Mono', 'monospace'],
          display: ['Orbitron', 'sans-serif'],
        },
        animation: {
          'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'glitch': 'glitch 1s linear infinite',
        },
        keyframes: {
          glitch: {
            '0%, 100%': { 
              textShadow: '0.05em 0 0 rgba(255, 0, 0, 0.75), -0.05em -0.025em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75)'
            },
            '15%, 49%': { 
              textShadow: '-0.05em -0.025em 0 rgba(255, 0, 0, 0.75), 0.025em 0.025em 0 rgba(0, 255, 0, 0.75), -0.05em -0.05em 0 rgba(0, 0, 255, 0.75)'
            },
            '50%, 99%': { 
              textShadow: '0.025em 0.05em 0 rgba(255, 0, 0, 0.75), 0.05em 0 0 rgba(0, 255, 0, 0.75), 0 -0.05em 0 rgba(0, 0, 255, 0.75)'
            }
          }
        }
      },
    },
    plugins: [],
  }