/* eslint-disable react/prop-types */
// MiniCalendar.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

// Använder dayjs för att starta veckan på måndag
dayjs.extend(updateLocale);
dayjs.updateLocale("en", { weekStart: 1 });

function MiniCalendar(props) {

	// Skapar en state-variabel för att hålla det aktuella månadens datum, med standardvärdet som den första dagen av den aktuella månaden.
	const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));

	// Genererar dagar för den aktuella månader
	const generateMonthDays = (month) => {
		const daysInMonth = month.daysInMonth();
		const firstDayOfMonth = month.startOf("month").day();
		const days = [];

		// Lägger till "null"-värden i "days-arrayen" för att representera de tomma dagarna i början av månaden, baserat på veckodagen för den första dagen av månaden.
		for (
			let i = 0;
			i < (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
			i++
		) {
			days.push(null);
		}

		// Lägger till faktiska dagar i månaden
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(month.date(day));
		}

		return days;
	};

	// Funktion för navigation till föregående månad
	const handlePrevMonth = () => {
		setCurrentMonth(currentMonth.subtract(1, "month"));
	};
	//Funktion för navigation till kommande månad
	const handleNextMonth = () => {
		setCurrentMonth(currentMonth.add(1, "month"));
	};
	// Renderar en specifik dag
	const renderDay = (day) => {
		if (!day) return <div className="calendar-day empty"></div>;

		const isToday = day.format("YYYY-MM-DD") === props.today;
		const isSelected = day.format("YYYY-MM-DD") === props.selectedDate;

		// Renderar en dag med dynamiska klasser beroende på om den är vald eller dagens datum
		return (
			<div
				className={`calendar-day ${
					isSelected
						? "bg-secondaryLightBlue text-white"
						: isToday
						? "bg-opacityLightBlue text-black"
						: ""
				} rounded-full text-center p-2 cursor-pointer hover:bg-opacityLightBlue`}
				onClick={() => props.onDateClick(day)} // Anropar onDateClick-funktionen med den valda dagen
			>
				{day.date()} {/* Visar dagnummer */}
			</div>
		);
	};

	// Labels för veckodagar (mån, tis, osv.)
	const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	return (
		<div className="p-4 shadow-xl rounded-lg w-[350px] bg-secondaryLightBlue border border-white">
			{" "}
			{/* Månadens namn och navigationsknappar */}
			<div className="bg-white p-4 rounded-t-lg flex items-center justify-between border border-b-lightGrey">
				{/* Knapp för att navigera till föregående månad */}
				<button
					onClick={handlePrevMonth}
					className="text-lg hover:text-accentPink"
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
				<h4 className="text-xl font-semibold">
					{currentMonth.format("MMMM YYYY")}
				</h4>
				{/* Knapp för att navigera till nästa månad */}
				<button
					onClick={handleNextMonth}
					className="text-lg hover:text-accentPink"
				>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			</div>
			{/* Kalenderns huvudinnehåll */}
			<div className="bg-white p-4 rounded-b-lg">
				{/* Labels för veckodagar */}
				<div className="grid grid-cols-7 gap-2">
					{weekdayLabels.map((label) => (
						<div key={label} className="text-center text-sm">
							{label}
						</div>
					))}
				</div>

				{/* Visar alla dagar för den aktuella månaden */}
				<div className="grid grid-cols-7 gap-2">
					{/* Genererar dagarna i månaden*/}
					{generateMonthDays(currentMonth).map((day, index) =>
						renderDay(day, index)
					)}
				</div>
			</div>
		</div>
	);
}
// Validerar att onDateClick är en funktion
MiniCalendar.propTypes = {
	onDateClick: PropTypes.func.isRequired,
};

export default MiniCalendar;
