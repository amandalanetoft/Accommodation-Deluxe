/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { createContext, useContext, useState, useEffect } from "react";

// Skapar en kontext för att hantera favorithotell globalt i applikationen
const FavoritesContext = createContext();

// Provider-komponent som hanterar favoritlistan och gör den tillgänglig för applikationen
export function FavoritesProvider({ children }) {
	const [favorites, setFavorites] = useState([]);

	// Använder useEffect för att läsa in favorithotell från localStorage vid första renderingen
	useEffect(() => {
		const savedFavoritesIds =
			JSON.parse(localStorage.getItem("likedHotels")) || []; // Hämtar sparade favorit-ID:n från localStorage
		const uniqueFavorites = [...new Set(savedFavoritesIds)]; // Säkerställer unika favorit-ID:n
		const favoritesFromStorage = uniqueFavorites.map((id) => ({ id })); // Skapar objekt för varje hotell baserat på ID
		setFavorites(favoritesFromStorage);
	}, []);

	// Funktion för att lägga till eller ta bort hotell från favoritlistan
	const toggleFavorites = (hotel) => {
		setFavorites((prevFavorites) => {
			const isFavorite = prevFavorites.some((fav) => fav.id === hotel.id); // Kontrollera om hotellet redan finns i favoriter
			let updatedFavorites;
			if (isFavorite) {
				// Om hotellet är favorit, tas det bort från listan
				updatedFavorites = prevFavorites.filter(
					(fav) => fav.id !== hotel.id
				);
			} else {
				// Annars läggs hotellet till i favoritlistan
				updatedFavorites = [...prevFavorites, hotel];
			}
			localStorage.setItem(
				"likedHotels",
				JSON.stringify(updatedFavorites.map((h) => h.id))
			); // Sparar uppdaterad favoritlista till localStorage
			return updatedFavorites;
		});
	};

	// Funktion för att ta bort ett hotell från favoriter med specifikt ID
	const removeFavorite = (hotelId) => {
		setFavorites((prevFavorites) => {
			const updatedFavorites = prevFavorites.filter(
				(fav) => fav.id !== hotelId
			); // Tar bort hotellet från favoritlistan
			localStorage.setItem(
				"likedHotels",
				JSON.stringify(updatedFavorites.map((h) => h.id))
			); // Sparar uppdaterad lista till localStorage
			return updatedFavorites;
		});
	};

	// Tillgängliggör favoriter, toggle-funktion och remove-funktion via kontexten
	return (
		<FavoritesContext.Provider
			value={{ favorites, toggleFavorites, removeFavorite }}
		>
			{children}
		</FavoritesContext.Provider>
	);
}

// Hook för att komma åt favoritkontexten i andra komponenter
export function useFavorites() {
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within a FavoritesProvider"); // Kastar ett fel om hooken används utanför FavoritesProvider
	}
	return context;
}