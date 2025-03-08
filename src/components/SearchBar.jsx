// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import GuestSelector from "./GuestSelector";
import CustomCalendarFlexible from "./FlexibleSearch/CustomCalendarFlexible";
import dayjs from "dayjs";
import LocationInput from "./LocationInput";
import { useNavigate } from "react-router-dom";
import { useHotelData } from "../contexts/HotelDataContext";
import { useSearchParamsContext } from "../contexts/SearchParamsContext";
function SearchBar({
	onSearch,
	initialLocation,
	initialStartDate,
	initialEndDate,
	initialAdults,
	initialChildren,
	initialRooms,
	initialIsNextToEachOther,
}) {
    // Definierar state för sökkriterier baserat på de initiala värdena som skickas som props
	const [location, setLocation] = useState(initialLocation);
	const [startDate, setStartDate] = useState(initialStartDate);
	const [endDate, setEndDate] = useState(initialEndDate);
	const [adults, setAdults] = useState(initialAdults);
	const [children, setChildren] = useState(initialChildren);
	const [rooms, setRooms] = useState(initialRooms);
	const [isNextToEachOther, setIsNextToEachOther] = useState(
		initialIsNextToEachOther
	);
	const { hotels } = useHotelData(); //Hämta hotellinformationen från kontexten
	const { setSearchParams } = useSearchParamsContext(); // Sätter de globala sökparametrarna

	// State för att hantera visning av kalender och gästväljare
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [isGuestSelectorOpen, setIsGuestSelectorOpen] = useState(false);
	const [locationSuggestions, setLocationSuggestions] = useState([]);

	// Funktion för att toggla visning av gästväljare
	const toggleGuestSelector = () => {
		setIsGuestSelectorOpen(!isGuestSelectorOpen);
	};
	// Funktion för att toggla visning av kalender
	const toggleCalendar = () => {
		setIsCalendarOpen(!isCalendarOpen);
	};

	// Funktion för att hantera valet av datum i kalendern
	const handleApply = (selectedStartDate, selectedEndDate) => {
		setStartDate(selectedStartDate);
		setEndDate(selectedEndDate);
		setIsCalendarOpen(false); // Stänger kalendern efter att ha tillämpat datumet
	};

	// Hanterar förändringar i platsinmatning och genererar förslag
	const handleLocationChange = (e) => {
		const inputValue = e.target.value;
		setLocation(inputValue);

		if (inputValue.length > 0) {
			// Filtrerar hotell baserat på inmatad plats för att ge relevanta förslag
			const suggestions = hotels
				.map((hotel) => hotel.location)
				.filter(
					(loc) =>
						loc.country
							.toLowerCase()
							.startsWith(inputValue.toLowerCase()) ||
						loc.city
							.toLowerCase()
							.startsWith(inputValue.toLowerCase())
				);
            // Genererar förslag
			setLocationSuggestions([
				...new Set(
					suggestions.map((loc) => `${loc.city}, ${loc.country}`)
				),
			]);
		} else {
			setLocationSuggestions([]);
		}
	};

	// Hanterar val av plats från förslagsmenyn
	const handleLocationSelect = (suggestion) => {
		setLocation(suggestion);
		setLocationSuggestions([]); //Rensar förslag efter val
	};

	const navigate = useNavigate();

	// Funktion för att hantera klick på sökknappen
	const handleSearch = () => {
		//Kontrollerar om något av fälten är tomma eller om vuxna/rum är 0
		if (
			!location ||
			!startDate ||
			!endDate ||
			adults === 0 ||
			rooms === 0
		) {
			{
				/*Om något fält saknas eller har felaktigt värde, visa en varning till användaren*/
			}
			alert("Please fill in all fields before searching.");
			return; // Stoppa vidare exekvering av funktionen om inte alla fälten är korrekt ifyllda
		}

		// Sätter de globala sökparametrarna i sammanhanget
		setSearchParams({
			location,
			startDate,
			endDate,
			adults,
			children,
			rooms,
			isNextToEachOther,
		});

		// Konstruerar en sökfråga med alla relevanta parametrar
		const params = new URLSearchParams({
			location,
			checkin: dayjs(startDate).format("YYYY-MM-DD"),
			checkout: dayjs(endDate).format("YYYY-MM-DD"),
			adults: adults.toString(),
			children: children.toString(),
			rooms: rooms.toString(),
			isNextToEachOther: isNextToEachOther.toString(),
		});

		// Filtrerar hotell baserat på vald stad och land
		const [selectedCity, selectedCountry] = location
			.split(", ")
			.map((s) => s.trim());
		const results = hotels.filter(
			(hotel) =>
				hotel.location.city.toLowerCase() ===
					selectedCity.toLowerCase() &&
				hotel.location.country.toLowerCase() ===
					selectedCountry.toLowerCase()
		);

		// Anropar onSearch-funktionen om den är tillgänglig och skickar resultaten
		if (typeof onSearch === "function") {
			onSearch({
				results,
				startDate,
				endDate,
				adults,
				children,
				rooms,
				isNextToEachOther,
			});
		}

		// Navigerar till /hotels-sidan med alla sökparametrar
		navigate(`/hotels?${params.toString()}`);
	};

	return (
		<div className="bg-secondaryLightBlue p-4 rounded-lg shadow-lg flex justify-between mx-auto max-w-[1400px] px-20 space-x-9 border border-accentPink">
			{/* Platsinmatning */}
			<div className="flex items-center rounded-lg shadow-md relative">
				<LocationInput
					placeholder="Where do you want to go?"
					onChange={handleLocationChange}
					value={location}
					size="mainSearch"
				/>
				{/* Visar platsförslag som en dropdown-lista */}
				{locationSuggestions.length > 0 && (
					<div className="absolute top-full bg-white shadow-md rounded-lg w-full mt-1 z-10">
						{" "}
						{locationSuggestions.map((suggestion, index) => (
							<div
								key={index}
								onClick={() => handleLocationSelect(suggestion)}
								className="p-2 hover:bg-grey cursor-pointer"
							>
								{suggestion}
							</div>
						))}
					</div>
				)}
			</div>
			{/* datumval - Check-in / Check-out */}
			<div className="relative">
				<div
					onClick={toggleCalendar}
					className="flex items-center bg-white p-3 rounded-lg shadow-md space-x-3 cursor-pointer"
				>
					<FontAwesomeIcon
						icon={faCalendarAlt}
						className="text-black size-5"
					/>
					<span>
						{startDate && endDate
							? `${dayjs(startDate).format(
									"YYYY-MM-DD"
							  )} - ${dayjs(endDate).format("YYYY-MM-DD")}`
							: "Check-in / check-out"}
					</span>
				</div>

				{/* Kalender visas bara om isCalendarOpen är true */}
				{isCalendarOpen && (
					<div className="absolute top-12 left-0 z-50">
						<CustomCalendarFlexible
							startDate={startDate}
							setStartDate={setStartDate}
							endDate={endDate}
							setEndDate={setEndDate}
							onApply={handleApply} 
							closeCalendar={toggleCalendar} // stänger kallendern
						/>
					</div>
				)}
			</div>
			{/* Gästinmatning */}
			<div className="relative">
				<div
					onClick={toggleGuestSelector}
					className="flex items-center bg-white p-3 rounded-lg shadow-md space-x-3 cursor-pointer"
				>
					<FontAwesomeIcon
						icon={faUserGroup}
						className="text-black size-5"
					/>
					<span>
						{`${adults} ${
							adults === 1 ? "adult" : "adults"
						}, ${children} ${
							children === 1 ? "child" : "children"
						}, ${rooms} ${rooms === 1 ? "room" : "rooms"}`}
					</span>
				</div>

				{/* Gästväljare visas bara om isGuestSelectorOpen är true */}
				{isGuestSelectorOpen && (
					<div className="absolute top-12 left-0 z-50">
						<GuestSelector
							adults={adults}
							setAdults={setAdults}
							numChildren={children}
							setChildren={setChildren}
							rooms={rooms}
							setRooms={setRooms}
							isNextToEachOther={isNextToEachOther}
							setIsNextToEachOther={setIsNextToEachOther}
						/>
					</div>
				)}
			</div>

			{/* Sökknapp */}
			<Button size="large" buttonText={"Search"} onClick={handleSearch} />
		</div>
	);
}

export default SearchBar;

// Prop-typer för att säkerställa korrekt typ och struktur av props
SearchBar.propTypes = {
	onSearch: PropTypes.func.isRequired,
	initialLocation: PropTypes.string,
	initialStartDate: PropTypes.string,
	initialEndDate: PropTypes.string,
	initialAdults: PropTypes.number,
	initialChildren: PropTypes.number,
	initialRooms: PropTypes.number,
	initialIsNextToEachOther: PropTypes.number,
};

// Standardvärden för de initiala props med dynamiska datum
SearchBar.defaultProps = {
	initialLocation: "",
	initialStartDate: dayjs().format("YYYY-MM-DD"), // Dagens datum
	initialEndDate: dayjs().add(1, "day").format("YYYY-MM-DD"), // Morgondagens datum
	initialAdults: 2,
	initialChildren: 0,
	initialRooms: 1,
	initialIsNextToEachOther: 0,
};





