/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Header.jsx
import React from "react";

function Header({ headingText, size }) {
	// Definerar klasser för olika storlekar
	const sizeClasses = {
		large: "h-[300px] pt-20 pb-32 mb-8",
		medium: "h-[200px] pt-10 pb-16",
		small: "h-[150px] pt-5 pb-10",
	};

	// Bas-layout för header
	const baseStyle =
		"relative bg-primaryDarkBlue flex items-center text-white text-6xl px-20";

	return (
		<header className={`${baseStyle} ${sizeClasses[size]}`}>
			<h1>{headingText}</h1>
		</header>
	);
}

export default Header;
