/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { createContext, useState, useContext } from "react";

// Skapar en kontext för sökparametrar
const SearchParamsContext = createContext();

// Provider-komponent som hanterar sökparametrar och gör dem tillgängliga i applikationen
export const SearchParamsProvider = ({ children }) => {
	// Definierar sökparametrar som ska hållas i tillståndet
	const [searchParams, setSearchParams] = useState({
		startDate: null,
		endDate: null,
		adults: 0,
		children: 0,
		nights: 0,
		rooms: 0,
		hotelId: null,
		roomIndex: null,
		isNextToEachOther: 0, // Anger om rummen ska vara bredvid varandra
	});

	// Tillgängliggör sökparametrar och metoden för att uppdatera dem
	return (
		<SearchParamsContext.Provider value={{ searchParams, setSearchParams }}>
			{children}
		</SearchParamsContext.Provider>
	);
};

// Anpassad hook som används för att komma åt sökparametrarna från kontexten
export const useSearchParamsContext = () => useContext(SearchParamsContext);
