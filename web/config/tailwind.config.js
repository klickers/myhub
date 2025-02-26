/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                default: `"Livvic", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
            },
        },
    },
    plugins: [],
}
