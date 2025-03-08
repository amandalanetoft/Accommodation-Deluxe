/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";
import { Link } from "react-router-dom";

function OfferCard(props) {
	//Stil för bilder i karusellen
	const imageStyles = props.imageType.smallRight
		? { width: "180px", height: "100%", objectFit: "cover" } // Om bilden är på höger sida (smallRight)
		: props.imageType.fullWidth
		? {
				backgroundImage: `url(${props.backgroundImage})`, // Om bilden är i full bredd
				backgroundSize: "cover",
				backgroundPosition: "center",
		  }
		: {};

	return (
		<div
			className={`rounded-[10px] shadow-md w-[650px] h-[200px] relative flex ${
				props.overlay && props.imageType.fullWidth
					? "text-white"
					: "bg-transparent border border-accentPink"
			}`}
			style={
				props.imageType.fullWidth && props.backgroundImage
					? imageStyles
					: {}
			}
		>
			{/* Opacitet för overlay om bildtyp är fullBredd */}
			{props.imageType.fullWidth && props.overlay && (
				<div className="absolute inset-0 bg-black bg-opacity-50 rounded-[10px]"></div>
			)}{" "}
			{/* Innehåll för kort*/}
			<div
				className={`flex flex-col flex-1 p-6 ${
					props.overlay ? "z-10" : ""
				}`}
			>
				{" "}
				<h3 className="font-semibold text-lg mb-2">{props.title}</h3>
				<p className="mb-4 text-sm">{props.description}</p>{" "}
				<div className="mt-auto">
					{/* Navigering till hotellsidan */}
					<Link to={`/hotels/${props.hotelId}?offerId${props.id}`}>
						<Button size="large" buttonText={props.ctaText} />
					</Link>
					<span
						className={`text-sm mx-3 ${
							props.imageType.fullWidth && props.backgroundImage
								? "text-white"
								: "text-shadyBlack"
						}`}
					>
						Valid until {props.validUntil}
					</span>
				</div>
			</div>
			{/* Right-side image for smallRight layout */}
			{props.imageType.smallRight && props.backgroundImage && (
				<div className="w-[180px] h-[200px]">
					<img
						src={props.backgroundImage}
						alt={props.title}
						className="w-full h-full object-cover rounded-r-[10px]"
					/>
				</div>
			)}
		</div>
	);
}



OfferCard.propTypes = {
	title: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	validUntil: PropTypes.string.isRequired,
	ctaText: PropTypes.string.isRequired,
	backgroundImage: PropTypes.string,
	imageType: PropTypes.shape({
		fullWidth: PropTypes.bool,
		smallRight: PropTypes.bool,
		noImage: PropTypes.bool,
	}).isRequired,
	overlay: PropTypes.bool,
	hotelId: PropTypes.number.isRequired, 
};

export default OfferCard;
