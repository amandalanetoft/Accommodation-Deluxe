/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faGift } from '@fortawesome/free-solid-svg-icons';
import { faCcPaypal, faCcApplePay } from '@fortawesome/free-brands-svg-icons';
import Button from '../Button';
import AmericanExpress from "../../assets/images/AmericanExpress.png"
import MasterCard from "../../assets/images/MasterCard.png";
import Visa from "../../assets/images/Visa.png";
import SecurityCodeQuestionMark from './SecurityCodeQuestionMark';

// Används för att definera de betalningsmetoder som ska gå att välja med tillhörande ikoner
const cards = [
	{ id: "card", icon: faCreditCard, label: "Card" },
	{ id: "paypal", icon: faCcPaypal, label: "PayPal" },
	{ id: "giftcard", icon: faGift, label: "Gift Card" },
	{ id: "applepay", icon: faCcApplePay, label: "Apple Pay" },
];

//Huvudkomponent för betalning
function PaymentForm() {

  //Använder "useState" för att kontrollera vald betalningsmetod
  const [paymentMethod, setPaymentMethod] = useState('card');

  //Funktion för att rendera olika delar beroende på vald betalningsmetod
  const renderPaymentFields = () => {
    switch (paymentMethod) {

      //För kortbetalning
      case 'card':
        return (
			<div>
				{/* Kort - Formulär-del som inkluderar input-fält för att samla användarens betalningsinformation. Det handlar om fält för örnamn, efternamn, kortnummer, utgångsdatum (månad/år) och säkerhetskod. Respektive fält har en "etikett" (för vad som efterfrågas) och följs av ett input-fält. För att styla innehållet har Tailwind-css använts. */}
				<div className="mb-4">
					<label className="block text-sm font-medium text-black">
						First name <span className="text-accentPink">*</span>
					</label>
					<input
						type="text"
						className="mt-1 block w-full h-12 rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4"
						placeholder="Enter your first name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-black">
						Last name <span className="text-accentPink">*</span>
					</label>
					<input
						type="text"
						className="mt-1 block w-full h-12 rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4"
						placeholder="Enter your last name"
					/>
				</div>
				<div className="mb-4">
					<label className="block text-sm font-medium text-black">
						Card number <span className="text-accentPink">*</span>
					</label>
					<input
						type="text"
						className="mt-1 block w-full h-12 rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4"
						placeholder="0000 0000 0000 0000"
					/>
				</div>
				<div className="mb-4">
					<div className="w-full mb-4">
						<label className="block text-sm font-medium text-black">
							Expire date{" "}
							<span className="text-accentPink">*</span>
						</label>
						<div className="flex">
							<input
								type="text"
								className="mt-1 w-[100px] h-[30px] rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4"
								placeholder="MM"
							/>
							<span className="mx-2 mt-2">/</span>
							<input
								type="text"
								className="mt-1 w-[100px] h-[30px] rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4"
								placeholder="YY"
							/>
						</div>
					</div>

					<div className="w-full">
						<label className="block text-sm font-medium text-black">
							Security code{" "}
							<span className="text-accentPink">*</span>
						</label>
						<div className="flex">
							<input
								type="text"
								className="mt-1 block w-[100px] h-[30px] rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4"
								placeholder="000"
							/>
							{/*Används för att visa information om var säkerhetskoden kan hittas*/}
							<div className="mx-3">
								<SecurityCodeQuestionMark />
							</div>
						</div>
					</div>
				</div>
			</div>
		);


      //För PayPal-betalning
      case 'paypal':
        return (
          <>
          {/*Se tidigare kommmentar "Kort - ..." - Det är samma koncept som följs här */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Email <span className="text-accentPink">*</span></label>
              <input type="email" className="mt-1 block w-full h-12 rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4" placeholder="Enter your email" />
            </div>

            {/* Knapp för att bekräfta betlaningen via PayPal*/}
					<div className="flex items-center justify-start">
							<Button size="medium" buttonText="To PayPal" />
					</div>
          
          {/*Informationstext om PayPal */}
            <p className="mt-2 text-sm text-darkGrey">
              You will be redirected to PayPal&apos;s secure website to complete the payment.
            </p>
          </>
        );


      //För betalning med presentkort
      case 'giftcard':
        return (
          <>
        
            {/*Se tidigare kommmentar "Kort - ..." - Det är samma koncept som följs här */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Enter the gift card number (16 numbers) <span className="text-accentPink">*</span></label>
              <input type="text" className="mt-1 block w-[200px] h-[30px] rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4" placeholder="0000 0000 0000 0000" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Enter the pin code of the gift card (8 numbers) <span className="text-accentPink">*</span></label>
              <input type="text" className="mt-1 block w-[100px] h-[30px] rounded-md border-lightGrey shadow-sm placeholder:text-[14px] pl-4" placeholder="0000 0000" />
            </div>

            {/* Knapp för att bekräfta presenkortsuppgifterna*/}
					<div className="flex items-center justify-start">
							<Button size="medium" buttonText="check" />
					</div>
          </>
        );


      //För betalning med ApplePay
      case 'applepay':
        return (
          <>
          
           {/*Se tidigare kommmentar "Kort - ..." - Det är samma koncept som följs här */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">Email <span className="text-accentPink">*</span></label>
              <input type="email" className="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm placeholder:text-[14px] pl-4" placeholder="Enter your email" />
            </div>

            {/* Knapp för att bekräfta betlaningen via Apple Pay*/}
            <div className="flex items-center justify-start">
							<Button size="medium" buttonText="To Apple Pay" />
					</div>

          {/*Informationstext om Apple Pay*/}
            <p className="mt-2 text-sm text-darkGrey">
              You will be redirected to Apple Pay to complete the payment.
            </p>
          </>
        );
      default:
        return null;
    }
  };

  //Används för att returnera huvudstrukturen för betalnings-delen
  return (
		<div className="w-full h-auto border border-lightGrey mx-auto rounded-[10px] shadow-lg overflow-hidden bg-white p-8">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-[24px] font-bold text-black">
					Payment details
				</h2>

				{/*Bilder för att representera de betlaningskort som accepteras*/}
				<div className="flex space-x-4">
					<img
						src={AmericanExpress}
						alt="American Express"
						className="h-6"
					/>
					<img src={MasterCard} alt="MasterCard" className="h-6" />
					<img src={Visa} alt="Visa" className="h-6" />
				</div>
			</div>

			{/*Grått streck som avdelare */}
			<hr className="border-t border-lightGrey mb-9" />

			<div className="mb-6">
				<h3 className="text-[16px] font-semibold mb-4 text-black">
					Payment method
				</h3>

				{/*Lista med betlaningsmetoder som renderas med en "map"-funktion baserat på "cards"-listan (arrayen). Respektive betalningsmetod representeras av ett "label"-element med ett unikt key-värde, "{metod.id}".*/}
				<div className="space-y-2">
					{cards.map((method) => (
						<label
							key={method.id}
							className="flex items-center space-x-3 cursor-pointer"
						>
							{/*"Radio"-knapp för att välja betalningsmetod. Det kontrolleras med en "checked"-prop beroende på om "paymentMethod" matchar den aktuella metoden. Det handlar om att när användaren ändrar valet förnyas "paymentMethod"-state med "onChange"-funktionen.*/}
							<input
								type="radio"
								name="paymentMethod"
								value={method.id}
								checked={paymentMethod === method.id}
								onChange={(e) =>
									setPaymentMethod(e.target.value)
								}
								className="form-radio text-accentPink"
							/>

							{/*Ikon för att visuellt representera betalningsmetoden samt texten som visar namnet på betalningsmetoden, ex. "Card".*/}
							<FontAwesomeIcon
								icon={method.icon}
								className="text-black"
							/>
							<span>{method.label}</span>
						</label>
					))}
				</div>
			</div>

			{/*Används för att rendera de specifika fälten för vald betalningsmetod */}
			{renderPaymentFields()}
		</div>
  );
};

export default PaymentForm;