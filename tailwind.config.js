module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
    theme: {
        extend: {
            backgroundImage: {},
            border: ["focus"],
            colors: {
                primary: {
                    50: "#e8f1f9",   // илүү цайвар өнгө
                    100: "#cdddee",
                    200: "#9fbfde",
                    300: "#6e9fcb",
                    400: "#3e7fb5",
                    500: "#024384",  // үндсэн өнгө
                    600: "#023b75",
                    700: "#023165",
                    800: "#012853",
                    900: "#011d3f",
                    950: "#01142e",  // хамгийн бараан өнгө
                },
                body: "#fff",
                govblue: "#0047BE",
                govblue50: "#0047BE80",
            },
        },
    },

    plugins: [],
};
