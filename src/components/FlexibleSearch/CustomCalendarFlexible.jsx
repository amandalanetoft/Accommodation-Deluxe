// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXmark,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import MonthSelector from "./MonthSelector";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(isBetween);
dayjs.extend(updateLocale);

// Uppdaterar dayjs så att veckan startar måndag
dayjs.updateLocale("en", { weekStart: 1 });

function CustomCalendarFlexible(props) {
	// State-hantering för olika interaktioner
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [hoverDate, setHoverDate] = useState(null);
	const [currentMonth, setCurrentMonth] = useState(dayjs().startOf("month"));
	const [selectedRangeOption, setSelectedRangeOption] = useState(null); 
	const [activeTab, setActiveTab] = useState("Date");

	const [selectedMonths, setSelectedMonths] = useState([]);
	const [bookingType, setBookingType] = useState("");
	const [customNights, setCustomNights] = useState(1); // Added for custom nights
	const [startDay, setStartDay] = useState("Monday"); // Added for start day

	 // Hanterar val av månader i flexibel fliken
	const handleMonthSelection = (months) => {
		setSelectedMonths(months);
	};

	// Funktion för att hantera typ av bokning
	const handleBookingTypeChange = (e) => {
		setBookingType(e.target.value);
	};

	// Funktion för att generera dynamisk text baserat på val
	const getDynamicText = () => {
		// Om ingen bokningstyp eller månad har valts, returneras en default-text
		if (!bookingType && selectedMonths.length === 0) {
			return "Select days and months";
		}

		// Om en bokningstyp är vald men inga månader har valts, returnera en uppmaning till användaren att välja en månad.
		if (bookingType && selectedMonths.length === 0) {
			return "Select preferred month";
		}

		// Om ingen bokningstyp är vald men användaren har valt månader, returnera en uppmaning att välja specifika dagar.
		if (!bookingType && selectedMonths.length > 0) {
			return "Select preferred days";
		}

		const monthsText = selectedMonths
			.map((month) => {
				 // Extraherar månadsnamn från formatet 'MMM YYYY'
				const [monthName] = month.split(" ");
				return monthName;
			})
			.join(", ");

        //Funktion som returnerar en anpassad text baserat på vald bokningstyp och antal nätter. Hanterar olika bokningstyper och ger en sammanfattning av nätter och månader.
		if (bookingType === "other") {

			// För bokningstyp "other", returnera en sträng med antalet nätter och de valda månaderna.
			return `${customNights} night${
				customNights > 1 ? "s" : ""
			} in ${monthsText}`;
		}
		
		// Standardvärde för nätter
		let nights = "1 night";

		// Om bokningstypen är "weekend", sätt antalet nätter till 2
		if (bookingType === "weekend") {
			nights = "2 nights";

		// Om bokningstypen är "week", sätt antalet nätter till 7.
		} else if (bookingType === "week") {
			nights = "7 nights";

		// Om bokningstypen är "month", sätt antalet nätter till 30.
		} else if (bookingType === "month") {
			nights = "30 nights";
		}
		
		return `A ${bookingType} in ${monthsText} (${nights})`;
	};

	// Hanterar klick på datum för att välja ett start- och slutdatum
	const handleDateClick = (date) => {
		if (!startDate) {
			setStartDate(date);
		} else if (!endDate && dayjs(date).isAfter(startDate)) {
			setEndDate(date);
		} else {
			setStartDate(date);
			setEndDate(null);
		}
	};

	// Funktion för att byta mellan flikarna Date och Flexible
	const handleTabClick = (tab) => {
		setActiveTab(tab);
	};

	// Kontrollerar datum ligger inom det valda intervallet
	const isInRange = (date) => {
		if (startDate && !endDate && hoverDate) {
			return dayjs(date).isBetween(startDate, hoverDate, null, "[]");
		}
		if (startDate && endDate) {
			return dayjs(date).isBetween(startDate, endDate, null, "[]");
		}
		return false;
	};

	// Funktion som genererar en array av datum för alla dagar i en månad
	const generateMonthDays = (month) => {
		const daysInMonth = month.daysInMonth();
		const firstDayOfMonth = month.startOf("month").day();
		const days = [];
		for (let i = 0; i < firstDayOfMonth; i++) {
			days.push(null);
		}
		for (let day = 1; day <= daysInMonth; day++) {
			days.push(month.date(day));
		}
		return days;
	};

	// Hanterar navigering mellan månader
	const handlePrevMonth = () => {
		setCurrentMonth(currentMonth.subtract(1, "month"));
	};

	const handleNextMonth = () => {
		setCurrentMonth(currentMonth.add(1, "month"));
	};

	// Renderar enskild dag i kalendern
	const renderDay = (day) => {

		// Används för att kontrollera om 'day' är null eller undefined. Om så är fallet, returnera en tom kalenderdag (en div med klassen "calendar-day empty").
		if (!day) return <div className="calendar-day empty"></div>;

		// Används för att kontrollera om den aktuella dagen ('day') är vald som startdatum. Om så är fallet, sätt 'isSelected' till true.
		const isSelected = startDate && day.isSame(startDate, "day");

		// Används för att kontrollera om den aktuella dagen är vald som slutdatum. Om så är fallet, sätt 'isEnd' till true.
		const isEnd = endDate && day.isSame(endDate, "day");

		// Används för att kontrollera om den aktuella dagen ligger inom det valda datumintervallet.'inRange' kommer att vara true om 'day' är inom intervallet.
		const inRange = isInRange(day);

		// Används för att kontrollera om den aktuella dagen är ett datum som har passerat. 'isPastDate' kommer att vara true om 'day' är innan dagens datum.
		const isPastDate = day.isBefore(dayjs(), "day");

		return (
			<div
			// Om dagen är vald eller slutdatum
				className={`calendar-day ${
					isSelected || isEnd
						? "bg-accentPink text-black"
						: inRange
						? "bg-hoverColorLightPink text-black"
						: isPastDate
						? "text-grey"
						: ""
				} rounded-full hover:bg-hoverColorLightPink text-center p-2 cursor-pointer`}
				onClick={() => !isPastDate && handleDateClick(day)} // Anvädns för att kunna klicka om datumet inte är förflutet
				onMouseEnter={() => setHoverDate(day)} // Avnädns för att hovra över för att markera dagen
			>
				{/* Används för att visa datumet för den aktuella dagen */}
				{day.date()} 
			</div>
		);
	};

	// Labels för veckodagar
	const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	// Hanterar antal nätter för anpassad bokning
	const handleCustomNightsChange = (e) => {
		setCustomNights(Number(e.target.value));
	};

	// Hanterar startdag för anpassad bokning
	const handleStartDayChange = (e) => {
		setStartDay(e.target.value);
	};

	// Hanterar val av datumintervall
	const handleRangeOptionClick = (option) => {
		setSelectedRangeOption(option);
	};

	return (
		<div className="p-6 bg-white shadow-lg rounded-lg w-[800px]">
			{/* Används för Date och Flexible */}
			<div className="flex items-center justify-between mb-4">
				<div className="flex-1 flex justify-center">
					<div className="flex bg-grey rounded-full p-1 w-[400px]">
						
						{/* Kontrollerar om den aktuella fliken är "Date" */}
						<button
							className={`flex-1 py-2 px-6 rounded-full text-lg ${
								activeTab === "Date" 
									? "bg-white text-black"
									: "bg-transparent text-black hover:bg-darkGrey"
							}`}
							onClick={() => handleTabClick("Date")} // Används för att anropa "handleTabClick" med "Date" när knappen klickas
						>
							Date 
						</button>

						{/* Kontrollerar om den aktuella fliken är för "Flexible" */}
						<button
							className={`flex-1 py-2 px-6 rounded-full text-lg ${
								activeTab === "Flexible"
									? "bg-white text-black"
									: "bg-transparent text-black hover:bg-darkGrey"
							}`}
							onClick={() => handleTabClick("Flexible")} // Anropar handleTabClick med "Flexible" som argument när knappen klickas
						>
							Flexible
						</button>
					</div>
				</div>

				{/* Anropar closeCalendar-funktionen från props när knappen klickas */}
				<button
					onClick={props.closeCalendar}
					className="text-black bg-transparent text-2xl font-semibold hover:text-accentPink"
				>
					<FontAwesomeIcon icon={faXmark} /> {/* Visar ett stängt ikon (X) med hjälp av FontAwesome */}
				</button>
			</div>

			{/* Visar innehåll baserat på aktiv flik */}
			{activeTab === "Date" ? (
				<div>
					{/* Kalender för att välja datum */}
					<div className="grid grid-cols-2 gap-6">
						{/* Navigeringsknappar och rubrik för månad */}
						<div className="w-full">
							<div className="flex items-center justify-between mb-2">
								<button
									onClick={handlePrevMonth}
									className="text-lg hover:text-accentPink"
								>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<h4 className="text-xl font-semibold">
									{currentMonth.format("MMMM YYYY")}
								</h4>
								<div></div>{" "}
								{/* Tom div för att placera pilarna korrekt */}
							</div>
							{/* Labels för veckodagar */}
							<div className="grid grid-cols-7 gap-2">
								{weekdayLabels.map((label) => (
									<div
										key={label}
										className="text-center text-sm"
									>
										{label}
									</div>
								))}
							</div>
							{/* Dagar i kalendern */}
							<div className="grid grid-cols-7 gap-2">
								{generateMonthDays(currentMonth).map(
									(day, index) => renderDay(day, index)
								)}
							</div>
						</div>
						{/* Kalender för nästa månad */}
						<div className="w-full">
							<div className="flex items-center justify-between mb-2">
								<div></div>{" "}
								{/* Tom div för att placera pilarna korrekt */}
								<h4 className="text-xl font-semibold">
									{currentMonth
										.add(1, "month")
										.format("MMMM YYYY")}
								</h4>
								<button
									onClick={handleNextMonth}
									className="text-lg hover:text-accentPink"
								>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
							{/* Labels för veckodagar */}
							<div className="grid grid-cols-7 gap-2">
								{weekdayLabels.map((label) => (
									<div
										key={label}
										className="text-center text-sm"
									>
										{label}
									</div>
								))}
							</div>
							{/* Dagar i kallendern */}
							<div className="grid grid-cols-7 gap-2">
								{generateMonthDays(
									currentMonth.add(1, "month")
								).map((day, index) => renderDay(day, index))}
							</div>
						</div>
					</div>

					{/* Alternativ för datumintervall */}
					<div className="flex justify-between mb-4 mt-6">
						{/* En knapp som låter användaren välja "Exakta datum" som en del av en intervallvalsfunktion. */}
						<Button
							buttonText={"Exact dates"}
							rounded={true}
							color="transparent"
							active={selectedRangeOption === "Exact dates"} // Kontrollerar om "Exact dates" är den valda alternativet
							onClick={() =>
								handleRangeOptionClick("Exact dates") 
							} // Anropar en funktion när knappen klickas
						/>
						{/*Samma koncept som för första knappen gäller på resterande */}
						<Button
							buttonText={"± 1 day"}
							rounded={true}
							color="transparent"
							active={selectedRangeOption === "± 1 day"}
							onClick={() => handleRangeOptionClick("± 1 day")}
						/>
						<Button
							buttonText={"± 2 days"}
							rounded={true}
							color="transparent"
							active={selectedRangeOption === "± 2 days"}
							onClick={() => handleRangeOptionClick("± 2 days")}
						/>
						<Button
							buttonText={"± 3 days"}
							rounded={true}
							color="transparent"
							active={selectedRangeOption === "± 3 days"}
							onClick={() => handleRangeOptionClick("± 3 days")}
						/>
						<Button
							buttonText={"± 7 days"}
							rounded={true}
							color="transparent"
							active={selectedRangeOption === "± 7 days"}
							onClick={() => handleRangeOptionClick("± 7 days")}
						/>
						<Button
							buttonText={"± 14 days"}
							rounded={true}
							color="transparent"
							active={selectedRangeOption === "± 14 days"}
							onClick={() => handleRangeOptionClick("± 14 days")}
						/>
					</div>
				</div>
			) : (
				<div>
					{/* "Flexible"-innehåll */}
					<h4 className="text-lg font-semibold mb-4">
						How long do you want to stay?
					</h4>
					<div className="flex mb-4">
						{/* Radioknappar för bokningstyp */}
						<div
							onChange={handleBookingTypeChange}
							className="flex"
						>
							<div className="flex items-center mr-[40px]">
								<label>
									<input
										type="radio"
										value="weekend"
										name="bookingType"
										className="mr-[10px]"
									/>{" "}
									A weekend
								</label>
							</div>
							<div className="flex items-center mr-[40px]">
								<label>
									<input
										type="radio"
										value="week"
										name="bookingType"
										className="mr-[10px]"
									/>{" "}
									A week
								</label>
							</div>
							<div className="flex items-center mr-[40px]">
								<label>
									<input
										type="radio"
										value="month"
										name="bookingType"
										className="mr-[10px]"
									/>{" "}
									A month
								</label>
							</div>
							<div className="flex items-center mr-[40px]">
								<label>
									<input
										type="radio"
										value="other"
										name="bookingType"
										className="mr-[10px]"
									/>{" "}
									Other
								</label>
							</div>
						</div>
					</div>
					 {/* Anpassat val för antal nätter om bokningstypen är "other" */}
					{bookingType === "other" && (
						<div className="flex items-center my-4 space-x-4">
							<label className="flex items-center border rounded-md px-2 py-1">
								<input
									type="number"
									min="1"
									value={customNights} // Sätter värdet av fältet till antalet nätter som användaren har angett
									onChange={handleCustomNightsChange} // Anropar "handleCustomNightsChange"-funktionen när användaren ändrar värdet
									className="w-12 text-center outline-none appearance-none border-none bg-white"
								/>
								{/* Visar "night" i singular eller plural beroende på värdet av customNights */}
								<span className="ml-1">
									night{customNights > 1 ? "s" : ""}
								</span>
							</label>
							<select
							    // Anger vilket alternativ som för närvarande är valt i dropdown-menyn
								value={startDay}

								// Anropar handleStartDayChange-funktionen när användaren väljer ett annat alternativ
								onChange={handleStartDayChange}
								className="border rounded-md px-2 py-1 outline-none bg-white"
							>
								<option>From Monday</option>
								<option>From Tuesday</option>
								<option>From Wednesday</option>
								<option>From Thursday</option>
								<option>From Friday</option>
								<option>From Saturday</option>
								<option>From Sunday</option>
							</select>
						</div>
					)}

					<h4 className="text-lg font-semibold">
						When do you want to go?
					</h4>
					<span className="text-sm my-6">Select up to 3 months</span>

					{/* Scrollbar för månadsväljare */}
					<div className="relative">
						<div className="grid grid-cols-3 gap-2 overflow-x-auto scrollbar-hide">
							<MonthSelector
							    // Skickar den valda månadslistan till MonthSelector-komponenten
								selectedMonths={selectedMonths}
								
								// Anropar "handleMonthSelection"-funktionen när användaren ändrar ett månadsval
								onMonthChange={handleMonthSelection}
							/>
						</div>
					</div>
					{/* Dynamisk text som visar valda alternativ */}
					<div>{getDynamicText()}</div>
				</div>
			)}

			{/* Bekräftelseknapp för att tillämpa valda datum */}
			<div className="flex justify-end mt-6">
				<Button
					buttonText={"Apply"}
					rounded={true}
					color="pink"
					onClick={() => props.onApply(startDate, endDate)}
				/>
			</div>
		</div>
	);
}


// Definierar prop-typer för CustomCalendarFlexible-komponenten
CustomCalendarFlexible.propTypes = {
	startDate: PropTypes.instanceOf(Date),
	endDate: PropTypes.instanceOf(Date),
	setStartDate: PropTypes.func.isRequired,
	setEndDate: PropTypes.func.isRequired,
	onApply: PropTypes.func.isRequired,
	closeCalendar: PropTypes.func.isRequired,
};

export default CustomCalendarFlexible;