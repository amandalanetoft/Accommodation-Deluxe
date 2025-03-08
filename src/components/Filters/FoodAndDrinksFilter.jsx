/* eslint-disable no-unused-vars */
// FoodAndDrinksFilter.jsx
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
function FoodAndDrinksFilter({ setFilters }) {
	const [selectedOptions, setSelectedOptions] = useState([]);
	// Funktion för att toggla ett alternativs urval
	const toggleOption = (option) => {
		const newOptions = selectedOptions.includes(option)
			? selectedOptions.filter((o) => o !== option) // Tar bort alternativet om det redan är valt
			: [...selectedOptions, option]; // Lägger till alternativet om det inte redan är valt
		setSelectedOptions(newOptions); // Uppdaterar de valda alternativen
		setFilters((prev) => ({ ...prev, foodAndDrinks: newOptions })); // Uppdaterar huvudfiltren genom att skicka med de valda alternativen
	};

	return (
		<div>
			<div className="p-4 max-w-sm">
				<div className="flex w-full items-center -mx-3 pb-4">
					<h3 className="text-lg font-semibold">Food & drinks</h3>
				</div>
				{/* Valbara alternativ */}
				<div className="space-y-3">
					{/*Del för "all inclusive" */}
					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedOptions.includes("all_inclusive")} // Kontrollerar om alternativet "All Inclusive" är valt
							onChange={() => toggleOption("all_inclusive")} // Anropar toggleOption för att växla valet
						/>
						<span className="text-sm">All Inclusive</span>
					</label>
					
					{/*Samma koncept för följande som för den första */}
					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedOptions.includes(
								"breakfast_included"
							)}
							onChange={() => toggleOption("breakfast_included")}
						/>
						<span className="text-sm">Breakfast included</span>
					</label>

					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedOptions.includes(
								"half_board_included"
							)}
							onChange={() => toggleOption("half_board_included")}
						/>
						<span className="text-sm">Half board included</span>
					</label>

					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedOptions.includes("restaurant")}
							onChange={() => toggleOption("restaurant")}
						/>
						<span className="text-sm">Restaurant</span>
					</label>
				</div>
			</div>
			<div className="border-b border-grey -mx-4"></div>
		</div>
	);
}

export default FoodAndDrinksFilter;


