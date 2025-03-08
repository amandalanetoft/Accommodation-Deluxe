import React from "react";
import { useHotelData } from "../../contexts/HotelDataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParamsContext } from "../../contexts/SearchParamsContext";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

function Summary({ hotelId, roomIndex, transferData }) {
	
	// Hämtar hotelldata och eventuella fel från kontexten
	const { hotels, error } = useHotelData();
	
	// Hämtar globala sökparametrar från kontexten
	const { searchParams } = useSearchParamsContext();

	// Dekomponerar start- och slutdatum från sökparametrarna
	const { startDate, endDate } = searchParams;


	// Hantera fel och laddning
	if (error) {
		return <p>Error loading hotel data: {error.message}</p>;
	}
	if (!hotels) {
		return <p>Loading hotel data...</p>;
	}

	// Find the specific hotel by hotelId
	const hotel = hotels.find((hotel) => hotel.id === Number(hotelId));

	// Hantera fel och laddning
	if (!hotel) {
		return <p>Hotel not found.</p>;
	}

	// Hitta hotellet med hotelId
	const room = hotel.rooms ? hotel.rooms[roomIndex] : null;

	// Hantera om hotellet inte hittas
	if (!room) {
		return <p>Room not found.</p>;
	}

	// Beräkna totala nätter
	const checkinDate = dayjs(startDate).format("DD MMMM YYYY");
	const checkoutDate = dayjs(endDate).format("DD MMMM YYYY");
	const totalNights = dayjs(endDate).diff(dayjs(startDate), "day");

	// Beräkna hotellpriset
	const hotelTotalPrice = room.pricePerNight * totalNights;

	// Bestämmer transferpris. Det rör priser för enkel och tur/retur
	let transferPrice = 0;
	if (transferData) {
		if (transferData.returnTrip) {
			transferPrice = 144;
		} else {
			transferPrice = 78;
		}
	}

	// Beräkna totalpris
	const totalPrice = hotelTotalPrice + transferPrice;

	return (
		<div className="border p-4 h-auto w-full border-lightGrey mx-auto rounded-[10px] shadow-lg overflow-hidden bg-white">
			<div className="p-6 space-y-4">
				<h2 className="text-2xl font-bold mb-4">Summary</h2>
				<div className="text-lg">
					<p className="flex space-x-3">
						<span className="font-semibold w-50">Hotel:</span>
						{/* Visar totala kostnaden för hotell*/}
						<span> €{hotelTotalPrice}</span>
					</p>
					{transferData && (
						<p className="flex space-x-3">
							<span className="font-semibold w-50">Car:</span>
							{/* Visar kostnaden för transfer */}
							<span> €{transferPrice}</span>
						</p>
					)}
					<p className="mt-2 text-xl flex space-x-3">
						<span className="font-semibold">Total:</span>
						{/* Visar totala kostnaden */}
						<span> €{totalPrice}</span>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Summary;
