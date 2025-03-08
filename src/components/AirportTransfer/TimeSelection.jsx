 
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types"; // Importerar PropTypes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClock,
	faChevronDown,
	faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

// Komponenten tar emot props och hanterar visningen och valet av tid
function TimeSelector(props) {
	// State för att hantera dropdownens öppning/stängning
	const [isOpen, setIsOpen] = useState(false); 
	 //State för attspara vald tid
	const [selectedTime, setSelectedTime] = useState("00:00");

	// Toggle dropdown öppning/stängning
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	// Hanterar val av tid
	const handleTimeSelect = (time) => {
		setSelectedTime(time); // Uppdaterar vald tid
		setIsOpen(false); // Stäng dropdown efter val
		props.onTimeSelect(time); // Anropa onTimeSelect-funktion från props
	};
	
	
	// Genererar tider med 30-minutersintervall
	const generateTimeSlots = () => {
		const times = [];
		for (let hour = 0; hour < 24; hour++) {
			const formattedHour = hour.toString().padStart(2, "0");
			times.push(`${formattedHour}:00`);
			times.push(`${formattedHour}:30`);
		}
		return times;
	};

	return (
		<div className="relative">
			{/* Knapp som visar vald tid och hanterar öppning/stängning av dropdown */}
			<button
				className="flex items-center justify-between p-4 bg-white rounded-lg border cursor-pointer hover:bg-grey w-[150px] h-[45px]"
				onClick={toggleDropdown}
			>
				<FontAwesomeIcon icon={faClock} className="mr-2" />
				<span>{selectedTime}</span>
				<FontAwesomeIcon
					icon={isOpen ? faChevronUp : faChevronDown}
					className="ml-2"
				/>
			</button>

			{/* Dropdown-meny som visar alla tillgängliga tider om isOpen är true */}
			{isOpen && (
				<div className="absolute top-full mt-2 bg-white border rounded-lg shadow-lg z-10 w-[150px] h-[500px] overflow-y-auto">
					<ul className="text-center">
						{/* LOopar igenom generateTimeslots för att rendera tiderna*/}
						{generateTimeSlots().map((time, index) => (
							<li
								key={index}
								className="p-2 cursor-pointer hover:bg-accentPink hover:text-white"
								onClick={() => handleTimeSelect(time)}
							>
								{time} {/* Visar den aktuella tiden i listan */}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

// Validering av props
TimeSelector.propTypes = {
	onTimeSelect: PropTypes.func.isRequired, // Säkerställer att onTimeSelect är en obligatorisk funktion
};

export default TimeSelector;

