// eslint-disable-next-line no-unused-vars
import React from 'react';
import useHotelDetails from '../hooks/useHotelDetails';
import Map from "../components/Map";
import RoomCardsSection from "../components/RoomCardsSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

function MapPage() {
  const { hotel, error, loading } = useHotelDetails(); //använder data från de specifika hotellet

  // Hanterar laddning och eventuella fel 
  if (loading) {
    return <p>Loading hotel data...</p>;
  }
  if (error) {
    return <p>Error loading hotel data: {error.message}</p>;
  }
  if (!hotel) {
    return <p>Hotel not found.</p>;
  }

  // Extraherar mapdata från de specifika hotellet
  const mapData = hotel.map;
  const { title, location, zoomLevel, marker } = mapData;

  return (
    <div>
      <div className="w-[85%] mx-auto mt-8">
        <div className="flex justify-between w-[85%] mx-auto mt-8">
          <div className="w-[60%] pr-8">
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
          </div>
        </div>
        {/* Renderar kartan centrerat på sidan */}
        <div className="flex justify-center ">
          <Map
            latitude={location.latitude}
            longitude={location.longitude}
            zoomLevel={zoomLevel}
            marker={marker}
          />
        </div>
        {/* Visa hotellets adress */}
        <div className="text-center mt-4">
          <p className="text-md">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className="text-accentPink mr-2"
            />
            {location.address}
          </p>
        </div>
      </div>
      {/* Sektion för att visa RoomCardSection */}
      <RoomCardsSection />
    </div>
  );
}

export default MapPage;
