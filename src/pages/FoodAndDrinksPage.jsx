/* eslint-disable no-unused-vars */
import React from "react";
import InfoBoxSpecificHotel from "../components/InfoBoxSpecificHotel";
// import RestaurantInfo from "../components/RestaurantInfo";
import RoomCardsSection from "../components/RoomCardsSection";
import useHotelDetails from "../hooks/useHotelDetails";


//Komponent för att visa detaljerad information om mat och dryck
function FoodAndDrinksPage() {

	 // Anropar hook för att hämta hotelldetaljer och hanterar laddning och fel
	  const { hotel, error, loading } = useHotelDetails();

		// Hanterar laddning, fel och inte hittat tillstånd
		if (loading) {
			return <p>Loading hotel data...</p>;
		}
		if (error) {
			return <p>Error loading hotel data: {error.message}</p>;
		}
		if (!hotel) {
			return <p>Hotel not found.</p>;
	}
	
    // Hämtar värden från hotel.restaurant.infoBox för att skapa informationsinnehåll
	const infoBoxContent = {
		title: hotel.restaurant.infoBox.title,
		description: hotel.restaurant.infoBox.description,
		optionsTitle: hotel.restaurant.infoBox.optionsTitle,
		extraInformation: hotel.restaurant.infoBox.extraInformation,
	};


	return (
		<div>
			{/* Rubrik och informationstext */}
			<div className="w-[85%] mx-auto mt-8">
				<div className="flex justify-between w-[85%] mx-auto mt-8">
					<div className="w-[70%] pr-8">
						<h2 className="text-[32px] font-bold mb-4">
							{hotel.restaurant.headingText}
						</h2>
						<p className="text-[16px] text-black mb-4">
							{hotel.restaurant.introParagraph}
						</p>

						<div className="w-[100%]">
							<div className="flex space-x-4 mb-6">
								{/* Bilder - den första bilden sätts till bredden 50% */}
								<img
									src={hotel.restaurant.images[0]} 
									alt="Main Image"
									className="w-1/2 h-[300px] rounded-lg shadow"
								/>
								{/* Bilder - de andra två bilderna fyller resterande utrymmeGer */}
								<div className="flex flex-col space-y-4 w-1/2">
									<img
										src={hotel.restaurant.images[1]} 
										alt="Image 2"
										className="w-full h-[145px] rounded-lg shadow"
									/>
									<img
										src={hotel.restaurant.images[2]}
										alt="Image 3"
										className="w-full h-[145px] rounded-lg shadow"
									/>
								</div>
							</div>
						</div>

						{/* Endast rendera sektioner om det finns några. Kontrollera om sektioner finns och mappar över sektionerna */}
						{hotel.restaurant.sections.length > 0 ? (
							hotel.restaurant.sections.map((item, index) => (
								<div key={index} className="mb-6">
									<h3 className="text-[20px] font-bold text-black mb-2">
										{item.title}
									</h3>
									<p className="text-[16px] text-black">
										{item.description}
									</p>
								</div>
							))
						) : (
							 // Meddelande om inga sektioner finns
							<p>No restaurant info available at this hotel.</p>
							
						)}
					</div>

					{/* Rendera informationsrutan om hotellet. Passerar all information från infoBoxContent.*/}
					<InfoBoxSpecificHotel
						{...infoBoxContent} 
					/>
				</div>
			</div>
			<div>
				{/* Sektion för rumskort */}
				<RoomCardsSection />
			</div>
		</div>
	);
}

export default FoodAndDrinksPage;
