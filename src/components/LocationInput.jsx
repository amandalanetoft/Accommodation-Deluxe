/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function LocationInput(props) {
	// Klassen baseras på storleken som skickas som prop
	const sizeClasses = {
		mainSearch: "w-[230px] h-[50px]",
		airportTransferSearch: "w-[250px] h-[45px]",
	};

	return (
		<div

		//tilldelar en CSS-klass till en komponent baserat på props.size, och kombinerar den med andra fördefinierade klasser för att styla elementet med flexbox, padding, bakgrund, rundade hörn, en ram och en pekare som indikerar att elementet kan klickas på.
			className={`${
				sizeClasses[props.size]
			} flex items-center justify-between p-4 bg-white rounded-lg border cursor-pointer`}
		>
			{/* Ikon för platsmarkering */}
			<FontAwesomeIcon
				icon={faMapMarkerAlt}
				className="mr-2 text-black"
			/>
			{/* Textfält för användarinmatning */}
			<input
				type="text"
				className="w-full focus:outline-none bg-transparent"
				placeholder={props.placeholder}
				onChange={props.onChange}
				value={props.value}
			/>
		</div>
	);
}



export default LocationInput;

//definierar typkontroller för en LocationInput-komponent, som specificerar att den förväntar sig tre prop-värden: en obligatorisk placeholder av typen string, en obligatorisk onChange-funktion för att hantera ändringar i inputfältet och ett obligatoriskt value av typen string för att hålla det aktuella värdet i fältet
LocationInput.propTypes = {
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	value: PropTypes.string.isRequired,
};




