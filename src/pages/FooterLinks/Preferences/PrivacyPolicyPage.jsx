// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../../components/Header";

//Definierar policySektioner i en lista med objekt
function PrivacyPolicyPage() {
  const policySections = [
    {
      title: "1. Information We Collect",
      content: [
        "Personal Information: We collect details such as your name, email, phone number, and payment information when you book or create an account.",
        "Usage Data: We gather data on how you use our site, including IP addresses and browsing activities.",
        "Cookies: We use cookies to improve your experience and analyze site usage."
      ]
    },
    {
      title: "2. How we use your information",
      content: [
        "Bookings: To process and manage your bookings and account.",
        "Communication: To send booking updates, promotional offers, and service information.",
        "Improvement: To enhance our services based on usage data."
      ]
    },
    {
      title: "3. Sharing Your Information",
      content: [
        "Service Providers: We share information with trusted partners who assist us in delivering our services.",
        "Legal Compliance: We may disclose information to comply with legal requirements or protect our rights."
      ]
    },
    {
      title: "4. Data security",
      content: [
        "We use security measures to protect your data, but cannot guarantee complete security."
      ]
    },
    {
      title: "5. Your rights",
      content: [
        "Access and Update: You can access or update your personal information.",
        "Opt-Out: You can unsubscribe from marketing communications.",
        "Deletion: You can request deletion of your data."
      ]
    },
    {
      title: "6. Changes to This Policy",
      content: [
        "We may update this policy and will post changes here. Continued use of our services means you accept the updated policy."
      ]
    }
  ];
  
  //Returnerar Privacy policy, hämtar Header, sätter rubrik för den specifika vyn, definierar container-bredd och textstorlek
  return (
		<div>
			<Header headingText="Privacy Policy" size="medium"/> 
      <h1 className="text-[32px] font-bold ml-[150px] mb-6 mt-12">Privacy Policy</h1>
			<div className="container w-[796px] mx-auto mb-12">
				<p className="mb-8 text-[20px]">
					At Accommodation Deluxe, we are committed to protecting your
					privacy. This Privacy Policy explains how we collect, use,
					and safeguard your personal information when you visit our
					website or use our services. By using Accommodation Deluxe,
					you consent to the practices described in this policy.
				</p>

        {/* Itererar igenom listan med objekt och renderar i relevanta element */}
				{policySections.map((section, index) => (
					<div key={index} className="mb-6">
						<h2 className="text-[24px] font-semibold">
							{section.title}
						</h2>
						{section.content.map((paragraph, idx) => (
							<p key={idx} className="m-1">
								{paragraph}
							</p>
						))}
					</div>
				))}
			</div>
		</div>
  );
}
export default PrivacyPolicyPage;