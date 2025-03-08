/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import HeartIcon from "./HeartIcon";
import { useFavorites } from "../contexts/FavoritesContext";
import { Link } from "react-router-dom";

//Returnerar Vertikala hotelkorten
function VerticalHotelCard(props) {
	const { favorites, toggleFavorites, removeFavorite } = useFavorites();

	// Kontrollerar om det specifika hotellet finns i favoriter
	const isFavorite = favorites.some((fav) => fav.id === props.hotelId);

	//Funktion för att hanterar logiken för att markera eller avmarkera hotellet som favorit
	const handleHeartClick = () => {
		if (isFavorite) {
			// Om hotellet redan är markerat som favorit, körs removeFavorite för att ta bort det från favoriter
			removeFavorite(props.hotelId);
		} else {
			// Om hotellet inte är markerat som favorit, körs toggleFavorites och skapar ett objekt med hotellets information och lägger till det i favoriter
			toggleFavorites({
				id: props.hotelId,
				name: props.hotelName,
				imgUrl: props.imgUrl,
				city: props.city,
				country: props.country,
				description: props.description,
				rating: props.rating,
				startingFromPrice: props.startingFromPrice,
			});
		}
	};


	return (
		//Definierar bredd och layout på komponenten
		<div className="w-[330px] h-[443px] bg-white rounded-[10px] overflow-hidden shadow-lg shadow-darkGrey flex flex-col">
			{/*Hotelkortets bild och hjärta för att spara som favorit*/}
			<div className="relative">
				<img
					className=" w-[330px] h-[199px] object-cover"
					src={props.imgUrl}
					alt={props.hotelName}
				/>
				<div className="absolute top-2 right-2">
					<HeartIcon
						isFavorite={isFavorite}
						onClick={handleHeartClick}
					/>
				</div>
			</div>

			{/*Definierar layout för hotel detaljer */}
			<div className="flex-1 p-4 flex flex-col justify-between">
				<div className="flex justify-between">
					{/*Hotellnamn och hotel information*/}
					<div>
						<div className="flex items-bottom">
							<h2 className="text-[20px] text-black font-bold mb-1">
								{props.hotelName}
							</h2>
							<div className="flex items-center ml-auto">
								<span className="mr-1">{props.rating}</span>
								<div className="text-accentPink">
									<FontAwesomeIcon
										icon={faStar}
										className="w-5 h-5 text-primaryDarkBlue"
									/>
								</div>
							</div>
						</div>

						<div className="flex items-bottom">
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								className="w-4 h-4 text-black"
							/>
							<p className="text-[14px] text-black mb-2 mx-1">
								{props.city}, {props.country}
							</p>
						</div>
						<p className="text-[14px] text-black">
							{props.description}
						</p>
					</div>
				</div>

				{/*Boka knapp och pris*/}
				<div className="flex justify-between items-center mt-4">
					<Link to={`/hotels/${props.hotelId}`}>
						<Button size="large" buttonText={"Book"} />
					</Link>

					<p className="text-[14px] text-black">
						{props.startingFromPrice}
					</p>
				</div>
			</div>
		</div>
	);
}
export default VerticalHotelCard;
