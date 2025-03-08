// eslint-disable-next-line no-unused-vars
import React from "react";
import TrendingDestinationCard from "./TrendingDestinationCard";
import { useHotelData } from "../contexts/HotelDataContext"; 

function TrendingDestinations() {
	const { trendingDestinations, error } = useHotelData(); //Hämtar data från context

	// Hantering av eventuella fel när data hämtas
	if (error) {
		return <p>Error loading trending destinations.</p>;
	}

	// Säkerställer att trendingdestinations har data
	if (!trendingDestinations || trendingDestinations.length < 3) {
		return <p>Loading trending destinations...</p>;
	}

	return (
		<div className="p-8">
			<h2 className="text-3xl font-semibold mb-2">
				Trending destinations
			</h2>
			<p className="text-lg text-shadyBlack mb-6">
				Discover accommodations in trendy destinations
			</p>

			{/* Container för trendingdestinationcards */}
			<div className="flex gap-10">
				{/* Vänstra sektionen med två medelstora kort */}
				<div className="flex flex-col gap-10">
					<TrendingDestinationCard
						imageSrc={trendingDestinations[0].image}
						location={trendingDestinations[0].name}
						destinationId={trendingDestinations[0].id}
						size="medium"
						textSize="medium"
					/>
					<TrendingDestinationCard
						imageSrc={trendingDestinations[1].image}
						location={trendingDestinations[1].name}
						destinationId={trendingDestinations[1].id} 
						size="medium"
						textSize="medium"
					/>
				</div>
				{/* Högra sektionen för stort kort */}
				<TrendingDestinationCard
					imageSrc={trendingDestinations[2].image}
					location={trendingDestinations[2].name}
					destinationId={trendingDestinations[2].id} 
					size="large"
					textSize="large"
				/>
			</div>
		</div>
	);
}

export default TrendingDestinations;
