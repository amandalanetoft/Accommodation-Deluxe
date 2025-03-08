/* eslint-disable react/no-children-prop */
import { useHotelData } from "../contexts/HotelDataContext";
import { useParams, useLocation } from "react-router-dom";
import RoomType from "./RoomType";
import dayjs from "dayjs";

function RoomCardsSection() {
	const { hotelId } = useParams(); // Hämtar hotellets ID från URL:en
	const { hotels, offers } = useHotelData();  // Hämtar hotell och offers från kontext

	const location = useLocation(); // React hook to access the URL
	const query = new URLSearchParams(location.search);
	const offerId = query.get("offerId"); // Extraherar erbjudande-ID från URL:en om det finns
	const startDate = query.get("startDate"); 
	const endDate = query.get("endDate");
	const adults = Number(query.get("adults")) || 0; //Antal vuxna, standard till 0 om saknas
	const children = Number(query.get("children")) || 0;
	
    // Beräknar antal nätter baserat på start- och slutdatum
	const totalNights =
		startDate && endDate ? dayjs(endDate).diff(dayjs(startDate), "day") : 0;

	// Hämtar hotellet baserat på hotelId från URL
	const hotel = hotels.find((hotel) => hotel.id === Number(hotelId));

	// Hämtar offerId finns och stämmer med hotelId
	let applicableOffer = null;
	if (offerId && offers) {
		const offer = offers.find((o) => o.id === Number(offerId));
		if (offer && offer.hotelId === Number(hotelId)) {
			// Beräkna rabattprocent om original- och rabatterat pris finns
			if (offer.originalPrice && offer.discountedPrice) {
				offer.discountPercentage =
					(offer.originalPrice - offer.discountedPrice) /
					offer.originalPrice;
			}
			applicableOffer = offer;
		}
	}

	return (
		<div className="w-[85%] mx-auto mt-8">
			<hr className="border-t-2 border-grey mb-6" />
			<h2 className="text-3xl font-bold mb-6">Book now</h2>

			{/* Itererar igenom rooms för att rendera roomtypes innehåll */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3">
				{hotel.rooms.map((room, index) => (
					<RoomType
						key={index}
						room={room}
						totalNights={totalNights}
						adults={adults}
						children={children}
						hotelId={hotelId} // Skickar hotelid till roomtype
						index={index} // Skickar index till roomtype för identifiering
						offer={applicableOffer} 
					/>
				))}
			</div>
		</div>
	);
}

export default RoomCardsSection;

