/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, Outlet } from "react-router-dom";
import { useHotelData } from "../contexts/HotelDataContext";
import HotelNavBar from "../components/HotelNavBar";
import HotelHeroSection from "../components/HotelHeroSection";

function HotelDetailPage() {
  const { hotelId } = useParams(); // Hämtar hotelId från URL:en
  const { hotels, error } = useHotelData(); // Hämtar hoteldata från Context

  // Hanterar fel- och laddningstillstånd
  if (error) {
    return <p>Error loading hotel data: {error.message}</p>;
  }
  if (!hotels) {
    return <p>Loading hotel data...</p>;
  }

  //Hittar det specifika hotellet med hjälp av hotelId
  const hotel = hotels.find((hotel) => hotel.id === Number(hotelId));

  // Handle fall om hotellet inte hittas
  if (!hotel) {
    return <p>Hotel not found.</p>;
  }
// Skapar en variabel images som antingen innehåller hotellets bilder (om de finns) eller en tom array om inga bilder finns
  const images = hotel.images || []; 

  return (
    <div>
      {/*Headersektion */}
      <HotelHeroSection imageUrl={images[0]} hotelName={hotel.name} />
      {/* Navigations meny */}
      <HotelNavBar />
      
      {/* Används för att möjliggöra "nested routes", det vill säga för att visa olika undersidor med samma övergripande layout. */}
      <Outlet />

     
    </div>
  );
}

export default HotelDetailPage;
