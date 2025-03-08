/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import PrimeSave from "../../assets/icons/PrimeSave";
import CilPrint from "../../assets/icons/CilPrint";
import { useHotelData } from "../../contexts/HotelDataContext";
import { useSearchParams } from "react-router-dom";
import dayjs from "dayjs";
import jsPDF from "jspdf"; // Importera endast jsPDF

// Funktion för att generera ett slumpmässigt bokningsnummer
function generateRandomBookingNumber() {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let prefix = "";

	// Skapar ett prefix av tre slumpmässiga bokstäver
	for (let i = 0; i < 3; i++) {
		const randomIndex = Math.floor(Math.random() * letters.length);
		prefix += letters[randomIndex];
	}

	// Genererar ett slumpmässigt nummer
	const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
	return `${prefix}-${randomNumber}`;
}

function ConfirmationPage() {

	// Hämtar sökparametrar från URL
	const [searchParams] = useSearchParams();
	const hotelId = searchParams.get("hotelId");
	const roomIndex = searchParams.get("roomIndex");
	const startDate = searchParams.get("startDate");
	const endDate = searchParams.get("endDate");
	const adults = searchParams.get("adults");
	const children = searchParams.get("children");

	// Hämtar hotellinformation från kontexten
	const { hotels, error } = useHotelData();

	// Skapar en referens för bokningsdetaljer
	const bookingRef = useRef();

	// Hanterar fel vid hämtning av hotelldata
	if (error) {
		return <p>Error loading hotel data: {error.message}</p>;
	}
	if (!hotels) {
		return <p>Loading hotel data...</p>;
	}

	// Visar laddningsmeddelande om hotelldata inte är tillgänglig
	const hotel = hotels.find((hotel) => hotel.id === Number(hotelId));
	if (!hotel) {
		return <p>Hotel not found.</p>;
	}

	// Hittar det valda rummet med hjälp av roomIndex
	const room =
		hotel.rooms && hotel.rooms.length > 0 && hotel.rooms[roomIndex]
			? hotel.rooms[roomIndex]
			: null;

	// Visar felmeddelande om rummet inte finns
	if (!room) {
		return <p>Room not found.</p>;
	}

	// Genererar ett bokningsnummer. Formaterar incheckningsdatum och utcheckningsdatum
	const bookingNumber = generateRandomBookingNumber();
	const checkinDate = dayjs(startDate).format("DD MMMM YYYY");
	const checkoutDate = dayjs(endDate).format("DD MMMM YYYY");

	// Viktig information om bokningen
	const importantInfo = [
		"Check-in is from 10 am and check-out is by 11:00 AM.",
		"To make your stay even more comfortable, we have offered you airport transfer. If you booked this, a confirmation will come separately to your email.",
		"If you have any other special requests prior to your stay, please do not hesitate to contact us at info@accommodationdeluxe.com.",
	];

	// Funktion för att skapa PDF och ladda ner den
	const handleSaveAsPDF = () => {
		const doc = new jsPDF();
		doc.setFontSize(16);
		doc.text("Booking Confirmation", 20, 10);

		// Lägger till bokningsdetaljerna
		doc.setFontSize(12);
		doc.text(`Booking Number: ${bookingNumber}`, 20, 20);
		doc.text(`Check-in Date: ${checkinDate}`, 20, 30);
		doc.text(`Check-out Date: ${checkoutDate}`, 20, 40);
		doc.text(`Room Type: ${room.roomType}`, 20, 50);
		doc.text(`Number of Guests: ${adults} Adults, ${children} Children`, 20, 60);

		// Lägger till viktig information
		doc.text("Important Information:", 20, 80);
		importantInfo.forEach((info, index) => {
			doc.text(`${index + 1}. ${info}`, 20, 90 + index * 10);
		});

		// För att ladda ner en pdf
		doc.save("BookingConfirmation.pdf");
	};

	// Funktion för att skriva ut bokningsbekräftelsen och anropar webbläsarens skrivfunktion
	const handlePrint = () => {
		window.print();
	};

	return (
		<div>
			{/* Sektion för bokningsbekräftelse */}
			<div
				ref={bookingRef}
				className="relative p-6 w-[60%] mx-auto mt-10 rounded-md shadow-xl"
			>
				<div className="absolute top-2 right-2 flex items-center space-x-2 bg-white p-2 rounded-md shadow-md">
					<a
						className="text-black text-3xl cursor-pointer mr-2"
						onClick={handleSaveAsPDF}
						title="Save booking confirmation as PDF"
					>
						<PrimeSave />
					</a>

					<a
						className="text-black text-2xl cursor-pointer mr-2"
						onClick={handlePrint}
						title="Print booking confirmation"
					>
						<CilPrint />
					</a>
				</div>

				<div className="w-3/4 mx-auto">
					<h1 className="text-[40px] font-bold text-center mb-4 ">
						Thank you! Your booking is confirmed!
					</h1>
					<p className="mb-4">Dear Maria Svensson,</p>
					<p className="mb-4">
						Thank you for your reservation at {hotel.name}! We look
						forward to welcoming you to our luxurious hotel in the
						heart of Spain for an unforgettable stay.
					</p>
				

				<div className="flex justify-center mb-4">
					<img
						src={hotel.imgUrl}
						alt={hotel.name}
						className="w-full rounded "
					/>
				</div>

				<div className="p-4 rounded-md mb-4">
					<h2 className="font-semibold mb-2">Booking Details:</h2>
					<ul className="list-disc pl-5">
						<li>Booking Number: {bookingNumber}</li>
						<li>Check-in Date: {checkinDate}</li>
						<li>Check-out Date: {checkoutDate}</li>
						<li>Room Type: {room.roomType}</li>
						<li>
							Number of Guests: {adults}
							{adults === "1" ? " Adult" : " Adults"}, {children}
							{children === "1" ? " Child" : " Children"}
						</li>
					</ul>
				</div>

				<div className="p-4 rounded-md mb-4">
					<h2 className="font-semibold mb-2">
						Important Information:
					</h2>
					<ul className="list-disc pl-5">
						{importantInfo.map((info, index) => (
							<li key={index}>{info}</li>
						))}
					</ul>
				</div>

				<p className="mb-4">
					We look forward to providing you with a fantastic experience
					at Hotel Riviera Resort.
				</p>

				<p className="font-bold">Best regards</p>
				<p>{hotel.name}</p>
				<div className="flex items-center mt-2">
					<span>{hotel.map?.location?.address}</span>
				</div>
				<div className="flex items-center mt-1">
					<span>+34 952 123 456</span>
				</div>
			</div>
		</div>
		</div>
	);
}

export default ConfirmationPage;

