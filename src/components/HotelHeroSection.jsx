/* eslint-disable no-unused-vars */

import React from "react";
import PropTypes from "prop-types";

// Hero-sektion för specifikt hotel
function HotelHeroSection({ imageUrl, hotelName }) {
	return (
		<div
			className="hero relative bg-cover bg-center"
			style={{
				backgroundImage: `url(${imageUrl})`, //Dynamisk användning av bakgrundsbild
				height: "500px",
			}}
		>
			{/* Overlay för opacitetsfält och hotelnamn */}
			<div className="absolute inset-0 bg-black bg-opacity-20 flex justify-center items-center">
				<h1 className="text-white text-6xl font-semibold bg-primaryDarkBlue px-[100px] py-[15px]">
					{hotelName} {/* Rendering av hotelnamn, dynamiskts */}
				</h1>
			</div>
		</div>
	);
}

//definierar prop-typer för HotelHeroSection-komponenten, vilket innebär att den förväntar sig att få en imageUrl (som en obligatorisk sträng) och ett hotelName (också som en obligatorisk sträng) som argument.
HotelHeroSection.propTypes = {
	imageUrl: PropTypes.string.isRequired,
	hotelName: PropTypes.string.isRequired,
};

export default HotelHeroSection;
