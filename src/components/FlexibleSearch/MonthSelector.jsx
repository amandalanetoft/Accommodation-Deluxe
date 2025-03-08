// eslint-disable-next-line no-unused-vars
import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarAlt,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Funktion för att generera de kommande 12 månaderna som en array
function generateNextTwelveMonths() {
	const months = [];
	const startMonth = dayjs(); // Startmånad är nuvarande månad

	// Loopar över de kommande 12 månaderna och läggeer till dem i arrayen months
	for (let i = 0; i < 12; i++) {
		const month = startMonth.add(i, "month");
		months.push({
			name: month.format("MMM"), // ex 'Oct'
			year: month.format("YYYY"), // ex '2024'
			full: month.format("MMM YYYY"),
		});
	}

	return months;
}

function MonthSelector(props) {
	// Tar emot selectedMOnths och onMonthChange som props
	const selectedMonths = props.selectedMonths;
	const onMonthChange = props.onMonthChange;

	const months = generateNextTwelveMonths(); // Genererar en lista med de kommande 12 månaderna
	const scrollContainerRef = useRef(null); // Referens till den scrollbara container för att hantera scroll
	const [isScrolledToStart, setIsScrolledToStart] = useState(true); // Om scrollen är i början
	const [isScrolledToEnd, setIsScrolledToEnd] = useState(false); // Om scrollen är i slutet
    // Funktion för att scrolla till vänster om den vänstra knappen klickas
	const handlePrevClick = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({
				left: -100,
				behavior: "smooth",
			});
		}
	};

	// Funktion för att scrolla till höger när högra knappen klickas
	const handleNextClick = () => {
		if (scrollContainerRef.current) {
			scrollContainerRef.current.scrollBy({
				left: 100,
				behavior: "smooth",
			});
		}
	};

	// Uppdaterar navigeringsknappars synlighet baserat på scroll-position
	useEffect(() => {

		// Referens till scrollbehållaren
		const scrollContainer = scrollContainerRef.current;

		// Funktion för att hantera scrollningen
		const handleScroll = () => {
			// Kontrollerar om scrollbehållaren existerar
			if (scrollContainer) {
				// Hämtar scrollposition och storlek
				const { scrollLeft, scrollWidth, clientWidth } =
					scrollContainer;
				// Sätter tillstånd för att indikera om vi är vid början
				setIsScrolledToStart(scrollLeft <= 0);
				// Sätter tillstånd för att indikera om vi är vid slutet
				setIsScrolledToEnd(scrollLeft + clientWidth >= scrollWidth);
			}
		};

		// Kollar om scrollbehållaren existerar
		if (scrollContainer) {
			scrollContainer.addEventListener("scroll", handleScroll); // Lägger till en lyssnare för scroll-händelser
			// Anropar "handleScroll" för att kontrollera den aktuella scrollpositionen
			handleScroll();
		}

		// Retur av en städningsfunktion när komponenten avmonteras
		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener("scroll", handleScroll);
			}
		};
	}, []);
	
	// Funktion för att lägga till/ta bort månad från listan selectedMonths
	const toggleMonth = (month) => {
		let newSelectedMonths = [];
		if (selectedMonths.includes(month)) {
			// Om månaden redan är vald, ta bort den från listan
			newSelectedMonths = selectedMonths.filter((m) => m !== month);
		} else if (selectedMonths.length < 3) {
			// Om månaden inte är vald och mindre än 3 månader är valda, lägg till den i listan
			newSelectedMonths = [...selectedMonths, month];
		} else {
			newSelectedMonths = [...selectedMonths]; // Uppdaterar valda månader i föräldrakomponenten
		}
		onMonthChange(newSelectedMonths);
	};

	return (
		<div className="relative my-3 w-[700px]">
			{/* Används i de fall användaren inte har rullat till början. Då visas en knapp för att gå till föregående innehåll med en ikon; */}
			{!isScrolledToStart && (
				<button
					onClick={handlePrevClick}
					className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white border border-grey rounded-full w-10 h-10 flex items-center justify-center shadow-md"
				>
					<FontAwesomeIcon icon={faChevronLeft} />
				</button>
			)}

			<div
				ref={scrollContainerRef}
				className="flex overflow-x-auto space-x-4 scrollbar-hide"
			>
				{/* Används för att i terera genom varje månad i months-arrayen. Skapa en unik nyckel för varje månad baserat på namn och år. Kontrollera om månaden är vald*/}
				{months.map((month, index) => {
					const monthKey = `${month.name} ${month.year}`;
					const isSelected = selectedMonths.includes(monthKey);
					return (

						
						<button
							key={index}
							// Anropar funktionen toggleMonth för att välja eller avmarkera månaden baserat på den unika månadsnyckeln
							onClick={() => toggleMonth(monthKey)} 

							// Inaktiverar knappen om den aktuella månaden inte är vald och tre eller fler månader redan är valda
							disabled={!isSelected && selectedMonths.length >= 3}

							// Om vald, ge knappen en rosa kant och bakgrund med "cursor" som indikerar klickbarhet; om tre eller fler månader är valda, använd inaktiverad stil med grå kant och bakgrund samt "cursor" som visar att den inte kan klickas; annars använd standardstil för ovalda månader med vit bakgrund och "cursorn" som indikerar klickbarhet.
							className={`border-2 rounded-md p-4 text-center min-w-[80px] flex flex-col items-center ${
								isSelected
									? "border-accentPink bg-hoverColorLightPink cursor-pointer"
									: selectedMonths.length >= 3
									? "border-grey bg-grey cursor-not-allowed opacity-50"
									: "border-grey bg-white cursor-pointer"
							}`}
						>

							{/*Används för att visa en kalenderikon */}
							<FontAwesomeIcon
								icon={faCalendarAlt}
								className="text-lg mb-1"
							/>
							{/*Används för att visa månadens namn */}
							<span className="text-sm">{month.name}</span> 
							
							{/*Används för att visa månadens år */}
							<span className="text-xs">{month.year}</span>
						</button>
					);
				})}
			</div>

			{/* Används i de fall användaren inte har rullat till slutet. Då visas en knapp för att gå till nästa innehåll med en ikon; knappen är placerad till höger, centrerad vertikalt, med en vit bakgrund, ljusgrå kant, rundad form och skugga för att ge en upphöjd effekt. */}
			{!isScrolledToEnd && (
				<button
					onClick={handleNextClick}
					className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white border border-lightGrey rounded-full w-10 h-10 flex items-center justify-center shadow-md"
				>
					<FontAwesomeIcon icon={faChevronRight} />
				</button>
			)}
		</div>
	);
}

//Proptyper för vaildering
MonthSelector.propTypes = {
	selectedMonths: PropTypes.arrayOf(PropTypes.string).isRequired,
	onMonthChange: PropTypes.func.isRequired,
};

export default MonthSelector;
