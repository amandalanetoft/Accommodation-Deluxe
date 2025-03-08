/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PhoneNumberSelection from "../../components/BookingFlow/PhoneNumberSelection";
import { useHotelData } from "../../contexts/HotelDataContext"; // Import context

//Komponent för insamling av gästdetaljer
function GuestDetailsForm() {
	// Hämtar länder
	const { countries } = useHotelData();

	// Används för att definierar tillstånd för formulärdata med standardvärden
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		country: "",
		phoneCode: countries?.[0]?.code || "",
		phoneNumber: "",
	});

	// Hanterar ändringar av inmatningsfält i formuläret
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Hanterar val av land och uppdaterar telefonkoden
	const handleCountrySelect = (country) => {
		setFormData((prev) => ({ ...prev, phoneCode: country.code }));
	};

	// Validerar e-postadress
	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	};

	// Validerar telefonnummer för att säkerställa att det är 10 siffror
	const validatePhoneNumber = (phoneNumber) => {
		const re = /^\d{10}$/; // 10-digit phone number
		return re.test(phoneNumber);
	};

	//Formuläret för att samla in gästdetaljer
	return (
		<div>
			{/*Omfamnar formuläret för att korrigera dess stil samt rubrik och separator*/}
			<div className="border p-4 shadow-lg w-full h-auto border-lightGrey mx-auto rounded-[10px] bg-white">
				<h2 className="text-[24px] font-bold mb-4">
					Enter your details
				</h2>
				<hr className="border-t border-lightGrey mb-9" />

				{/* Formulär för gästinformation*/}
				<form className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							{/* Etikett och inmatningsfält för förnamn */}
							<label
								htmlFor="firstName"
								className="block text-[16px] font-medium text-black"
							>
								First name{" "}
								<span className="text-accentPink">*</span>
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								required
								value={formData.firstName}
								onChange={handleInputChange}
								className="mt-1 block w-full h-12 rounded-md border border-lightGrey shadow-sm focus:border-darkGrey focus:ring focus:ring-darkGrey focus:ring-opacity-50 placeholder:text-[14px] pl-4"
								placeholder="Enter your first name"
							/>
						</div>
						<div>
							{/* Etikett och inmatningsfält för efternamn */}
							<label
								htmlFor="lastName"
								className="block text-[16px] font-medium text-black"
							>
								Last name{" "}
								<span className="text-accentPink">*</span>
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								required
								value={formData.lastName}
								onChange={handleInputChange}
								className="mt-1 block w-full h-12 rounded-md border border-lightGrey shadow-sm focus:border-darkGrey focus:ring focus:ring-darkGrey focus:ring-opacity-50 placeholder:text-[14px] pl-4"
								placeholder="Enter your last name"
							/>
						</div>
					</div>
					<div>
						{/* Etikett och inmatningsfält för e-post */}
						<label
							htmlFor="email"
							className="block text-[16px] font-medium text-black"
						>
							Email <span className="text-accentPink">*</span>
						</label>
						<input
							type="email"
							id="email"
							name="email"
							required
							value={formData.email}
							onChange={handleInputChange}
							className={`mt-1 block w-full h-12 rounded-md border border-lightGrey shadow-sm focus:border-darkGrey focus:ring focus:ring-darkGrey focus:ring-opacity-50 placeholder:text-[14px] pl-4 ${
								formData.email && !validateEmail(formData.email)
									? "border-roomRed"
									: ""
							}`}
							placeholder="Enter your email address"
						/>

						{/* Visar felmeddelande om e-posten är ogiltig */}
						{formData.email && !validateEmail(formData.email) && (
							<p className="text-roomRed text-[10px] mt-1">
								Please enter a valid email address.
							</p>
						)}
					</div>

					{/* Etikett för telefonnummer och inmatningsfält med landskod */}
					<label
						htmlFor="phoneNumber"
						className="block text-[16px] font-medium text-black"
					>
						Phone Number <span className="text-accentPink">*</span>
					</label>
					<div className="flex items-center space-x-2">
						<PhoneNumberSelection
							onSelectCountry={handleCountrySelect}
						/>
						<input
							type="text"
							id="phoneNumber"
							name="phoneNumber"
							required
							value={formData.phoneNumber}
							onChange={handleInputChange}
							className={`block w-full h-12 rounded-md border border-lightGrey shadow-sm focus:border-darkGrey focus:ring focus:ring-darkGrey focus:ring-opacity-50 placeholder:text-[14px] pl-4 ${
								formData.phoneNumber &&
								!validatePhoneNumber(formData.phoneNumber)
									? "border-roomRed"
									: ""
							}`}
							placeholder="Enter your phone number"
						/>

						{/* Används för att visa felmeddelande om telefonnumret är ogiltigt */}
						{formData.phoneNumber &&
							!validatePhoneNumber(formData.phoneNumber) && (
								<p className="text-roomRed text-[10px]">
									Please enter a valid phone number.
								</p>
							)}
					</div>
				</form>
			</div>
		</div>
	);
}

export default GuestDetailsForm;
