// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../../components/Header";

//Definierar termdata i en lista med objekt med titel och tillhörande beskrivning
function TermsAndConditionsPage() {
  const termsData = [
    {
      title: "1. Scope of Service",
      description:
        "We provide an online platform through which users can book hotel accommodations, car rentals, and other related services. These bookings are made through third-party providers, and we act only as an intermediary."
    },
    {
      title: "2. User Responsibilities",
      description:
        "When making a booking, you agree to provide accurate, up-to-date, and complete information. You are responsible for ensuring that all details, including personal data and payment details, are correct."
    },
    {
      title: "3. Prices and Payment",
      description:
        "Prices displayed on our platform are based on the information provided by our third-party providers and may vary depending on demand, availability, and other factors. All prices are inclusive of VAT and other applicable taxes unless stated otherwise."
    },
    {
      title: "4. Booking Policies",
      description:
        "By making a reservation, you agree to the terms and conditions set by the hotel or service provider. These terms may include cancellation policies, no-show rules, and additional charges for late check-in or special requests."
    },
    {
      title: "5. Cancellation and Modifications",
      description:
        "Cancellation policies vary depending on the provider. Please review the specific cancellation terms that apply to your booking. In case of cancellation, you may be subject to fees or penalties as determined by the provider."
    },
    {
      title: "6. Liability",
      description:
        "Our service acts as an intermediary between you and the service provider. We are not responsible for the quality of accommodations or services provided by third parties. Any claims for compensation must be made directly with the hotel or service provider."
    },
    {
      title: "7. Intellectual Property Rights",
      description:
        "All content, including text, graphics, logos, and software, is owned by or licensed to us. You are not permitted to use, modify, or distribute any part of our website without explicit permission."
    },
    {
      title: "8. Privacy and Data Protection",
      description:
        "We are committed to protecting your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal data."
    },
    {
      title: "9. Changes to Terms",
      description:
        "We reserve the right to modify or replace these Terms & Conditions at any time. Changes will be posted on our website, and continued use of the service will constitute acceptance of the updated terms."
    },
    {
      title: "10. Dispute Resolution",
      description:
        "In case of disputes, you agree to resolve any claims through binding arbitration, in accordance with local laws and regulations."
    }
  ];
  //Returnerar Terms and condition, hämtar header + sätter rubrik, definierar bredd på container och textstorlek i första paragraf
  return (
		<div>
			<Header headingText="Terms & Conditions" size="medium" />
      <h1 className="text-[32px] font-bold ml-[150px] mb-6 mt-12">
					Terms and Conditions
				</h1>
			<div className="container w-[796px] mx-auto mb-12">
        
				{/* Paragraf under rubriken */}
				<p className="text-[20px] mb-8">
					These Terms & Conditions govern the use of our website and
					services for making hotel bookings and related travel
					accommodations. By accessing or using our services, you
					agree to be bound by these Terms & Conditions.
				</p>

				{/*Itererar igenom objekten och renderar titel och beskrivning i relevanta element, sätter textstorlek och marginaler*/}
				<ul className="pl-1.4 space-y-6">
					{termsData.map((term, index) => (
						<li key={index}>
							<h2 className="text-[24px] font-semibold">
								{term.title}
							</h2>
							<p>{term.description}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
  );
}
export default TermsAndConditionsPage;
