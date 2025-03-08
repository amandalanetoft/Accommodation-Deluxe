// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; //
import Header from "../../../components/Header";


// FAQ-data för populära och ytterligare frågor i en lista med objekt 
const faqData = {
	popular: [
		{
			question: "How do I change or cancel my booking?",
			answer: (
				<div>
					<p className="my-1.5">
						You can change or cancel your booking by contacting our
						customer service team. Please do so at least 48 hours
						before your scheduled departure to avoid any
						cancellation fees.
					</p>
					<p className="my-1.5">
						You can reach us via phone or email for assistance.
					</p>
					<p>
						<FontAwesomeIcon
							icon={faPhone}
							className="text-[18px] me-2"
						/>
						+46 786 434 35 36
					</p>
					<p>
						<FontAwesomeIcon
							icon={faEnvelope}
							className="text-[18px] me-2"
						/>
						info@accommodationdeluxe.com
					</p>
				</div>
			),
		},
		{
			question: "How do I know if my booking is confirmed?",
			answer: (
				<div>
					<p className="my-1.5">
						Once you complete your booking, you will receive a
						confirmation email at the email address you provided
						during the reservation process.
					</p>
					<p className="my-1.5">
						This email will include your booking details, a
						confirmation number, and any other relevant information
						regarding your stay.
					</p>
					<p className="my-1.5">
						If you do not receive a confirmation email within a few
						minutes of booking, please check your spam or junk
						folder.
					</p>
				</div>
			),
		},
		{
			question: "What payment methods do you accept?",
			answer: (
				<div>
					<p className="my-1.5">
						We accept various payment methods, including:
					</p>
					<ul>
						<li>Visa</li>
						<li>MasterCard</li>
						<li>American Express</li>
						<li>PayPal</li>
						<li>Apple Pay</li>
						<li>Present cards</li>
					</ul>
					<p>All payments are processed securely.</p>
				</div>
			),
		},
	],
	additional: [
		{
			question: "What is the check-in and check-out time?",
			answer: "Check-in is from 3 PM, and check-out is by 12 PM.",
		},
		{
			question: "How can I leave feedback about my stay?",
			answer: "You can leave feedback through the feedback form sent after your stay or by contacting customer support.",
		},
		{
			question: "How do I get my booking confirmation?",
			answer: "You will receive your booking confirmation via email after your payment has been processed.",
		},
		{
			question: "Is there a minimum age requirement to book a room?",
			answer: "Yes, the minimum age requirement to book a room is 18 years.",
		},
		{
			question: "What if I have special requests?",
			answer: "You can mention any special requests during the booking process, and we will try our best to accommodate them.",
		},
	],
};

// Komponenten används för att visa en lista med vanliga frågor och svar. Den delas upp i två sektioner: populära frågor och ytterligare frågor.
function FaqPage() {

// Sätter state för att hålla reda på vilken fråga som är öppen
	const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

	// Funktion för att hantera öppning och stängning av fråga/svar
	const toggleQuestion = (index) => {
		setOpenQuestionIndex(openQuestionIndex === index ? null : index);
	};

	return (
		<>
		{/* Sektion med header och headerrubrik, huvudrubrik och informationstext */}
			<Header headingText="FAQ" size="medium" />
			<h1 className="text-[32px] font-bold ml-[150px] mb-6 mt-12">
					Frequently Asked Questions
				</h1>
			<div className="w-[796px] mx-auto mb-12">
			<div className="my-12 px-4 w-[800px]">	
				<p className="mb-8 text-[20px]">
					Here you will find answers to the most common questions
					about our service. If you don not find the answer you are
					looking for, don not hesitate to contact us via the contact
					information at the bottom of the page.
				</p>
			</div>

			{/* Populära frågor */}
			<h2 className="text-[32px] font-semibold mb-4">
				Popular Questions
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
				{/*Itererar igenom populära frågor*/}
				{faqData.popular.map((item, index) => (
					<div
						key={index}
						// Hanterar öppning och stängning av fråga/svar
						className="border border-grey rounded-md shadow-md"
					>
						<h3 className="bg-opacityLightBlue p-3 text-[20px] mb-3">
							{item.question}
						</h3>
						<div className="text-[16px] p-3">{item.answer}</div>
					</div>
				))}
			</div>

			{/* Itererar igenom "ytterligare" frågor */}
			<div className="space-y-4 rounded-[10px]">
				{faqData.additional.map((item, index) => (
					<div
						key={index}
						className="py-1 px-2 border rounded-[10px] border-accentPink cursor-pointer"
						onClick={() => toggleQuestion(index)}
					>
						<div className="py-4 flex justify-between items-center">
							<h4 className="font-semibold text-[16px]">
								{item.question}
							</h4>
							<span>
								{" "}
									{/* Visar minus- eller nedåtpil beroende på om frågan är öppen eller inte */}
									{openQuestionIndex === index ? (
									<FontAwesomeIcon icon={faChevronUp} />
								) : (
									<FontAwesomeIcon icon={faChevronDown} />
								)}
							</span>
						</div>
						{/* Visar svaret om frågan är öppen */}
						{openQuestionIndex === index && (
							<p className="text-[14px] mb-4">{item.answer}</p>
						)}
					</div>
				))}
			</div>

			{/* Kontaktinformation*/}
			<p className="mt-12 text-center">
				Still have not gotten your answer?{" "}
				<Link
					to="/contact"
					className="text-accentPink hover:text-hoverColorLightPink"
				>
					Contact us
				</Link>
			</p>
		</div>
		</>
	);
}
export default FaqPage;
