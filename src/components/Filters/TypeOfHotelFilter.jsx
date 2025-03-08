// TypeOfHotelFilter.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
function TypeOfHotelFilter({ setFilters }) {
	const [selectedTypes, setSelectedTypes] = useState([]); // Håller valda typer av hotell

	// Funktion för att lägga till/ta bort en hotelltyp
	const toggleType = (type) => {

		// Kolla om den valda typen redan finns i listan över valda typer
		const newTypes = selectedTypes.includes(type)
			? selectedTypes.filter((t) => t !== type) // Ta bort om den redan finns
			: [...selectedTypes, type];
		setSelectedTypes(newTypes); // Uppdatera det lokala tillståndet med den nya listan av valda typer
		setFilters((prev) => ({ ...prev, typeOfHotel: newTypes })); // Uppdatera filtret i den överordnade komponenten med den nya listan av hotelltyper
	};

	return (
		<div>
			<div className="p-4 max-w-sm">
				<div className="flex w-full items-center -mx-3 pb-4">
					<h3 className="text-lg font-semibold">Type of hotel</h3>
				</div>
				{/* Checkbox för vardera hotelltyp */}
				<div className="space-y-3">
					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedTypes.includes("family_friendly")} // Kontrollera om typen är vald
							onChange={() => toggleType("family_friendly")} // Anropa toggleType för att lägga till/ta bort typen
						/>
						<span className="text-sm">Family hotels</span>
					</label>
					
					{/*Samma koncept osm för ovanstående */}
					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedTypes.includes("adult_only")}
							onChange={() => toggleType("adult_only")}
						/>
						<span className="text-sm">Adult hotels</span>
					</label>
				</div>
			</div>
			<div className="border-b border-grey -mx-4"></div>
		</div>
	);
}

export default TypeOfHotelFilter;

