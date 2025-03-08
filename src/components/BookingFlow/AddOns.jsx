/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import AirportTransferSearchBar from "../AirportTransfer/AirportTransferSearchBar";
import SimpleCarCard from "../AirportTransfer/SimpleCarCard";
import CarAdded from "../AirportTransfer/CarAdded";


// Används för att hantera tillägg av flygplatstransferalternativ
function AddOns({
	airportTransferSelected,
	setAirportTransferSelected,
	transferData,
	setTransferData,
	isTransferAdded,
	setIsTransferAdded,
	addedTransferData,
	setAddedTransferData,
}) {
	// Hanterar sökningen från AirportTransferSearchBar
	const handleSearch = (oneWayData, returnTripData) => {
		setTransferData({ ...oneWayData, returnTrip: returnTripData });
	};

	// Hanterar när användaren lägger till transfern i SimpleCarCard. Inkluderar att spara transferdata för att visa i CarAdded samt att återställa transferdata för att dölja SimpleCarCard
	const handleAddTransfer = () => {
		setIsTransferAdded(true);
		setAddedTransferData(transferData);
		setTransferData(null); 
	};

	// Hanterar när användaren tar bort transfern i CarAdded. Hanterar avmarkering av kryssrutan
	const handleRemoveTransfer = () => {
		setIsTransferAdded(false);
		setAddedTransferData(null);
		setAirportTransferSelected(false);
	};

// Returnerar element som representerar en sektion för att lägga till flygplatstransfer
	return (
		<div>

			{/* Container med stil för flygplatstransfer-alternativet */}
			<div className="border p-4 h-auto w-full border-lightGrey mx-auto rounded-[10px] shadow-lg overflow-hidden bg-white">
				<div className="p-6 space-y-4">
					<h2 className="text-[24px] font-bold mb-4">
						Add to your stay
					</h2>
					{/* Linje som separerar */}
					<hr className="border-t border-lightGrey mb-9" />
					<div className="flex items-center">

						{/* För att välja flygplatstransfer. Hanterar ändring av kryssrutan genom att: växlar valet, återställer data och indikerar att transfer inte längre är tillagd.*/}
						<input
							type="checkbox"
							checked={airportTransferSelected}
							onChange={() => {
								setAirportTransferSelected(
									!airportTransferSelected
								);
								setTransferData(null);
								setIsTransferAdded(false);
								setAddedTransferData(null);
							}}
							className="form-checkbox h-5 w-5 accent-accentPink"
						/>
						<span className="flex items-center ml-2">
							<span className="font-medium text-[16px]">
								Airport transfer
							</span>
						</span>
					</div>

					{/* Informerande text om flygplatstransfer */}
					<p className="text-[12px] text-darkGrey mt-2">
						Add hassle-free airport transfers to and from your
						accommodation.
					</p>
				</div>
			</div>

			{/* Används för att visa AirportTransferSearchBar när kryssrutan är markerad och ingen transfer har lagts till */}
			{airportTransferSelected && !isTransferAdded && !transferData && (
				<div className="mt-4 flex justify-center mx-auto">
					<AirportTransferSearchBar onSearch={handleSearch} />
				</div>
			)}

			{/* Används för att visa SimpleCarCard när transferData är inställt och transfern ännu inte har lagts till */}
			{transferData && !isTransferAdded && (
				<SimpleCarCard
					transferData={transferData}
					onAdd={handleAddTransfer}
				/>
			)}

			{/* Avänds för att visa CarAdded när transfern har lagts till */}
			{isTransferAdded && addedTransferData && (
				<div className="mt-4 flex justify-center mx-auto">
					<CarAdded
						transferData={addedTransferData}
						onRemove={handleRemoveTransfer}
					/>
				</div>
			)}
		</div>
	);
}

export default AddOns;
