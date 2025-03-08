/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types"; // Importing PropTypes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUserGroup,
	faChevronDown,
	faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

function PassengerSelection(props) {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedPassengerCount, setSelectedPassengerCount] = useState(1);

	// Växlar öppning/stängning av dropdown
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	// Hanterar valet av passagerarantal
	const handleSelectPassenger = (count) => {
		setSelectedPassengerCount(count);
		setIsOpen(false); // Stänger dropdown efter val
		props.onSelectPassenger(count); // Skickar valt antal passagerare uppåt
	};

	return (
		<div className="relative">
			{" "}
			{/* Visar antal passagerare och ikon för dropdown */}
			<button
				onClick={toggleDropdown}
				className="flex items-center justify-between p-4 bg-white rounded-lg border cursor-pointer hover:bg-grey w-[180px] h-[45px]" // Adjusted width, padding, and height
			>
				<FontAwesomeIcon icon={faUserGroup} className="mr-2" />
				<span className="truncate">
					Passengers: {selectedPassengerCount}
				</span>
				<FontAwesomeIcon
					icon={isOpen ? faChevronUp : faChevronDown}
					className="ml-2"
				/>
			</button>
			{/* Innehåll för dropdown-menyn. Används för att rendera en lista med passagerarantal från 1 till 5 som klickbara element, där varje klick anropar "handleSelectPassenger"-funktionen med det valda antalet passagerare. */}
			{isOpen && (
				<div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg z-10 w-[200px]">
					{" "}
					<ul className="text-center">
						{[1, 2, 3, 4, 5].map((count) => (
							<li
								key={count}
								className="p-2 cursor-pointer hover:bg-accentPink hover:text-white"
								onClick={() => handleSelectPassenger(count)}
							>
								{count}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

// Validerar att onSelectPassenger är en obligatorisk funktion
PassengerSelection.propTypes = {
	onSelectPassenger: PropTypes.func.isRequired, 
};

export default PassengerSelection;

