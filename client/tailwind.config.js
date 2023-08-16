/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{tsx,ts,js,jsx}"],
    theme: {
        extend: {
            colors: {
                bg: "var(--bg-color)",
                // bg_2: "var(--bg-2-color)",
                text: "var(--text-color)",
                text_2: "var(--text-2-color)",
                // text_3: "var(--text-3-color)",
                borders: "var(--borders-color)",
                code: "var(--code-color)",
                // primary: "var(--primary-color)",
            },
        },
    },
    plugins: [],
};
