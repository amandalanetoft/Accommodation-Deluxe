// RatingFilter.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
function RatingFilter({ setFilters }) {
  const [selectedRatings, setSelectedRatings] = useState([]);

  // Funktion för att växla betyg lägga till/ta bort
  const toggleRating = (rating) => {

	//Används för att undersöka om ett visst betyg är valt och lagrar resultatet (true eller false) i variabeln newRatings.
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating) // Tar bort om det redan finns
      : [...selectedRatings, rating]; // Lägger till om det saknas
    setSelectedRatings(newRatings); // Uppdaterar valt betyg
    setFilters((prev) => ({ ...prev, rating: newRatings })); // Uppdaterar filtret i överordnad komponent
};


  return (
		<div>
			<div className="p-4 max-w-sm">
				<div className="flex w-full items-center -mx-3 pb-4">
					<h3 className="text-lg font-semibold">Rating</h3>
				</div>
				{/* Används för att skapa en lista med kryssrutor för att välja betyg, där varje kryssruta representerar ett betyg från 5 till 1, och den hanterar användarens val genom att använda en funktion som togglar betyget i en lista */}
				<div className="space-y-3">
					{[5, 4, 3, 2, 1].map((rating) => (
						<label key={rating} className="flex items-center">
							<input
								type="checkbox"
								className="mr-2 w-4 h-4"
								checked={selectedRatings.includes(rating)}
								onChange={() => toggleRating(rating)}
							/>
							{/* Används för att skapa en rad med stjärnor för att visualisera ett betyg. Antalet stjärnor som visas baseras på värdet av variabeln rating.*/}
							<div className="flex space-x-1 text-primaryDarkBlue">
								{[...Array(rating)].map((_, index) => (
									<FontAwesomeIcon
										key={index}
										icon={faStar}
									/>
								))}
							</div>
						</label>
					))}
				</div>
			</div>
		</div>
  );
}  

export default RatingFilter;