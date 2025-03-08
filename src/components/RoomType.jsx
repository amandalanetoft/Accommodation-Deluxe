/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SquareMeters from "../assets/icons/SquareMeters";
import {
	faMugSaucer,
	faWifi,
	faUserGroup,
	faBed,
	faWaterLadder,
	faBath,
	faMemory,
	faFan,
	faShower,
	faWind,
	faTv,
	faWater,
	faHouseFloodWater,
	faCheck,
	faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

// Ikonobjekt för att mappa olika amenities till deras respektive FontAwesome-ikoner
const amenityIcons = {
  hasShower: { icon: faShower, label: "Shower" },
  hasTv: { icon: faTv, label: "TV" },
  hasAC: { icon: faWind, label: "Air Conditioner" },
  hasHairdryer: { icon: faFan, label: "Hairdryer" }
};

// Definierar ett objekt som länkar varje beskrivning till dess ikon
const descriptionIcons = {
	"Square Meters": { icon: SquareMeters, type: "custom" }, 
	"Breakfast included": { icon: faMugSaucer, type: "fontawesome" },
	"Free WiFi": { icon: faWifi, type: "fontawesome" },
	People: { icon: faUserGroup, type: "fontawesome" },
	"Shared pool with others": { icon: faWaterLadder, type: "fontawesome" },
	"Private pool": { icon: faWaterLadder, type: "fontawesome" },
	"Private Bathroom": { icon: faBath, type: "fontawesome" },
	"Shared Bathroom": { icon: faBath, type: "fontawesome" },
	"Private Balcony": { icon: faMemory, type: "fontawesome" },
	"1 double bed": { icon: faBed, type: "fontawesome" },
	"1 king-size bed": { icon: faBed, type: "fontawesome" },
	"1 single bed": { icon: faBed, type: "fontawesome" },
	"Sea view": { icon: faWater, type: "fontawesome" },
	"Sea/garden view": { icon: faHouseFloodWater, type: "fontawesome" },
	"Balcony or Terrace": { icon: faMemory, type: "fontawesome" },
};

function RoomType({ room, totalNights, adults, children, hotelId, index, discountedPrice }) {
	const totalCost = (discountedPrice || room.pricePerNight) * totalNights;
	console.log(totalNights);
	return (
		<div className="w-[340px] mb-[30px] bg-white rounded-xl shadow-lg shadow-darkGrey overflow-hidden flex flex-col justify-between">
			<img
				src={room.imgUrl}
				alt="Room"
				className="w-full h-40 object-cover"
			/>
			
			<div className="p-4 flex-grow">
				<h3 className="text-[18px] font-bold text-black">
					{room.roomType}
				</h3>
				<ul className="mt-3 space-y-2 text-black">
					{/* Renderar rumsbeskrivningar med respektive ikon */}
					{room.iconDescription &&
						Array.isArray(room.iconDescription) &&
						room.iconDescription.length > 0 &&
						room.iconDescription.map((desc, index) => (
							<li className="flex items-center" key={index}>
								<span className="mr-2 ml-[4px]">
									{/* Undersöker om ikonen är fontawesome eller custom */}
									{descriptionIcons[desc].type ===
									"fontawesome" ? (
										<FontAwesomeIcon
											icon={descriptionIcons[desc].icon}
											className="text-[16px]"
										/>
									) : descriptionIcons[desc].type ===
									  "custom" ? (
										<SquareMeters className="w-[16px] h-[16px]" />
									) : (
										<img
											src={descriptionIcons[desc].icon}
											alt={desc}
											className="w-[16px] h-[16px]"
										/>
									)}
								</span>
								<p className="text-[13px] ml-2">{desc}</p>
							</li>
						))}

					{/* Renderas ikoner dynamiskt om det finns - Det handlar om att en lista med ikoner renderas för olika bekvämligheter i ett rum, där varje bekvämlighet visas med en ikon och en kontroll (check eller kryss) som indikerar om den är tillgänglig eller inte. */}
					{room.iconAmenities &&
						Object.entries(room.iconAmenities).map(
							([key, value]) => (
								<li
									className="flex items-center text-[13px]"
									key={key}
								>
									<FontAwesomeIcon
										icon={amenityIcons[key]?.icon}
										className="mr-2 text-[16px]"
									/>
									<FontAwesomeIcon
										icon={value ? faCheck : faTimes}
										className={`ml-3 ${
											value
												? "text-roomGreen"
												: "text-roomRed"
										}`}
									/>
									{/* Visar etiketten för en bekvämlighet; använder namnet från ikonobjektet om det finns, annars används nyckeln som standardtext. */}
									<span className="ml-2">
										{amenityIcons[key]?.label || key}
									</span>
								</li>
							)
						)}
					
				</ul>
			</div>
			{/* Pris och Bokningssektion */}
			<div className="bg-opacityLightBlue px-4 py-3 flex items-center justify-between mt-auto">
				<div>
					<span className="text-[18px] font-bold text-black">
						€{room.pricePerNight}/night
					</span>
					<div className="flex items-center mt-1 space-x-2">
						<FontAwesomeIcon
							icon={faUserGroup}
							className="text-lg"
						/>
						<span>
							<p className="text-md font-bold text-black">
								{adults} {adults === 1 ? "Adult" : "Adults"}
							</p>
							{/* Visar antal barn om värde finns*/}
							{children !== undefined && (
								<p className="text-xs text-shadyBlack">
									{children} {children === 1 ? "Child" : "Children"}
								</p>
							)}
						</span>
					</div>
				</div>
				{/* Bokningsinformation och knapp */}
				<div className="ml-auto flex flex-col items-end">
					{room.availableRooms < 3 && (
						<span className="text-accentPink text-[12px] font-semibold">
							Only {room.availableRooms} {room.availableRooms === 1 ? "room" : "rooms"} left
						</span>
					)}
					<Link
						to={`/booking?hotelId=${hotelId}&roomIndex=${index}&adults=${adults}&children=${children}&totalNights=${totalNights}`}
					>
						<Button size="medium" buttonText={"Book"} />
					</Link>
					{/* Visar totalpriset baserat på antal nätter */}
					<div className="py-1">
						<p className="text-xs text-black">
							{totalNights} nights: €{totalCost.toFixed(2)}
						</p>
                    </div> 
				</div>
			</div>
		</div>
	);
}

export default RoomType;
