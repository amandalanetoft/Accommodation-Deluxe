/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import HeartIcon from "./HeartIcon";

import { useFavorites } from "../contexts/FavoritesContext";
import { useSearchParamsContext } from "../contexts/SearchParamsContext";

function HorizontalHotelCard({ hotel }) {
	const { favorites, toggleFavorites } = useFavorites();
	const { searchParams } = useSearchParamsContext(); // Use search params context

	// Kontrollerar om hotellet är lagt i favoriter
	const isFavorite = favorites.some((fav) => fav.id === hotel.id);

	// Beräknar antal nätter från sökparametrar om datum är satt
	const nights =
		searchParams.startDate && searchParams.endDate
			? dayjs(searchParams.endDate).diff(
					dayjs(searchParams.startDate),
					"day"
			  )
			: 0;

	const handleHeartClick = () => {
		console.log(searchParams.isNextToEachOther);
		toggleFavorites(hotel);
	};

	// Formaterar datum som strängar med hjälp av dayjs, om startdatum eller slutdatum saknas returneras en tom stärng
	const formattedStartDate = searchParams.startDate
		? dayjs(searchParams.startDate).format("YYYY-MM-DD")
		: "";
	const formattedEndDate = searchParams.endDate
		? dayjs(searchParams.endDate).format("YYYY-MM-DD")
		: "";

	return (
		<div className="w-[730px] h-[250px] bg-white rounded-[10px] flex overflow-hidden shadow-lg shadow-darkGrey ml-auto">
			{/* Hotel bild*/}
			<img
				className="w-[313px] h-[250px] object-cover"
				src={hotel.imgUrl}
				alt={hotel.name}
			/>

			{/* Hotel information */}
			<div className="flex-1 p-4 flex flex-col justify-between">
				<div>
					<div className="flex justify-between items-start mb-3">
						<div>
							<h2 className="text-black text-[24px] mb-1">
								{hotel.name}
							</h2>
							<div className="flex items-baseline space-x-2">
								<FontAwesomeIcon
									icon={faMapMarkerAlt}
									className="text-darkGrey text-[16px]"
								/>
								<p className="text-darkGrey text-[18px]">
									{hotel.location.city},{" "}
									{hotel.location.country}
								</p>
							</div>
						</div>
						{/* Favorite ikon */}
						<div className="text-accentPink cursor-pointer">
							<HeartIcon
								isFavorite={isFavorite}
								onClick={handleHeartClick}
							/>
						</div>
					</div>

					{/* Lista över hotellets highlights */}
					<ul className="list-disc text-[14px] list-inside mb-5 ml-2.5">
						{hotel.highlights
							.slice(0, 3)
							.map((highlight, index) => (
								<li key={index}>{highlight}</li>
							))}
					</ul>
				</div>

				{/* Sektion för pris, gäster och bokningsknapp */}
				<div className="bg-opacityLightBlue flex justify-between p-3 rounded-br-lg -m-4 items-center">
					{/* Gäster */}
					<div className="text-center">
						<div className="flex items-center mt-1 space-x-2 ml-3">
							<FontAwesomeIcon
								icon={faUserGroup}
								className="text-[20px]"
							/>
							<span>
								<p className="font-bold text-black text-[16px]">
									{searchParams.adults}{" "}
									{searchParams.adults === 1
										? "Adult"
										: "Adults"}
								</p>
								<p className="text-shadyBlack text-[10px]">
									{searchParams.children}{" "}
									{searchParams.children === 1
										? "Child"
										: "Children"}
								</p>
							</span>
						</div>
					</div>

					<div className="border-l border-darkGrey h-10 mx-4"></div>

					{/* Pris per natt*/}
					<div className="text-center">
						<div className="flex items-baseline space-x-2">
							<p className="text-[16px]">
								€{hotel.pricePerNight}/night
							</p>
						</div>
						<p className="text-[10px] text-shadyBlack">
							{nights} night{nights !== 1 ? "s" : ""}: €
							{hotel.pricePerNight * nights}
						</p>
					</div>

					{/* Avdelare */}
					<div className="border-l border-darkGrey h-10 mx-4"></div>

					{/* Bokningsknapp */}
					<div className="flex items-center justify-center">
						<Link
							to={`/hotels/${hotel.id}/about?startDate=${formattedStartDate}&endDate=${formattedEndDate}&adults=${searchParams.adults}&children=${searchParams.children}&nights=${nights}&rooms=${searchParams.rooms}&isNextToEachOther=${searchParams.isNextToEachOther}`}
						>
							<Button size="small" buttonText="Book" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}


//definierar prop-typer för HorizontalHotelCard-komponenten, vilket säkerställer att den får ett objekt med specifika egenskaper
HorizontalHotelCard.propTypes = {
	hotel: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		imgUrl: PropTypes.string.isRequired,
		location: PropTypes.shape({
			city: PropTypes.string.isRequired,
			country: PropTypes.string.isRequired,
		}).isRequired,
		highlights: PropTypes.arrayOf(PropTypes.string),
		pricePerNight: PropTypes.number.isRequired,
		discountedPrice: PropTypes.number,
	}).isRequired,
	showDiscountedPrice: PropTypes.bool,
};

export default HorizontalHotelCard;
