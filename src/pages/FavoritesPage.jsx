// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../components/Header";
import VerticalHotelCard from "../components/VerticalHotelCard";
import { useFavorites } from "../contexts/FavoritesContext";
import { useHotelData } from "../contexts/HotelDataContext";

//Komponent för de hotell som gillas/görs till favoriter
function Favorites() {

	// Hämtar favoriter från context
	const { favorites } = useFavorites();

	// Hämtar hotelldata från context
	const { hotels, error } = useHotelData();

	// Om hotelldata inte har laddats ännu, visa laddningsmeddelande
	if (!hotels || hotels.length === 0) {
		return <p>Loading hotels...</p>;
	}

	// Om det uppstår ett fel vid hämtning av hotell, visa felmeddelande
	if (error) {
		return <p>Error loading hotels: {error.message}</p>;
	}

	// Filtrera och mappa över favorithotell för att matcha med hotell som laddats
	const favoriteHotels = favorites
		.map((favorite) => hotels.find((hotel) => hotel.id === favorite.id))
		.filter((hotel) => hotel);

	return (
		<div>
			{/* Header och headertext, rubrik och informationstext */}
			<Header headingText="Favorites" size="medium" />
			<div className="text-center my-8">
				<h2 className="text-3xl font-bold">
					Your Liked Trips, All in One Place
				</h2>
				<p className="text-lg mt-2">
					Here you can find all your saved favorites in one place.
					Easily revisit and manage your top picks whenever you like.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-[80%] mx-auto">

				{/* Används för att kontrollera om det finns några favoriter och mappar sedan över favorithotell samt renderar VerticalHotelCard för repsketive*/}
				{favoriteHotels.length > 0 ? (
					favoriteHotels.map((hotel) => (
						<VerticalHotelCard
							key={hotel.id}
							hotelId={hotel.id}
							hotelName={hotel.name}
							imgUrl={hotel.imgUrl}
							city={hotel.location.city}
							country={hotel.location.country}
							description={hotel.description}
							rating={hotel.rating}
							startingFromPrice={hotel.starting_from_price}
						/>
					))
				) : (
					 // Meddelande om inga favoriter finns
					<p>No favorites added yet.</p>
				)}
			</div>
		</div>
	);
}

export default Favorites;
