// eslint-disable-next-line no-unused-vars
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Header from '../../../components/Header';


// Komponent för bekräftelsemeddelande som ska skickas till användaren efter att de har skickat in ett kontaktformulär
function ContactPostSubmit() {
    return (
		<div>
			{/* Sektion med header-rubrik, huvudrubrik, informerande text, "container" för innehåll */}
			<Header headingText="Contact" size="medium" />
			<h1 className="text-[32px] font-bold ml-[150px] mb-6 mt-12">Have a question?</h1>
			<div className="container w-[796px] mx-auto mb-12">
				<p className="mb-8 text-[20px]">
					Need assistance with your booking, or have any inquiries?
					Our customer service team is available 24/7 to help you with
					reservations, payment issues, cancellations, or any other
					questions.
				</p>

				{/* "container"  med en bekräftelsebox som har en stängningsknapp i det övre högra hörnet. */}
				<div className="flex flex-col items-center justify-center min-h-screen mb-10">
					<div className="text-center bg-opacityLightBlue p-12 rounded-md shadow-md">
						<button className="absolute top-4 right-4 text-darkGrey hover:text-darkGrey">
							&times;
						</button>
						<div className="w-[360px]">
							{/* Bekräftelserubrik */}
							<h2 className="text-[20px] font-semibold mb-2">
								Thank you for reaching out to us!
							</h2>
							{/* Meddelande om att e-posten har skickats */}
							<p className="mb-4">
								Your email has been successfully sent.
							</p>
							{/* Tackmeddelande och information om att svar kommer snart */}
							<p className="mb-6">
								We appreciate your message and will get back to
								you as soon as possible.
							</p>
						</div>
						{/* check-ikon som symboliserar att meddelandet har skickats*/}
						<FontAwesomeIcon
							icon={faCheck}
							className="text-roomGreen text-[56px] mb-4"
						/>
					</div>
					{/* Sektion för kontaktinformation */}
					<div className="mt-20 text-center text-[16px] text-black">
						<p>
							If your inquiry is urgent, feel free to reach us by
							email or phone at any time, 24/7, on both local and
							international numbers.
						</p>
						<div className="flex items-center justify-center mt-2 space-x-4">
							<a
								href="mailto:info@accomodationdeluxe.com"
								className="flex items-center space-x-1"
							>
								<FontAwesomeIcon icon={faEnvelope} />
								<span>info@accomodationdeluxe.com</span>
							</a>
							<a
								href="tel:+46764343536"
								className="flex items-center space-x-1"
							>
								<FontAwesomeIcon icon={faPhone} />
								<span>+46 76 434 35 36</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPostSubmit;