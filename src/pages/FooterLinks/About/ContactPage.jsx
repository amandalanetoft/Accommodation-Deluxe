// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../components/Button";
import ContactPostSubmit from "./ContactPostSubmitPage";
import Header from "../../../components/Header";

//Definierar state för formulär och initierar state för formulärdata
function Contact() {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		bookingReference: "",
		subject: "",
		message: "",
		agreed: false,
	});

	// State för att hålla reda på om formuläret har skickats
	const [submitted, setSubmitted] = useState(false);

	//Funktion för att hantera när användaren lägger till data i formuläret
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	//Funktion för att hantera formulärets sändning och uppdaterar state till skickat
	const handleSubmit = (e) => {
		e.preventDefault();
		setSubmitted(true);
	};

	 // Laddar "contactPostSubmit" när formuläret skickats
	if (submitted) {
		return <ContactPostSubmit />;
	}

	return (
		<div>
			{/* Huvudrubrik och informationstext */}
			<Header headingText="Contact" size="medium" />
			<h1 className="text-[32px] font-bold ml-[150px] mb-6 mt-12">
				Have a question?
			</h1>
			<div className="container w-[796px] mx-auto mb-12">
				<p className="mb-8 text-[20px]">
					Need assistance with your booking, or have any inquiries?
					Our customer service team is available 24/7 to help you with
					reservations, payment issues, cancellations, or any other
					questions.
				</p>
			</div>

			{/* Formulär */}
			<form
				onSubmit={handleSubmit}
				className="bg-grey p-6 rounded-[10px] shadow-md w-[680px] mx-auto"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
					<div>
						{/* Fält för förnamn */}
						<label
							htmlFor="firstName"
							className="block font-semibold mb-1"
						>
							First name<span className="text-accentPink">*</span>
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="w-full p-2 border border-grey rounded"
							placeholder="Enter your first name"
							required
						/>
					</div>
					<div>
						{/* Fält för efternamn */}
						<label
							htmlFor="lastName"
							className="block font-semibold mb-1"
						>
							Last name<span className="text-accentPink">*</span>
						</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="w-full p-2 border border-grey rounded"
							placeholder="Enter your last name"
							required
						/>
					</div>
				</div>

				<div className="mb-6">
					{/* Fält för epost */}
					<label htmlFor="email" className="block font-semibold mb-1">
						Email<span className="text-accentPink">*</span>
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="w-full p-2 border border-grey rounded"
						placeholder="Enter your email"
						required
					/>
				</div>

				<div className="mb-6">
					{/* Fält för bokningsnummer */}
					<label
						htmlFor="bookingReference"
						className="block font-semibold mb-1"
					>
						Booking reference
						<span className="text-accentPink">*</span>
					</label>
					<input
						type="text"
						id="bookingReference"
						name="bookingReference"
						value={formData.bookingReference}
						onChange={handleChange}
						className="w-full p-2 border border-grey rounded"
						placeholder="Enter your booking reference"
						required
					/>
				</div>

				<div className="mb-6">
					{/* Fält för ämne */}
					<label
						htmlFor="subject"
						className="block font-semibold mb-1"
					>
						Subject<span className="text-accentPink">*</span>
					</label>
					<input
						type="text"
						id="subject"
						name="subject"
						value={formData.subject}
						onChange={handleChange}
						className="w-full p-2 border border-grey rounded"
						placeholder="Enter your subject"
						required
					/>
				</div>

				<div className="mb-6">
					{/* Fält för meddelande */}
					<label
						htmlFor="message"
						className="block font-semibold mb-1"
					>
						Message<span className="text-accentPink">*</span>
					</label>
					<textarea
						id="message"
						name="message"
						value={formData.message}
						onChange={handleChange}
						className="w-full p-2 border border-grey rounded h-32"
						placeholder="Enter your message"
						required
					/>
				</div>

				<div className="mb-6 flex justify-between">
					{/* Checkbox för att godkänna policy */}
					<label className="flex">
						<input
							type="checkbox"
							name="agreed"
							checked={formData.agreed}
							onChange={handleChange}
							className="mr-2"
							required
						/>
						I agree to the Accommodation Deluxe privacy policy.
					</label>
					<Button size={"large"} buttonText={"Send"} />
				</div>
			</form>

			{/* Sektion för kontaktinformation */}
			<div className="text-center w-[680px] mx-auto my-8 mb-12">
				<p>
					If your inquiry is urgent, feel free to reach us by email or
					phone at any time, 24/7, on both local and international
					numbers.
				</p>
				<div className="flex items-center justify-center mt-4 space-x-4">
					<p>
						<FontAwesomeIcon
							icon={faEnvelope}
							className="text-[18px] me-2"
						/>{" "}
						info@accommodationdeluxe.com
					</p>
					<p>
						<FontAwesomeIcon
							icon={faPhone}
							className="text-[18px] me-2"
						/>{" "}
						+46 76 434 35 36
					</p>
				</div>
			</div>
		</div>
	);
}

export default Contact;
