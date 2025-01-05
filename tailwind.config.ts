/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      aspectRatio: {
        '27/17': '27 / 17',
      },
      colors: {
        kakao: '#FEE500',
        google: '#f44336',
        main: '#0064FF',
        grey: '#CBCBCB',
        whitesmoke: '#F0F0F0',
        lightgray: '#D1D6DB',
        primaryblue: '#3F51B5',
        primaryred: '#FF6C6A',
        lightgrey: '#eeebeb',
        coolgray: '#8B95A1',
        badge: '#f2f4f7',
        silver: '#b5b6b9',
        royalblue: '#3366ff',
        darkgray: '#a4a5a7',
        dimgray: '#656667',
        primary: '#34363D',
        darkgrey: '#3c3a3a',
        lavender: '#d4e1f3',
        aliceblue: '#f1f4ff',
        green: '#449F3C',
        cornflowerblue: '#7493ff',
        error: '#EA2A2A',
        salomon: '#ff6c6a',
        seashell: '#fff2ee',
        limegreen: '#11b143',
        mediumpurple: '#7c6ecd',
        lavenderblue: '#cad4ff',
        navy: '#3f51b5',
        skyblue: '#7493FF',
        grayfont: '#bdbdbd',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
