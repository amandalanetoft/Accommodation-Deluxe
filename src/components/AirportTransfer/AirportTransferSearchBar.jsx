/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import LocationInput from "../LocationInput";
import DateSelection from "./DateSelection";
import TimeSelection from "./TimeSelection";
import PassengerSelection from "./PassengerSelection";
import Button from "../Button";
import dayjs from "dayjs";

// Komponent för att söka flygplatstransfer med enkel eller returresa
function AirportTransferSearchBar({ onSearch }) {
	// Definierar komponentens tillstånd med useState. "isReturn" håller reda på om det är en returbiljettsbokning (true) eller enkel resa (false). "searchData" är ett objekt som lagrar information för sökningen, inklusive startadress, destination, datum (standard är dagens datum), tid (standard är midnatt) och antal passagerare (standard är 1).
	const [isReturn, setIsReturn] = useState(false);
	const [searchData, setSearchData] = useState({
		fromLocation: "",
		toLocation: "",
		date: dayjs().format("YYYY-MM-DD"),
		time: "00:00",
		passengers: 1,
	});

	// Returnerar tillstånd för returbiljettsbokning med useState. "returnData" är ett objekt som lagrar information specifik för returresan, inklusive startadress, destination, datum (standard är dagens datum), tid (standard är midnatt) och antal passagerare (standard är 1). Detta används i kombination med "searchData" för att hantera både enkel och returbiljettbokning.
	const [returnData, setReturnData] = useState({
		fromLocation: "",
		toLocation: "",
		date: dayjs().format("YYYY-MM-DD"),
		time: "00:00",
		passengers: 1,
	});

	// Hanterar val av resans typ (enkel eller retur)
	const handleTripTypeChange = (event) => {
		setIsReturn(event.target.value === "return");
	};

	// Skickar sökdata till parent-komponent
	const handleSearch = () => {
		onSearch(searchData, isReturn ? returnData : null);
	};

	return (
		<div className="p-6 bg-secondaryLightBlue border border-accentPink shadow-lg rounded-lg w-[1200px] mx-auto">
			{/* Radioknappar för att välja enkel eller returresa */}
			<div className="mb-4 flex space-x-4">
				<label className="flex items-center">
					<input
						type="radio"
						name="tripType"
						value="oneway"
						checked={!isReturn}
						onChange={handleTripTypeChange}
						className="mr-2 custom-radio"
					/>
					One way
				</label>
				<label className="flex items-center">
					<input
						type="radio"
						name="tripType"
						value="return"
						checked={isReturn}
						onChange={handleTripTypeChange}
						className="mr-2 custom-radio"
					/>
					Return
				</label>
			</div>

			{/* Inmatningsfält för enkel eller returresa */}
			<div className="space-y-4">
				<div className="flex justify-between items-center space-x-2">
					{/* Används för att ange hämtadressen.  När användaren skriver i fältet uppdateras "fromLocation" i "searchData"-objektet med det aktuella värdet från inmatningen. "value-attributet" används för att binda inputfältet till "searchData.fromLocation", vilket gör att det alltid visar det senaste inmatade värdet.*/}
					<LocationInput
						placeholder="Enter the pickup address"
						onChange={(e) =>
							setSearchData({
								...searchData,
								fromLocation: e.target.value,
							})
						}
						value={searchData.fromLocation}
						size="airportTransferSearch"
					/>

					{/* Används för att ange avlämningsadressen.  När användaren skriver i fältet uppdateras "toLocation" i "searchData"-objektet med det aktuella värdet från inmatningen. "value-attributet" används för att binda inputfältet till "searchData.toLocation", vilket gör att det alltid visar det senaste inmatade värdet.*/}
					<LocationInput
						placeholder="Enter the drop-off address"
						onChange={(e) =>
							setSearchData({
								...searchData,
								toLocation: e.target.value,
							})
						}
						value={searchData.toLocation}
						size="airportTransferSearch"
					/>
					{/* Datumväljare som uppdaterar "searchData.date" när användaren ändrar datumet. "value"-bindning säkerställer att den visar det aktuella valda datumet.*/}
					<DateSelection
						onChange={(date) =>
							setSearchData({ ...searchData, date })
						}
						value={searchData.date}
						size="airportTransferSearch"
					/>

					{/* Tidsvalskomponent som uppdaterar "searchData.time" vid användarens val. "value"-bindning visar det aktuella valda tidsvärdet. */}
					<TimeSelection
						onTimeSelect={(time) =>
							setSearchData({ ...searchData, time })
						}
						value={searchData.time}
						size="airportTransferSearch"
					/>

					{/* Passagerarvalskomponent som uppdaterar searchData.passengers vid val av antal passagerare. "value"-bindningen visar det aktuella valda antalet passagerare.*/}
					<PassengerSelection
						onSelectPassenger={(passengers) =>
							setSearchData({ ...searchData, passengers })
						}
						value={searchData.passengers}
						size="airportTransferSearch"
					/>

					{/* Används för att visa  en tom div om det är en returresa; annars visas en sökknapp för enkelresa. Sökknappen anropar handleSearch-funktionen vid klick. */}
					{isReturn ? (
						<div className="w-[125px] h-[40px]"></div>
					) : (
						//sökknapp för enkelresa
						<Button
							size={"large"}
							buttonText={"Search"}
							onClick={handleSearch}
						/>
					)}
				</div>
				{/* Fält för returresa, om valt - Se därmed ovanstående kommenterar då det är samma koncept för följande*/}
				{isReturn && (
					<div className="flex justify-between items-center space-x-2">
						<LocationInput
							placeholder="Return from"
							onChange={(e) =>
								setReturnData({
									...returnData,
									fromLocation: e.target.value,
								})
							}
							value={returnData.fromLocation}
							size="airportTransferSearch"
						/>
						<LocationInput
							placeholder="Return to"
							onChange={(e) =>
								setReturnData({
									...returnData,
									toLocation: e.target.value,
								})
							}
							value={returnData.toLocation}
							size="airportTransferSearch"
						/>
						<DateSelection
							onChange={(date) =>
								setReturnData({ ...returnData, date })
							}
							value={returnData.date}
							size="airportTransferSearch"
						/>
						<TimeSelection
							onTimeSelect={(time) =>
								setReturnData({ ...returnData, time })
							}
							value={returnData.time}
							size="airportTransferSearch"
						/>
						<PassengerSelection
							onSelectPassenger={(passengers) =>
								setReturnData({ ...returnData, passengers })
							}
							value={returnData.passengers}
							size="airportTransferSearch"
						/>
						<Button
							size={"large"}
							buttonText={"Search"}
							onClick={handleSearch}
						/>
					</div>
				)}
			</div>
		</div>
	);
}

export default AirportTransferSearchBar;
