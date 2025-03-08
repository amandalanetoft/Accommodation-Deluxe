// eslint-disable-next-line no-unused-vars
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHotel,
  faBed,
  faUtensils,
  faWater,
  faDumbbell,
  faCloudSun,
} from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import ThumbsUpThumbsDownIcon from "../assets/icons/MaterialSymbolsThumbsUpDownOutline";
import { NavLink, useParams, useLocation } from "react-router-dom";

// Definierar en lista av objekt vilka representerar menyval
const menuItems = [
  { icon: faHotel, text: "About the hotel", link: "about" },
  { icon: faBed, text: "Rooms", link: "rooms" },
  { icon: faUtensils, text: "Food & drinks", link: "food-and-drinks" },
  { icon: faWater, text: "Pool & Beach", link: "pool" },
  { icon: faDumbbell, text: "Activities", link: "activities" },
  { icon: faMap, text: "Map", link: "map" },
  { icon: faCloudSun, text: "Weather", link: "weather" },
  { icon: ThumbsUpThumbsDownIcon, text: "Reviews", link: "reviews" },
];

// Define the component
function HotelNavBar() {
  const { hotelId } = useParams(); // Hämtar hotelid från urlen
  const { search } = useLocation(); // Hämtar nuvarande sökparametrar från URL:en

  return (
    // Container menyn -bakgrundsfärg, höjd och bredd
    <div className="w-full h-[100px] bg-opacityLightBlue flex items-center justify-center">
      {/* Inner div vilken inkluderar menyvalen*/}
      <div className="w-[1139px] h-[100px] flex justify-between items-center">
        {/* Itererar genom menyalternativen och skapar en NavLink-element för respektive item */}
        {menuItems.map((menuItem, index) => (
          <NavLink
            to={`/hotels/${hotelId}/${menuItem.link}${search}`} // Dynamisk routing med aktuella sökparametrar
            key={index}
            className={`flex flex-col items-center justify-center w-[142px] h-[100px] cursor-pointer hover:bg-opacityDarkBlue transition-colors duration-200`}
            style={({ isActive }) => ({
              borderBottom: isActive ? "4px solid #FF6480" : "none",
              color: isActive ? "#FF6480" : "#111",
            })}
          >
             {/* Använder ThumbsUpThumbsDownIcon direkt om ikonen matchar, annars använder vi FontAwesome */}
            {menuItem.icon === ThumbsUpThumbsDownIcon ? (
              <ThumbsUpThumbsDownIcon className={`text-2xl`} />
            ) : (
              <FontAwesomeIcon icon={menuItem.icon} className={`text-2xl`} />
            )}
            {/* Text under varje ikon som representerar menyvalet */}
            <span className="mt-2 text-[12px] text-black">{menuItem.text}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default HotelNavBar;
