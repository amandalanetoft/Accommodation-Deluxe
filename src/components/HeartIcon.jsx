/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

function HeartIcon({ isFavorite, onClick }) {
	return (
		<FontAwesomeIcon
			icon={isFavorite ? solidHeart : regularHeart} // Visar ifyllt hjärta om `isFavorite` är sant, annars ett tomt hjärta
			className="text-accentPink cursor-pointer h-5 w-5" // Färg och storlek på ikon
			onClick={onClick} // Onclick funktion som triggas när hjärtat klickas
		/>
	);
}

export default HeartIcon;