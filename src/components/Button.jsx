// eslint-disable-next-line no-unused-vars
import React from "react";

//definierar en knapp som anpassar sig efter storlek, färg, text och om den ska vara rundad eller aktiv baserat på de angivna props.
// eslint-disable-next-line react/prop-types
function Button({ size, buttonText, onClick, color, rounded = false, active = false }) {
	const sizeClasses = {
		small: "w-[90px] h-[25px] text-[15px]",
		medium: "w-[110px] h-[30px] text-[16px]",
		large: "w-[125px] h-[40px] text-[24px]",
	};

	const colors = {
		transparent: `bg-transparent text-black border-grey hover:bg-transparent hover:border-accentPink`,
		pink: `bg-accentPink text-white border-accentPink hover:bg-hoverColorLightPink`,
		active: `bg-hoverColorLightPink text-black border-accentPink`,
	};

	// Standard knappstilar
	const baseStyle = `bg-accentPink text-white rounded-lg shadow-lg hover:bg-hoverColorDarkPink transition-all duration-300 ease-in-out cursor-pointer`;

	const roundedStyle = `border rounded-full mx-1 px-[20px] py-[10px] h-[37px] flex items-center justify-center whitespace-nowrap cursor-pointer `;

	//Använder den rundade stilen eller standardstilen
	const buttonStyle = rounded ? roundedStyle : baseStyle;

	// Tillämpar aktiv stil endast på den rundade knappen
	const activeStyle = rounded && active ? colors.active : colors[color];

	return (
		<button
			className={`${buttonStyle} ${sizeClasses[size]} ${activeStyle}`} // Dynamisk klassnamn baserat på stil, storlek och aktiv status
			onClick={onClick} // Anropar onClick-funktionen när knappen klickas
		>
			{buttonText}
		</button>
	);
};

export default Button;
