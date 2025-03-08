// HotelsPage.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useHotelData } from "../contexts/HotelDataContext"; 
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParamsContext } from "../contexts/SearchParamsContext";
import SearchBar from "../components/SearchBar";
import HorizontalHotelCard from "../components/HorizontalHotelCard";
import Header from "../components/Header";
import FilterContainer from "../components/Filters/FilterContainer";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD"); //Dagens datum
const tomorrow = dayjs().add(1, "day").format("YYYY-MM-DD"); //Morgondagens datum

function HotelsPage() {
	const { search } = useLocation(); // Hämta sökparametrar från URL
	const { hotels, offers, error } = useHotelData(); // Hämta hotell- och erbjudandedata från hoteldata kontexten
	const navigate = useNavigate();
	const { searchParams, setSearchParams } = useSearchParamsContext();
	const [filteredHotels, setFilteredHotels] = useState([]); // State för att hålla filtrerade hotell
	const [filters, setFilters] = useState({
		rating: [],
		price: [0, 500],
		typeOfHotel: [],
		activities: [],
		foodAndDrinks: [],
	});

	// Defaultvärden för sökparametrar om inga parametrar anges
	const defaultSearchParams = {
		location: "",
		startDate: today,
		endDate: tomorrow,
		adults: 2,
		children: 0,
		rooms: 1,
	};

	// useEffect körs varje gång search, setSearchParams, hotels eller filters ändras
	useEffect(() => {
		const params = new URLSearchParams(search); // Hämtar sökparametrar från URL
		const destinationId = params.get("destinationId"); // Hämtar destinationens ID om det finns
		const location = params.get("location") || defaultSearchParams.location; // Hämtar plats eller använder standardvärde
		const checkin = params.get("checkin") || defaultSearchParams.startDate; // Hämtar incheckningsdatum eller använder standardvärde
		const checkout = params.get("checkout") || defaultSearchParams.endDate; // Hämtar utcheckningsdatum eller använder standardvärde
		const adults =
			parseInt(params.get("adults")) || defaultSearchParams.adults;
		const children =
			parseInt(params.get("children")) || defaultSearchParams.children;
		const rooms =
			parseInt(params.get("rooms")) || defaultSearchParams.rooms;

		// Sätter sökparametrarna i kontexten
		setSearchParams({
			location,
			startDate: checkin,
			endDate: checkout,
			adults,
			children,
			rooms,
		});

		// Filtrerar hotellen baserat på valda filter
		if (hotels && hotels.length > 0) {
			let results = hotels;

			// Filtrerar på destinationId om det finns, annars används location
			if (destinationId) {
				results = results.filter(
					(hotel) => hotel.destinationId === parseInt(destinationId)
				);
			} else if (location) {
				results = results.filter((hotel) => {
					const hotelLocation =
						`${hotel.location.city}, ${hotel.location.country}`.toLowerCase();
					return hotelLocation.includes(location.toLowerCase());
				});
			}

			// Filtrering på pris
			results = results.filter(
				(hotel) =>
					hotel.pricePerNight >= filters.price[0] &&
					hotel.pricePerNight <= filters.price[1]
			);

			// Filtrering på betyg
			if (filters.rating.length) {
				results = results.filter((hotel) =>
					filters.rating.includes(Math.round(hotel.rating))
				);
			}

			// Filtrering på hotelltyp
			if (filters.typeOfHotel.length) {
				results = results.filter((hotel) =>
					filters.typeOfHotel.includes(hotel.typeOfHotel)
				);
			}

			// Filtrering på aktiviteter
			if (filters.activities.length) {
				results = results.filter(
					(hotel) =>
						Array.isArray(hotel.activities?.categories) &&
						filters.activities.every((activity) =>
							hotel.activities.categories.some(
								(category) =>
									category.name &&
									category.name.toLowerCase().trim() ===
										activity.toLowerCase().trim()
							)
						)
				);
			}
			// Filtrering på Mat/dryck alternativ
			try {
				if (filters.foodAndDrinks.length) {
					results = results.filter((hotel) =>
						filters.foodAndDrinks.every((food) => {
							// Kollar om foodfilter finns och satt till true i hotelobjektet
							return (
								hotel.foodFilter &&
								hotel.foodFilter[food] === true
							);
						})
					);
				}
			} catch (error) {
				alert(error);
			}

			setFilteredHotels(results);
		}
	}, [search, setSearchParams, hotels, filters]);
    // Funktion för att hantera sökning och navigera till sökresultat
	const handleSearch = ({
		location,
		startDate,
		endDate,
		adults,
		children,
		rooms,
	}) => {
		// Skapar sökparametrar för URL
		const params = new URLSearchParams({
			location,
			checkin: startDate,
			checkout: endDate,
			adults: adults.toString(),
			children: children.toString(),
			rooms: rooms.toString(),
		});
		// Navigerar till sökresultatssidan med de nya parametrarna
		navigate(`/hotels?${params.toString()}`);
	};
	// Returnerar felmeddelande om något fel uppstått under datahämtningen
	if (error) {
		return (
			<p className="text-center text-accentPink">
				Error loading hotels: {error.message}
			</p>
		);
	}

	return (
		<div>
			<div className="relative">
				<Header headingText="Hotels" size="medium" />
				{/* Sökfältet för att söka efter hotell */}
				<div className="absolute bottom-[-50px] w-full flex justify-center">
				{/*Sätter initialvärden för SearchBar-komponentens parametrar, baserat på antingen searchParams eller defaultSearchParams*/}
					<SearchBar
						onSearch={handleSearch}
						initialLocation={
							searchParams.location ||
							defaultSearchParams.location
						}
						initialStartDate={
							searchParams.startDate ||
							defaultSearchParams.startDate
						}
						initialEndDate={
							searchParams.endDate || defaultSearchParams.endDate
						}
						initialAdults={
							searchParams.adults || defaultSearchParams.adults
						}
						initialChildren={
							searchParams.children ||
							defaultSearchParams.children
						}
						initialRooms={
							searchParams.rooms || defaultSearchParams.rooms
						}
					/>
				</div>
			</div>
			<div className="flex justify-center pt-[100px]">
				<div className="mr-8">
					<FilterContainer setFilters={setFilters} />
				</div>
				{/* Sektion för att rendera hotellkort baserat på sökning/ filter */}
				<div className="flex flex-col gap-y-8">
					{filteredHotels && filteredHotels.length > 0 ? (
						// Om hotel finns renderas ett HorizontalHotelCard för varje hotell som hittas efter filtreringen
						filteredHotels.map((hotel) => {
							// Kontrollerar om det finns ett matchande offer i hotellet
							const offer = offers.find(
								(o) => o.hotelId === hotel.id
							);
							return (
								<HorizontalHotelCard
									key={hotel.id}
									hotel={hotel}
									showDiscountedPrice={!!offer}
									discountedPrice={
										offer ? offer.discountedPrice : null
									}
								/>
							);
						})
					) : (
						// Meddelande som visas om inga hotell matchar filtreringskriterierna
						<p className="text-center">
							No hotels found matching the criteria.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default HotelsPage;
