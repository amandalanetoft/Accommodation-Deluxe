// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useHotelData } from "../contexts/HotelDataContext";
import OfferCard from "./OfferCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronLeft,
	faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

// Funktion för att dela upp en array i grupper om två
const chunkArray = (array, chunkSize) => {
	const chunks = [];
	for (let i = 0; i < array.length; i += chunkSize) {
		chunks.push(array.slice(i, i + chunkSize));
	}
	return chunks;
};

function Slider() {
	const { offers } = useHotelData(); // // Hämtar offers från kontexten

	// Dela upp offers-arrayen i grupper om två
	const offerChunks = chunkArray(offers, 2);

	const [currentSlide, setCurrentSlide] = useState(0);

	// Gå till nästa slide
	const nextSlide = () => {
		if (currentSlide < offerChunks.length - 1) {
			setCurrentSlide(currentSlide + 1);
		}
	};

	// Gå till föregående slide
	const prevSlide = () => {
		if (currentSlide > 0) {
			setCurrentSlide(currentSlide - 1);
		}
	};

	// Hanterar klick på pagination dots
	const goToSlide = (index) => {
		setCurrentSlide(index);
	};

	return (
		<div className="my-20 w-[80%] m-auto relative">
			<h2 className="text-2xl font-semibold">Offers</h2>
			<p className="text-shadyBlack">
				Promotions, deals, and special offers for you
			</p>

			{/* Yttercontainer för pilar och slider */}
			<div className="relative">
				{/* Slider container med overflow hidden */}
				<div className="relative flex overflow-hidden w-full">
					{/* Innehåll i slider */}
					<div
						className="flex w-full transition-transform duration-500"
						style={{
							transform: `translateX(-${currentSlide * 100}%)`,
						}}
					>
						{offerChunks.map((offerChunk, index) => (
							<div
								key={index}
								className="min-w-full flex justify-center space-x-7 mt-5"
							>
								{offerChunk.map((offer) => (
									<OfferCard
										key={offer.id}
										title={offer.title}
										description={offer.description}
										validUntil={offer.validUntil}
										backgroundImage={offer.backgroundImage}
										overlay={offer.overlay}
										imageType={offer.imageType}
										ctaText={offer.ctaText}
										hotelId={offer.hotelId}
									/>
								))}
							</div>
						))}
					</div>
				</div>

				{/* Vänsterpil */}
				{currentSlide > 0 && (
					<button
						onClick={prevSlide}
						className="absolute -left-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-20"
					>
						<FontAwesomeIcon icon={faChevronLeft} />
					</button>
				)}

				{/* Högerpil */}
				{currentSlide < Math.ceil(offers.length / 2) - 1 && (
					<button
						onClick={nextSlide}
						className="absolute -right-12 top-1/2 transform -translate-y-1/2 p-2 rounded-full z-20"
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</button>
				)}
			</div>

			{/* Pagination Dots - loopar igenom "offers-arryen" och delar den på två, eftersom det ska vara två stycken per "sida" för att skapa prickarna/cirklarna som visar på vilken "sida" av slidern användaren befinenr sig*/}
			<div className="flex justify-center mt-4">
				{Array.from({ length: Math.ceil(offers.length / 2) }).map(
					(_, index) => (
						<span
							key={index}
							onClick={() => goToSlide(index)}
							className={`cursor-pointer mx-1 w-3 h-3 rounded-full ${
								index === currentSlide
									? "bg-primaryDarkBlue"
									: "bg-opacityLightBlue"
							}`}
						></span>
					)
				)}
			</div>
		</div>
	);
}

export default Slider;
