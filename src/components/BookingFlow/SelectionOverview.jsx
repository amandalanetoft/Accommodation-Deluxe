/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarkerAlt,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button";
import { useHotelData } from "../../contexts/HotelDataContext";
import { useSearchParamsContext } from "../../contexts/SearchParamsContext";
import dayjs from "dayjs";

//komponent visar en översikt över hotellvalet
function SelectionOverview({ hotelId, roomIndex }) {

	// Hämtar globala sökparametrar
	const { searchParams } = useSearchParamsContext();

	// Datum och personer
	const { startDate, endDate, adults, children } = searchParams;

	// Hotellinfo och fel
	const { hotels, error } = useHotelData();

	// Aktuell bild
	const [currentImageIndex, setCurrentImageIndex] = useState(0); 

	// Hanterar fel och laddningstillstånd. Visar felmeddelande eller laddningsmeddelande
	if (error) {
		return <p>Error loading hotel data: {error.message}</p>;
	}
	if (!hotels) {
		return <p>Loading hotel data...</p>;
	}

	// Hittar det specifika hotellet med hotelId
	const hotel = hotels.find((hotel) => hotel.id === Number(hotelId));

	// Hanterar fallet där hotellet inte hittas och visar meddelande
	if (!hotel) {
		return <p>Hotel not found.</p>;
	}

	// Hittar det specifika rummet med roomIndex
	const room = hotel.rooms[roomIndex];

	// Använd rumbilder om tillgängliga, annars fallback till imgUrl
	const roomImages =
		room.roomImages && room.roomImages.length > 0
			? room.roomImages
			: [room.imgUrl]; 
	
			// Formaterar incheckningsdatum och utcheckningsdatum
	const checkinDate = dayjs(startDate).format("DD MMMM YYYY");
	const checkoutDate = dayjs(endDate).format("DD MMMM YYYY");

	// Beräknar totala nätter
	const totalNights = dayjs(endDate).diff(dayjs(startDate), "day");

	// Funktion för att hantera bildnavigering. Går till nästa bild eller tillbaka till första
	const handleNextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === roomImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	// Funktion för att hantera bildnavigering. Går till föregående bild eller till sista
	const handlePrevImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === 0 ? roomImages.length - 1 : prevIndex - 1
		);
	};

	return (
		<div className="w-full h-auto border border-lightGrey mx-auto rounded-[10px] shadow-lg overflow-hidden bg-white">
			<div className="p-6 space-y-4">
				<h2 className="text-2xl font-bold">Check your selection</h2>
				<div className="relative w-full flex items-center justify-between">
					{/* Vänsterpil för bildnavigering */}
					<button
						onClick={handlePrevImage}
						className="absolute left-0 z-10 flex items-center justify-center bg-black/50 rounded-full p-2 ml-2 hover:bg-shadyBlack"
					>
						<FontAwesomeIcon
							icon={faChevronLeft}
							className="w-6 h-6 text-white"
						/>
					</button>

					{/* Bildbehållare, aktuell bild visas*/}
					<div className="flex-grow relative flex justify-center max-h-[500px]">
						<img
							className="w-full h-auto object-cover"
							src={roomImages[currentImageIndex]}
							alt={room.roomType}
						/>
					</div>

					{/* Högerpil för bildnavigering */}
					<button
						onClick={handleNextImage}
						className="absolute right-0 z-10 flex items-center justify-center bg-black/50 rounded-full p-2 mr-2 hover:bg-shadyBlack"
					>
						<FontAwesomeIcon
							icon={faChevronRight}
							className="w-6 h-6 text-white"
						/>
					</button>
				</div>

				<div>
					{/* Visar hotellets namn och rumstyp */}
					<h3 className="text-xl font-semibold">
						{hotel.name} - {room.roomType}
					</h3>
				</div>
				<div className="flex items-center text-darkGrey">
					<FontAwesomeIcon
						icon={faMapMarkerAlt}
						className="w-4 h-4 mr-1"
					/>

					{/* Visar hotellens plats */}
					<p>
						{hotel.location.city}, {hotel.location.country}
					</p>
				</div>
				<div className="bg-opacityLightBlue p-4 rounded-lg space-y-2">
					<div className="flex justify-between">
						<div className="flex flex-col space-y-1">
							<div className="flex space-x-3">
								<p className="w-20">Check in: </p>

								{/* Visar incheckningstid och datum */}
								<span className="ml-3">
									{hotel.checkInTime}, {checkinDate}
								</span>
							</div>
							<div className="flex space-x-3">
								<p className="w-20">Check out:</p>

								{/* Visar utcheckningstid och datum */}
								<span className="ml-3">
									{hotel.checkOutTime}, {checkoutDate}
								</span>
							</div>
						</div>

						{/* Grå linje mellan enheterna */}
						<div className="flex items-center space-x-2">
							<div className="border-l border-darkGrey h-[60px] mr-2"></div>
							<div>
								{/* Visar totala kostnaden */}
								<span className="text-[26px] font-bold">
									€{room.pricePerNight * totalNights}
								</span>

								{/* Visar antal vuxna och nätter */}
								<p className="text-[18px] text-shadyBlack">
									{adults} {adults === 1 ? "Adult" : "Adults"}{" "}
									/ {totalNights}{" "}
									{totalNights === 1 ? "Night" : "Nights"}
								</p>

								{/* Visar antal barn */}
								<p className="text-[14px] text-shadyBlack">
									{children}{" "}
									{children === 1 ? "Child" : "Children"}
								</p>
							</div>
						</div>
					</div>
				</div>
				<div className="flex justify-between items-end mt-4"></div>
			</div>
		</div>
	);
}

export default SelectionOverview;
