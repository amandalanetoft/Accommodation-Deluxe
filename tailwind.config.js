/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], //Stilen läggs till i dessa filer
	theme: {
		extend: {
			colors: {
				primaryDarkBlue: "#002359", // Primary color-Mörkblå
				secondaryLightBlue: "#99D9F2", // Secondary color -ljusblå
				accentPink: "#FF6480", // Accent color - rosa
				hoverColorLightPink: "#FFD9E0", // Hover effect color - ljusrosa
				opacityLightBlue: "rgba(153, 217, 242, 0.2)", // Secondary color with 20% opacity - ljusblå light
				hoverColorDarkPink: "#CC5268", // Mörkrosa
				grey: "#D9D9D9", // Grå
				darkGrey: "#C4C4C4", // Mörkgrå
				opacityDarkBlue: "rgba(0, 35, 89, 0.2)",
				white: "#fafafa",
				black: "#111111",
				opacityBlack: "rgba(0, 0, 0, 0.5)",
				shadyBlack: "#414141",
				aboutUsPink: "#993C4D",
				aboutUsLightBlue: "#5C8291",
				aboutUsDarkBlue: "#667B9B",
				roomGreen: "#3FC32A",
				roomRed: "#D0203E",
			},
			fontFamily: {
				itim: ["Itim", "sans-serif"], // Add the font family here
			},
		},
	},
	// eslint-disable-next-line no-undef
	plugins: [require("tailwind-scrollbar-hide"), require("@iconify/tailwind")],
};
