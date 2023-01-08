/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      dropShadow: {
        'book': [
          'rgba( 242, 236, 225,0.9) 6px 6px',
          'rgba( 112, 112, 112, 1) 6px 6px',
        ]
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/line-clamp'),
  ],
}
