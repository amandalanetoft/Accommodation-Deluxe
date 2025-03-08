
import { useParams } from "react-router-dom";
import { useHotelData } from "../contexts/HotelDataContext";

const useHotelDetails = () => {

	// Hämtar hotelId från URL:en
	const { hotelId } = useParams(); 

	// Hämtar hotell och eventuella fel från kontexten
	const { hotels, error } = useHotelData();

	// Hantera fel och laddningsstatus
	if (error) {
		// Returnerar fel och sätter loading till false
		return { error, loading: false, hotel: null };
	}
	if (!hotels) {
		return {
			error: null,
			loading: true, // Sätter loading till true om inga hotell finns
			hotel: null,
		};
	}

	// Hittar det specifika hotellet baserat på hotelId
	const hotel = hotels.find((hotel) => hotel.id === Number(hotelId));

	// Hantera fallet där hotellet inte hittas
	if (!hotel) {
		return { hotel: null, loading: false, error: "Hotel not found" }; // Returnerar null och felmeddelande om hotellet inte finns
	}

	return { hotel, loading: false, error: null }; // Returnerar hotellet, loading och felstatus

};

export default useHotelDetails;
