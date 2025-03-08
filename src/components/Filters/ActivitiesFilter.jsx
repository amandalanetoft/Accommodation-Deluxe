// ActivitiesFilter.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

// eslint-disable-next-line react/prop-types
function ActivitiesFilter({ setFilters }) {
	const [selectedActivities, setSelectedActivities] = useState([]);

	// Funktion för att lägga till eller ta bort en aktivitet från listan av aktiviteter
	const toggleActivity = (activity) => {
		// Används för att skapa en ny lista med aktiviteter; om 'activity' redan är vald, tas den bort från 'selectedActivities', annars läggs den till i listan.
		const newActivities = selectedActivities.includes(activity)
			? selectedActivities.filter((a) => a !== activity)
			: [...selectedActivities, activity];

		// Uppdatera valda aktiviteter
		setSelectedActivities(newActivities);

		// Skickar uppdaterade filter till föräldrakomponenten
		setFilters((prev) => ({ ...prev, activities: newActivities }));
	};

	return (
		<div>
			<div className="p-4 max-w-sm">
				{/* Titel för aktivitetsfiltren */}
				<div className="flex w-full items-center -mx-3 pb-4">
					<h3 className="text-lg font-semibold">Activities</h3>
				</div>
				{/* "Checkboxes" för de olika aktiviteterna; varje checkbox representerar en aktivitet och hanterar sin valstatus */}
				<div className="space-y-3">
					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedActivities.includes("yoga")} // Kontrollerar om aktiviteten "yoga" är vald
							onChange={() => toggleActivity("yoga")} // Anropar funktionen för att växla valstatus för "yoga"
							/>
						/>
						<span className="text-sm">Yoga</span>
					</label>
					
					{/*Samma koncept som för ovanstående "checkbox" */}
					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedActivities.includes("hiking")}
							onChange={() => toggleActivity("hiking")}
						/>
						<span className="text-sm">Suitable for hiking</span>
					</label>

					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedActivities.includes("gym")}
							onChange={() => toggleActivity("gym")}
						/>
						<span className="text-sm">Gym</span>
					</label>

					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedActivities.includes(
								"childrens_club"
							)}
							onChange={() => toggleActivity("childrens_club")}
						/>
						<span className="text-sm">Children&apos;s club</span>
					</label>

					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedActivities.includes("spa")}
							onChange={() => toggleActivity("spa")}
						/>
						<span className="text-sm">Spa</span>
					</label>

					<label className="flex items-center">
						<input
							type="checkbox"
							className="mr-2 w-4 h-4"
							checked={selectedActivities.includes("pool")}
							onChange={() => toggleActivity("pool")}
						/>
						<span className="text-sm">Pool</span>
					</label>
				</div>
			</div>
			{/* Avgränsare längst ner i filtret */}
			<div className="border-b border-grey -mx-4"></div>
		</div>
	);
}

export default ActivitiesFilter;
