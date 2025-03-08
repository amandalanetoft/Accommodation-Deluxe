/* eslint-disable no-unused-vars */
import React from "react";
import Header from "../components/Header";
import OfferSlider from "../components/OfferSlider";
import Recommendations from "../components/Recommendations";
import TrendingDestinations from "../components/TrendingDestinations";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

//Komponent för startsidan
function HomePage() {

	// Använder useNavigate för att omdirigera användaren till en ny URL
	const navigate = useNavigate();

	// Hanterar sökningen som skickas från SearchBar-komponenten
	const handleSearch = ({
		location,
		startDate,
		endDate,
		adults,
		children,
		rooms,
	}) => {
		// Skapar en URL med sökparametrarna från användarens input
		const params = new URLSearchParams({
			location,
			checkin: startDate,
			checkout: endDate,
			adults: adults.toString(),
			children: children.toString(),
			rooms: rooms.toString(),
		});
		// Navigerar användaren till sidan med hotellresultat med sökparametrarna i URL:en
		navigate(`/hotels?${params.toString()}`);
	};
	return (
		<div>
			{/* Header and Sökbar */}
			<div className="relative">
				<Header
					size="large"
					headingText={
						<>
							{"Your key to the world's best hotels"} <br />
							{"- book fast, travel smart"}
						</>
					}
				/>
				<div className="absolute bottom-[-50px] w-full flex justify-center">
					{/* Anropar SearchBar-komponenten och skickar funktionen handleSearch som en prop */}
					<SearchBar onSearch={handleSearch} />
				</div>
			</div>

			<div className="mt-16">
				{/* Visar OfferSlider-komponenten (en karusell med erbjudanden) */}

				<OfferSlider />
			</div>
			<div className="w-11/12 max-w-7xl mx-auto">
				<div>
					{/* Visar Recommendations-komponenten (rekommenderade hotell eller destinationer) */}
					<Recommendations />
				</div>
				<div>
					{/* Visar TrendingDestinations-komponenten (trendiga destinationer) */}
					<TrendingDestinations />
				</div>
			</div>
		</div>
	);
}

export default HomePage;