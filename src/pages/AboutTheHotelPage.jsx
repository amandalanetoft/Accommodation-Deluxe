/* eslint-disable no-unused-vars */
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faXmark,
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import InfoBoxSpecificHotel from "../components/InfoBoxSpecificHotel";
import RoomCardsSection from "../components/RoomCardsSection";
import useHotelDetails from "../hooks/useHotelDetails";




// Komponenten används för att vis detaljer om ett specifikt hotell, inklusive bilder, beskrivningar och information.
function AboutTheHotelPage() {

	// State-hook för att hantera om bildmodalen är öppen eller stängd och den är stängd från början
	const [isModalOpen, setIsModalOpen] = useState(false);

	// State-hook för att hålla reda på indexet av den aktuella bilden som visas i modalen
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	// Anropar en anpassad hook för att hämta hotellinformation
	const { hotel, error, loading } = useHotelDetails();

	
	// Hanterar laddning, fel och tillstånd för om hotellet inte hittas.
	if (loading) {
		return <p>Loading hotel data...</p>;
	}
	if (error) {
		return <p>Error loading hotel data: {error.message}</p>;
	}
	if (!hotel) {
		return <p>Hotel not found.</p>;
	}
	
	// Definierar informationsboxens innehåll 
	const infoBoxContent = {
		title: hotel.infoBox.title,
		additionalInformation: hotel.infoBox.additionalInformation,
		optionsTitle: hotel.infoBox.optionsTitle,
		extraInformation: hotel.infoBox.extraInformation,
	};

	// Sätter bilderna för hotellet
	const images = hotel.images || [];

	// Hanterar öppning av modal
	const openModal = (index) => {
		setCurrentImageIndex(index);
		setIsModalOpen(true);
	};

	const closeModal = () => setIsModalOpen(false);

	const handleNextImage = () => {
		setCurrentImageIndex((currentImageIndex + 1) % images.length);
	};

	const handlePrevImage = () => {
		setCurrentImageIndex(
			(currentImageIndex - 1 + images.length) % images.length
		);
	};

	return (
		<div>
			{/* Modal för bildpopup */}
			{isModalOpen && images.length > 0 && (
				<div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
					<div className="relative">
						
						{/* Visar den aktuella bilden i modalen */}
						<img
							src={images[currentImageIndex]}
							alt="Popup"
							className="w-[600px] h-[400px] object-cover rounded-lg"
						/>
						{/* Stängningsknapp för modalen */}
						<button
							onClick={closeModal}
							className="absolute top-5 right-5 text-white text-xl"
						>
							<FontAwesomeIcon icon={faXmark} />
						</button>

						{/* Föregående bild-knapp */}
						<button
							onClick={handlePrevImage}
							className="absolute top-1/2 left-2 text-white text-xl"
						>
							<FontAwesomeIcon icon={faChevronLeft} />
						</button>

						{/* Nästa bild-knapp */}
						<button
							onClick={handleNextImage}
							className="absolute top-1/2 right-2 text-white text-xl"
						>
							<FontAwesomeIcon icon={faChevronRight} />
						</button>
					</div>
				</div>
			)}

			{/* Huvudlayout */}
			<div className="w-[85%] mx-auto mt-8">
				{/* Beskrivningssektion */}
				<div className="flex justify-between w-[85%] mx-auto mt-8">
					<div className="w-[60%] pr-8">
						<h2 className="text-3xl font-bold mb-4">
							About {hotel.name}
						</h2>
						{hotel.descriptionParagraphs.map((paragraph, index) => (
							<p key={index} className="text-lg text-black mb-4">
								{paragraph}
							</p>
						))}
					</div>
					<InfoBoxSpecificHotel {...infoBoxContent} />
				</div>

				{/* Bildgallerisektion */}
				<div className="w-[85%] mx-auto flex mt-8">

					{/* Huvudbilder */}
					<div className="flex flex-col">
						{images.length > 0 && (
							<img
								src={images[0]}
								alt="Main view"
								className="w-[700px] h-[420px] object-cover rounded-lg cursor-pointer"
								onClick={() => openModal(0)}
							/>
						)}

						{/* Miniatyrer under huvudbilden, justerade till vänster */}
						<div className="flex space-x-4 mt-4">
							{images.map((image, index) => (
								<img
									key={index}
									src={image}
									alt={`Thumbnail ${index}`}
									className="w-[100px] h-[100px] object-cover rounded-lg cursor-pointer"
									onClick={() => openModal(index)}
								/>
							))}
						</div>
					</div>

					{/* Högerställda bilder */}
					<div className="flex flex-col space-y-4 ml-5">
						{images.length > 1 ? (
							images
								.slice(1, 3)
								.map((image, index) => (
									<img
										key={index + 1}
										src={image}
										alt={`Image ${index + 1}`}
										className="w-[400px] h-[200px] object-cover rounded-lg cursor-pointer"
										onClick={() => openModal(index + 1)}
									/>
								))
						) : (
							<p>No additional images to display.</p>
						)}
					</div>
				</div>
			</div>
			
			{/* Avsnitt för rumskort */}
			<RoomCardsSection />
		</div>
	);
}

export default AboutTheHotelPage;
