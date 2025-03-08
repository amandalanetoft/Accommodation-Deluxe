// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import MiniCalendar from "./MiniCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

// Komponenten används för att hantera datumvalet. Den tar emot en onChange-funktion som prop.
function DateSelection({ onChange }) { 
	//Används för att initierar dagens datum med formatet "YYYY-MM-DD" och sätter det som valt datum.
	const today = dayjs().format("YYYY-MM-DD");

	// Definierar en state-variabel för att hålla det valda datumet och en för att styra visningen av kalendern.
	const [selectedDate, setSelectedDate] = useState(today); 
	const [showCalendar, setShowCalendar] = useState(false); 

	// Funktioen körs om ett datum valts i kalendern
	const handleDateClick = (date) => {
		const formattedDate = date.format("YYYY-MM-DD"); // Formaterar datumet
		setSelectedDate(formattedDate); //updaterar valt datum
		setShowCalendar(false); // Stäng kalendern efter val
		onChange(formattedDate); // Anropar onChange för att skicka valt datum uppåt
	};

	return (
		<div className="relative inline-block">
			{/* Anvädns för att visa ett datumfält med en kalenderikon som användaren kan klicka på för att växla visningen av kalendern. Det valda datumet visas bredvid ikonen. */}
			<div
				className="flex items-center p-4 bg-white border rounded-lg cursor-pointer w-[150px] h-[45px]"
				onClick={() => setShowCalendar(!showCalendar)} 
			>
				<FontAwesomeIcon icon={faCalendar} className="mr-2" />
				<span>{selectedDate}</span>
			</div>

			{/* Visar mini-calender om showCalendar är true */}
			{showCalendar && (
				<div className="absolute mt-2 z-10">
					<MiniCalendar
						onDateClick={handleDateClick} // "handleDateClick" anropas när ett datum valts och hanterar det valda datumet
						selectedDate={selectedDate} // "selectedDate" skickas för att markera vilket datum som är valt i kalendern
						today={today} 
					/>
				</div>
			)}
		</div>
	);
}
// Validerar att onChange-prop skickas in
DateSelection.propTypes = {
	onChange: PropTypes.func.isRequired,
};

export default DateSelection;

