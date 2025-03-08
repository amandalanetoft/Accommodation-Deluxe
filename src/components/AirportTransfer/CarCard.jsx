// CarCard.jsx
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Car from "../../assets/images/Car.png";
import Button from "../Button";
import GuestDetailsForm from "../BookingFlow/GuestDetailsForm";
import PaymentForm from "../BookingFlow/PaymentForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarAlt,
	faClock,
	faUserFriends,
	faSuitcaseRolling,
	faShoppingBag,
	faCheck,
	faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
//Information om vald transfer/hanterar bokningsprocessen steg för steg
function CarCard({ transferData, onConfirm }) {
	// Håller reda på nuvarande steg i bokningsprocessen
	const [currentStep, setCurrentStep] = useState(0);

	// Hanterar visning av "Confirm"-knappen
	const [showConfirmButton, setShowConfirmButton] = useState(false);

	// Går till nästa steg och visar "Confirm"-knappen om vi är på första steget
	const handleNextStep = () => {
		setCurrentStep(currentStep + 1);
		if (currentStep === 0) {
			setShowConfirmButton(true);
		}
	};

	return (
		<div className="w-full max-w-[800px] bg-white rounded-lg p-6 shadow-md mx-auto mt-8">
			{/* Detaljer för enkelresa*/}
			<div className="flex justify-between items-center mb-4">
				<div className="flex flex-col items-start">

          {/* Renderar en rubrik (h2) med texten "Standard car – Return" eller "Standard car – One way" beroende på om transferData.returnTrip är sant eller falskt.*/}
					<h2 className="text-xl font-bold mb-4">
						Standard car –{" "}
						{transferData.returnTrip ? "Return" : "One way"}
					</h2>
					<img
						src={Car}
						alt="Car"
						className="w-[200px] h-auto rounded-lg"
					/>
				</div>

        {/* Renderar en "flex-container" som innehåller två listor med information om transferdetaljer. Den första listan visar avrese- och destinationinformation, datum och tid, medan den andra listan visar antalet passagerare, väskor och information om gratis avbokning. Varje lista innehåller ikoner från FontAwesome för att visuellt representera informationen. */}
				<div className="flex-grow ml-4">
					<div className="flex">
						<ul className="text-darkGrey text-sm space-y-2">
							<li className="flex items-center">
								<FontAwesomeIcon
									icon={faMapMarkerAlt}
									className="mr-2"
								/>{" "}
								From: {transferData.fromLocation}
							</li>
							<li className="flex items-center">
								<FontAwesomeIcon
									icon={faMapMarkerAlt}
									className="mr-2"
								/>{" "}
								To: {transferData.toLocation}
							</li>
							<li className="flex items-center">
								<FontAwesomeIcon
									icon={faCalendarAlt}
									className="mr-2"
								/>{" "}
								{transferData.date}
							</li>
							<li className="flex items-center">
								<FontAwesomeIcon
									icon={faClock}
									className="mr-2"
								/>{" "}
								{transferData.time}
							</li>
						</ul>
						<ul className="text-darkGrey text-sm space-y-2 ml-8">
							<li className="flex items-center">
								<FontAwesomeIcon
									icon={faUserFriends}
									className="mr-2"
								/>{" "}
								{transferData.passengers} people
							</li>
							<li className="flex items-center">
								<FontAwesomeIcon
									icon={faSuitcaseRolling}
									className="mr-2"
								/>{" "}
								5 suitcases
							</li>
							<li className="flex items-center">
								<FontAwesomeIcon
									icon={faShoppingBag}
									className="mr-2"
								/>{" "}
								6 smaller bags
							</li>
							<li className="flex items-center">
								<FontAwesomeIcon
									icon={faCheck}
									className="mr-2 text-roomGreen"
								/>{" "}
								Free cancellation
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* Används för att renderar en div som innehåller information om en standardbil för returer. Denna del visas endast om 'returnTrip' är sant och innehåller en rubrik  som anger att bilen är för en returresa. */}
			{transferData.returnTrip && (
				<div className="flex justify-between items-center mb-4">
					<div className="flex flex-col items-start">
						<h2 className="text-xl font-bold mb-4">
							Standard car – Return
						</h2>
						<img
							src={Car}
							alt="Car"
							className="w-[200px] h-auto rounded-lg"
						/>
					</div>
          
          {/*Se tidigare kommentar, samma koncept, men listan är för retur-resan istället */}
					<div className="flex-grow ml-4">
						<div className="flex">
							<ul className="text-darkGrey text-sm space-y-2">
								<li className="flex items-center">
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className="mr-2"
									/>{" "}
									From: {transferData.returnTrip.fromLocation}
								</li>
								<li className="flex items-center">
									<FontAwesomeIcon
										icon={faMapMarkerAlt}
										className="mr-2"
									/>{" "}
									To: {transferData.returnTrip.toLocation}
								</li>
								<li className="flex items-center">
									<FontAwesomeIcon
										icon={faCalendarAlt}
										className="mr-2"
									/>{" "}
									{transferData.returnTrip.date}
								</li>
								<li className="flex items-center">
									<FontAwesomeIcon
										icon={faClock}
										className="mr-2"
									/>{" "}
									{transferData.returnTrip.time}
								</li>
							</ul>

							<ul className="text-darkGrey text-sm space-y-2 ml-8">
								<li className="flex items-center">
									<FontAwesomeIcon
										icon={faUserFriends}
										className="mr-2"
									/>{" "}
									{transferData.returnTrip.passengers} people
								</li>
								<li className="flex items-center">
									<FontAwesomeIcon
										icon={faSuitcaseRolling}
										className="mr-2"
									/>{" "}
									5 suitcases
								</li>
								<li className="flex items-center">
									<FontAwesomeIcon
										icon={faShoppingBag}
										className="mr-2"
									/>{" "}
									6 smaller bags
								</li>
								<li className="flex items-center">
									<FontAwesomeIcon
										icon={faCheck}
										className="mr-2 text-roomGreen"
									/>{" "}
									Free cancellation
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}

			{/* Pris och knapp längst ned */}
			<div className="text-center mt-4">
				{!showConfirmButton && (
					<div className="flex flex-col items-end justify-end">
						{/* Visar bara returpriset om returvisa valts */}
						{transferData.returnTrip ? (
							<p className="text-lg font-bold mb-2 text-center">
								Tot: €144
							</p>
						) : (
							<p className="text-lg font-bold mb-2 text-center">
								Tot: €78
							</p>
						)}
						<Button
							size="medium"
							buttonText="Choose"
							onClick={handleNextStep}
						/>
					</div>
				)}
			</div>

			{/* Används för att visa "GuestDetailsForm" */}
			{currentStep >= 1 && (
				<div className="w-full max-w-[600px] mx-auto mt-6">
					<GuestDetailsForm onNext={handleNextStep} />
				</div>
			)}

			{/* Används för att visa "PaymentForm" */}
			{currentStep >= 1 && (
				<div className="w-full max-w-[600px] mx-auto mt-6">
					<PaymentForm />
				</div>
			)}

			{/* Används för att rendera en bekräftelseknapp om "showConfirmButton" är sant och "currentStep" är 1 eller mer. Knappen anropar onConfirm-funktionen när den klickas. */}
			{showConfirmButton && currentStep >= 1 && (
				<div className="text-center mt-6">
					<Button
						size="large"
						buttonText="Confirm"
						onClick={onConfirm} 
					/>
				</div>
			)}
		</div>
	);
}

export default CarCard;
