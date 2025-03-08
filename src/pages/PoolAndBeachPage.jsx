// import PoolAndBeach from "../components/PoolAndBeach";
import RoomCardsSection from "../components/RoomCardsSection";

import useHotelDetails from "../hooks/useHotelDetails"; // Hämta hotellinformation från hooks useHotelsDetails
import InfoBoxSpecificHotel from "../components/InfoBoxSpecificHotel";

function PoolAndBeachTheHotelPage() {
	const { hotel, error, loading } = useHotelDetails();
	// Hanterar laddning och fel om hotellet inte hittas
	if (loading) {
		return <p>Loading hotel data...</p>;
	}
	if (error) {
		return <p>Error loading hotel data: {error.message}</p>;
	}
	if (!hotel) {
		return <p>Hotel not found.</p>;
	}

	const poolAndBeach = hotel.poolAndBeach || {};// Hämtar pool/strandinformation från specifika hotellet, med fallback till tomt objekt
	const beaches = poolAndBeach.beaches || []; // Hämtar stränder som array, fallback till tom om inga stränder finns

	// Definierar innehållet för infoBox
	const infoBoxContent = poolAndBeach.infoBox
		? {
				title: poolAndBeach.infoBox.title,
				additionalInformation:
					poolAndBeach.infoBox.additionalInformation,
				optionsTitle: poolAndBeach.infoBox.optionsTitle,
				extraInformation: poolAndBeach.infoBox.extraInformation,
		  }
		: null;

	return (
		<div>
			<div className="w-[85%] mx-auto mt-8">
				{/* Sektion med hotellinformation */}
				<div className="flex justify-between w-[85%] mx-auto mt-8">
					<div className="w-[70%] pr-8">
						{/* Check if poolAndBeach data exists before rendering */}
						{poolAndBeach.headingText && (
							<h2 className="text-[32px] font-bold mb-4">
								{poolAndBeach.headingText}
							</h2>
						)}
						{/* Renderar inledande paragraf om den finns */}
						{poolAndBeach.introParagraph && (
							<p className="text-[16px] text-black mb-4">
								{poolAndBeach.introParagraph}
							</p>
						)}

						<div className="w-[100%] rounded-lg">
							<div className="flex space-x-4 mb-6">
								{/* Huvudbild tar upp 50% av utrymmet */}
								<img
									src={poolAndBeach.images[0]}
									alt="Main Image"
									className="w-1/2 h-[300px] rounded-lg shadow"
								/>
								{/* Definerar bredd, höjd och mellanrummet för det återstående två bilderna*/}
								<div className="flex flex-col space-y-4 w-1/2">
									<img
										src={poolAndBeach.images[1]}
										alt="Image 2"
										className="w-full h-[145px] rounded-lg shadow"
									/>
									<img
										src={poolAndBeach.images[2]}
										alt="Image 3"
										className="w-full h-[145px] rounded-lg shadow"
									/>
								</div>
							</div>
						</div>

						{/* Renderar strandinformation om stränder finns, annars visa fallback-meddelande, annars visa fallback-meddelande */}
						{beaches.length > 0 ? (
							beaches.map((item, index) => (
								<div key={index} className="mb-6">
									<h3 className="text-[20px] font-bold text-black mb-2">
										{item.title}
									</h3>
									<p className="text-[16px] text-black">
										{item.description}
									</p>
								</div>
							))
						) : (
							<p>No beaches available at this hotel.</p> // Fallbackmedelande om ingen data hittas
						)}
					</div>

					{/* Höger kolumn för infoBox, renderas endast om infoBoxContent finns*/}
					{infoBoxContent && (
						<InfoBoxSpecificHotel {...infoBoxContent} />
					)}
				</div>
			</div>
			<div>
				{/* Sektion för att visa RoomCardSection */}
				<RoomCardsSection />
			</div>
		</div>
	);
}

export default PoolAndBeachTheHotelPage;
