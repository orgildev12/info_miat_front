module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
        extend: {
            backgroundImage: {
                login_pattern: "url('/public/background-image/login-bg.jpg')",
                bg_pattern: "url('/public/background-image/bg.png')",
                logo_pattern: "url('/public/mecore-logos/main-logo/logo_v2.png')",
                abstract_pattern1: "url('/public/background-image/abstract-background2.png')",
            },
            border: ["focus"],
            colors: {
                primary: {
                    50: "#f3f8fc",
                    100: "#e5eef9",
                    200: "#c5dcf2",
                    300: "#92bee7",
                    400: "#589dd8",
                    500: "#3280c5",
                    600: "#2364a6",
                    700: "#1d5087",
                    800: "#1b436c",
                    900: "#1c3c5e",
                    950: "#13263e",
                },
                body: "#fff",
                govblue: "#0047BE",
                govblue50: "#0047BE80",
            },
        },
    },

    plugins: [],
};
