// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "./Button";

// Komponent för att visa en trending destinations i kort
function TrendingDestinationCard({ size, textSize, imageSrc, location, destinationId }) {
	// Objekt för att hantera storleksklasser beroende på prop-size
	const sizeClass = {
		large: "w-[930px] h-[580px]",
		medium: "w-[435px] h-[270px]",
		small: "w-80 h-60",
	};
	// Objekt för att hantera textstorleksklasser beroende på prop textsize
	const textSizeClass = {
		large: "text-[24px]",
		medium: "text-[20px]",
		small: "text-[16px]",
	};

	return (
		<div //div med dynamisk storlek baserat på prop - size
			className={`relative overflow-hidden rounded-[10px] ${sizeClass[size]}`}
		>
			{/* Bild för destinationen */}
			<img
				src={imageSrc}
				alt={location}
				className="object-cover w-full h-full"
			/>
			{/* Overlay-sektion för text och knapp */}
			<div className="absolute bottom-0 left-0 w-full p-4 bg-opacityBlack flex justify-between items-center">
				<h3
					className={`${textSizeClass[textSize]} text-white font-semibold`}
				>
					{location}
				</h3>
				{/* Knapp som länkar till hotellet baserat på destinationID */}
				<Link
					to={`/hotels?destinationId=${destinationId}&destination=${location}`}
				>
					<Button size={size} buttonText="Explore" />
				</Link>
			</div>
		</div>
	);
}
//Prop types för komponenten
TrendingDestinationCard.propTypes = {
	size: PropTypes.oneOf(["small", "medium", "large"]),
	textSize: PropTypes.oneOf(["small", "medium", "large"]),
	imageSrc: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired,
	destinationId: PropTypes.Number
};

export default TrendingDestinationCard;
