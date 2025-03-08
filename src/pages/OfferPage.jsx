/* eslint-disable react/no-children-prop */
/* eslint-disable no-unused-vars */
// OffersPage.jsx
import React, { useEffect, useState } from "react";
import { useHotelData } from "../contexts/HotelDataContext";
import { useSearchParamsContext } from "../contexts/SearchParamsContext";
import HorizontalHotelCard from "../components/HorizontalHotelCard";
import Header from "../components/Header";

function OffersPage() {
	// Hämtar hotellsdata och sökparametrar från kontext
	const { hotels } = useHotelData();
	const { searchParams } = useSearchParamsContext();
	// Definierar state för att lagra hotell som har rabatterade priser
	const [discountedHotels, setDiscountedHotels] = useState([]);

	useEffect(() => {
		// Loopar genom hotellen för att skapa en lista av rabatterade hotell
		const discounted = hotels.map((hotel) => ({
			...hotel,
			discountedPrice: Math.round(hotel.pricePerNight * 0.85), // 15% rabatt
		}));
		// Uppdaterar state med rabatterade hotell
		setDiscountedHotels(discounted);
	}, [hotels]);

	return (
		<div>
			<Header headingText="Special Offers" size="medium" />
			<div className="flex justify-center pt-[50px]">
				<div className="flex flex-col gap-y-8">
					{/* Loopar genom rabatterade hotel, renderar hotellkort */}
					{discountedHotels.map((hotel) => (
						<HorizontalHotelCard
							key={hotel.id}
							hotel={hotel}
							showDiscountedPrice={true}  //Skicka en flagga för att visa både original och rabatterat pris
							startDate={searchParams.startDate}
							endDate={searchParams.endDate}
							adults={searchParams.adults}
							children={searchParams.children}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default OffersPage;
