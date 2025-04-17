/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["src/**/*.{js,jsx,ts,tsx}"],
    safelist: [
        "border-none",
        {
            pattern: /bg-+/,
        },
    ],
    theme: {
        extend: {
            fontFamily: {
                default: `"Quattrocento", serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'`,
                display: `"Cinzel Decorative", serif`,
            },
        },
    },
    plugins: [],
}
