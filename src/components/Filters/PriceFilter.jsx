// PriceFilter.jsx
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Range } from "react-range";

// eslint-disable-next-line react/prop-types
const PriceFilter = ({ setFilters }) => {
	const [values, setValues] = useState([0, 500]); // Initiala värden för prisintervallet
	const STEP = 1;
	const MIN = 0; // Minimivärde för pris
	const MAX = 500; // Maxvärde för pris

	// Uppdaterar värdena för prisintervallet och skickar dem till överordnad komponent
	const handleRangeChange = (newValues) => {
		// Uppdaterar tillståndet genom att sätta det till de nya värdena (newValues)
		setValues(newValues);
		setFilters((prev) => ({ ...prev, price: newValues })); // Sparar nya prisvärden i filtren
	};

	// Fejkat stapeldiagram för att visualisera prisdistributionen
	const distributionBars = [
		30, 40, 40, 40, 70, 100, 80, 30, 30, 70, 80, 80, 30, 30, 30, 50, 30, 50,
		30, 70, 70, 50, 30, 30, 30, 50, 30, 30, 30, 20, 10, 20, 40,
	];

	return (
		<div>
			<div className="p-4 max-w-sm">
				<div className="flex w-full items-center -mx-3 pb-4 mb-8">
					<h3 className="text-lg font-semibold">Price</h3>
				</div>
				<div className="">
					{/* Används för att rendera en uppsättning "staplar" baserat på höjderna i "distributionBars", där varje stapel representeras av en div med en specifik höjd och stil */}
					<div className="flex items-end justify-between h-16 mb-6">
						{distributionBars.map((height, index) => (
							<div
								key={index}
								className="w-[4px] bg-grey rounded-full"
								style={{
									height: `${height}px`,
								}}
							/>
						))}
					</div>

					{/* Anänds för att visa ett intervallreglage som gör det möjligt för användaren att välja ett värde eller ett intervall mellan ett definierat minimi- och maximivärde.*/}
					<Range
						values={values}
						step={STEP}
						min={MIN}
						max={MAX}
						onChange={handleRangeChange} // Funktion som anropas när användaren justerar intervallet.

						// Renderar den visuella representationen av intervallet.
						renderTrack={({ props, children }) => ( 
							<div
								{...props}  // Sprider ut nödvändiga egenskaper för att styra utseendet och beteendet.
								className="w-full h-[6px] relative"

								// Skapar en bakgrundsgradient som visar intervallet mellan två valda värden.
								style={{
									background: `linear-gradient(to right, #d9d9d9 ${
										((values[0] - MIN) / (MAX - MIN)) * 100
									}%, #002359 ${
										((values[0] - MIN) / (MAX - MIN)) * 100
									}%, #002359 ${
										((values[1] - MIN) / (MAX - MIN)) * 100
									}%, #d9d9d9 ${
										((values[1] - MIN) / (MAX - MIN)) * 100
									}%)`,
								}}
							>
								{children}
							</div>
						)}

						// Används för att göra en liten rund, mörkblå knapp som kan dras för att ändra värdet i reglaget.
						renderThumb={({ props }) => (
							<div
								{...props}
								className="h-[20px] w-[20px] bg-primaryDarkBlue rounded-full shadow-md flex justify-center items-center"
							/>
						)}
					/>

					{/* Visar valda minimum- och maxvärden */}
					<div className="flex justify-between mt-4">
						<div className="p-2 border border-accentPink rounded-md">
							<p className="text-xs">Minimum</p>
							<p className="text-sm font-bold">{values[0]} EUR</p>
						</div>
						<div className="p-2 border border-accentPink rounded-md">
							<p className="text-xs">Maximum</p>
							<p className="text-sm font-bold">{values[1]} EUR</p>
						</div>
					</div>
				</div>
			</div>
			<div className="border-b border-grey -mx-4"></div>
		</div>
	);
};

export default PriceFilter;
