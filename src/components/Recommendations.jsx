// eslint-disable-next-line no-unused-vars
import React from "react";
import VerticalHotelCard from "./VerticalHotelCard";
import { useHotelData } from "../contexts/HotelDataContext";

// Recommendations-komponent för att visa rekommenderade hotellkort
function Recommendations() {
	const { hotels } = useHotelData();

	// Kontrollerar att hotelldata finns
	if (!hotels || hotels.length === 0) {
		return <p>Loading recommendations...</p>;
	}

	// Väljer de första fyra hotellen
	const recommendedHotels = hotels.slice(0, 4);

	return (
		<div className="my-16 px-8">
			<h2 className="text-3xl font-bold mb-2">Recommendations</h2>
			<p className="text-lg text-shadyBlack mb-6">
				Handpicked Suggestions for Your Perfect Stay
			</p>

			{/* Hotel Cards */}
			<div className="flex justify-between gap-6">
				{/* Itererar över arrayen recommendedHotels och renderar ett verticalhotelcard för varje hotell */}
				{recommendedHotels.map((hotel) => (
					<VerticalHotelCard
						key={hotel.id}
						hotelId={hotel.id}
						hotelName={hotel.name}
						imgUrl={hotel.imgUrl}
						city={hotel.location.city}
						country={hotel.location.country}
						description={hotel.description}
						rating={hotel.rating}
						startingFromPrice={`Starting from: €${hotel.startingFromPrice}`}
					/>
				))}
			</div>
		</div>
	);
}

export default Recommendations;
