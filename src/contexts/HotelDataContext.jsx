/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
// HotelDataContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const HotelDataContext = createContext();

export function HotelDataProvider({ children }) {
	const [hotelData, setHotelData] = useState([]);
	const [offers, setOffers] = useState([]);
	const [countries, setCountries] = useState([]);
	const [trendingDestinations, setTrendingDestinations] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		// Hämtar hotelldata från en JSON-fil
		axios
			.get("/data/hotels.json")
			.then((response) => {
				console.log("Fetched hotel data in context:", response.data); // Loggar den hämtade datan
				setHotelData(response.data.hotels); // Uppdaterar hotelldata
				setOffers(response.data.offers);   // Hämtar erbjudanden från samma JSON-fil
				setTrendingDestinations(response.data.trendingDestinations); // Uppdaterar trendiga resmål
				setCountries(response.data.countries); // Uppdaterar länder
			})

			.catch((error) => {
				console.error("Error fetching the data in context", error); // Loggar eventuella fel
				setError(error); // Uppdaterar felstatus
			});
	}, []);

	// Tom array som beroende för att köra effekten bara en gång vid första renderingen
	return (
		<HotelDataContext.Provider value={{ hotels: hotelData, offers, countries, trendingDestinations, error }}>
			{children}
		</HotelDataContext.Provider>
	);
}


// Hook för att använda hotelldata
export function useHotelData() {
	// Returnerar kontexten
	return React.useContext(HotelDataContext);
}






