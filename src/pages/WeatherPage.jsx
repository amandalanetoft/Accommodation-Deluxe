// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import useHotelDetails from "../hooks/useHotelDetails";

import RoomCardsSection from "../components/RoomCardsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import RiSunLine from "../assets/icons/RiSunLine";
import WaterDrop from "../assets/icons/WaterDrop";
import Umbrella from "../assets/icons/Umbrella";

function Weather() {
	const [currentPage, setCurrentPage] = useState(0);
	const { hotel, error, loading } = useHotelDetails();

	// Felhantering om hotellets data inte hittas
	if (loading) {
		return <p>Loading hotel data...</p>;
	}
	if (error) {
		return <p>Error loading hotel data: {error.message}</p>;
	}
	if (!hotel) {
		return <p>Hotel not found.</p>;
	}
   // Definierar antal items som ska visas per sida i tabelldelen
	const itemsPerPage = 6;

	// Hämtar väderdata från hotellets information
	const weatherData = hotel.weather;

	// Startindex för nuvarande sidans data med itemsperpage
	const startIndex = currentPage * itemsPerPage;
	const currentMonths = weatherData.slice(
		startIndex,
		startIndex + itemsPerPage
	);

	// Funktion för att gå till nästa sida om itemsperpage har ytterligare data
	function goToNextPage() {
		if ((currentPage + 1) * itemsPerPage < weatherData.length) {
			setCurrentPage(currentPage + 1);
		}
	}
	// Funktion för att gå till föregående sida om aktuell sida inte är den första
	function goToPreviousPage() {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	}

	return (
		<div className="">
			<div className="relative flex items-center justify-between w-[80%] mx-auto mt-5">
				{/* Vänster knapppil anropar funktion goPreviouspage vid klick */}
				{currentPage > 0 && (
					<button
						onClick={goToPreviousPage}
						className="absolute left-2 p-2 rounded-full bg-white shadow-lg hover:bg-opacityLightBlue transition duration-300"
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
				)}

				{/* Vädertabell - visning av väderinformation för den aktuella sidans månader */}
				<div className="flex-grow">
					<table className="bg-white text-center mb-4 w-full">
						<thead>
							<tr>
								{/* Månadsnamn från currentMonths*/}
								{currentMonths.map((month, index) => (
									<th
										key={index}
										className="px-4 py-2 border-b text-lg font-medium bg-opacityLightBlue"
									>
										{month.month}{" "} {/* Visar månadens namn */}	
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{/* Dag/Natt temperatur för respektive */}
							<tr>
								{currentMonths.map((month, index) => (
									<td
										key={index}
										className="px-4 py-4 border-b"
									>
										<div className="flex flex-col items-center">
											<span className="flex items-center text-black">
												<RiSunLine className="text-yellow-500 mr-1 text-md" />
												{month.dayTemp}
											</span>
											<span className="flex items-center text-darkGrey">
												<FontAwesomeIcon
													icon={faMoon}
													className="mr-1"
												/>
												{month.nightTemp}
											</span>
										</div>
									</td>
								))}
							</tr>
							{/* Soltimmar för respektive månad */}
							<tr>
								{currentMonths.map((month, index) => (
									<td
										key={index}
										className="px-4 py-4 border-b"
									>
										<div className="flex flex-col items-center">
											<div className="flex items-center">
												<RiSunLine className="text-yellow-500 text-xl mr-1" />
												<span>{month.sunHours}</span>
											</div>
											<span className="text-Black">
												Soltimmar/dag
											</span>
										</div>
									</td>
								))}
							</tr>
							{/* Vattentemp för respektive månad */}
							<tr>
								{currentMonths.map((month, index) => (
									<td
										key={index}
										className="px-4 py-4 border-b"
									>
										<div className="flex flex-col items-center">
											<div className="flex items-center">
												<WaterDrop className="text-[18px] text-secondaryLightBlue mr-1" />
												<span>{month.waterTemp}</span>
											</div>
											<span className="text-Black">
												Vattentemperatur
											</span>
										</div>
									</td>
								))}
							</tr>
							{/*Regnfria dagar respektive månad */}
							<tr>
								{currentMonths.map((month, index) => (
									<td key={index} className="px-4 py-4">
										<div className="flex flex-col items-center">
											<div className="flex items-center">
												<Umbrella className="text-[18px] text-accentPink mr-1" />
												<span>
													{month.rainFreeDays}
												</span>
											</div>
											<span className="text-Black">
												Regnfria dagar
											</span>
										</div>
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>

				{/*Höger knapp-pil anropar goNext page funktionen */}
				{currentPage <
					Math.ceil(weatherData.length / itemsPerPage) - 1 && (
					<button
						onClick={goToNextPage}
						className="absolute right-2 p-2 rounded-full bg-white shadow-lg hover:bg-opacityLightBlue transition duration-300"
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				)}
			</div>
			<RoomCardsSection />
		</div>
	);
}

export default Weather;







