/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { useHotelData } from "../../contexts/HotelDataContext";

// Komponent för att välja landskod för telefonnummer
function PhoneNumberSelection({ onSelectCountry }) {
	
	// Hämtar länder från kontexten, hanterar "drop-down"-menyns öppning/stängning, lagrar det valda landet
	const { countries } = useHotelData(); 
	const [isOpen, setIsOpen] = useState(false);
	const [selectedCountry, setSelectedCountry] = useState(null);


	// Används för att sätta standardland när länder är tillgängliga
	useEffect(() => {
		console.log("Countries:", countries);
		if (countries && countries.length > 0 && !selectedCountry) {
			setSelectedCountry(countries[0]);
			onSelectCountry(countries[0]);
		}
	}, [countries, selectedCountry, onSelectCountry]);

	// Växlar dropdownens synlighet
	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	// Används för att hantera valet av ett land
	const handleSelectCountry = (country) => {
		console.log("Country selected:", country); 
		setSelectedCountry(country);
		onSelectCountry(country);
		setIsOpen(false);
	};


	return (
		//dropdown-komponenten
		<div className="relative">
			{/*Knapp som används för att visa det valda landet och växlar dropdownens synlighet*/}
			<button
				onClick={toggleDropdown}
				className="flex items-center justify-between p-4 bg-[#FFF] rounded-lg border cursor-pointer w-[120px] h-12"
				type="button"
			>
				<span className="text-lg font-medium">
				{/* Används för att visa valt lands flagga och kod*/}
					{selectedCountry ? `${selectedCountry.flag} ${selectedCountry.code}` : "Select"}
				</span>
				<FontAwesomeIcon
					icon={isOpen ? faChevronUp : faChevronDown}
					className="ml-3 w-3 h-3"
				/>
			</button>

		{/* Innehåll för dropdown-listan */}
			{isOpen && (
				<div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg z-50 w-[120px]" >
					<ul className="text-center">
						{/* Renderar en lista av länder som kan väljas på*/}
						{countries.map((country, index) => (
							<li
								key={index}
								className="p-2 cursor-pointer hover:bg-gray-100"
								onClick={() => handleSelectCountry(country)}
							>
								{/* Visar flagga och kod för varje land */}
								{country.flag} {country.code}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

// Definierar prop-typer för komponenten
PhoneNumberSelection.propTypes = {
	//funktion för att hantera val av land
	onSelectCountry: PropTypes.func.isRequired, 
};

export default PhoneNumberSelection;