import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.tsx',
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Figtree', ...defaultTheme.fontFamily.sans],
        khmer: ['Noto Sans Khmer', 'Hanuman', 'Khmer OS', 'sans-serif'],
      },
    },
  },

  daisyui: {
    themes: [
      {
        light: {
          primary: "#3B82F6",
        },
      }
    ],
  },

  plugins: [require('daisyui')],
};
