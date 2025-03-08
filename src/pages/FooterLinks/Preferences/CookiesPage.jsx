// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../../components/Header";

// Komponenten används för att visa information om  cookiepolicy, inklusive en lista med olika typer av cookies som används på webbplatsen och deras syften.
function CookiesPage() {
  const cookieData = [
    {
      title: "1. Essential Cookies",
      description:
        "These cookies are necessary for the proper functioning of our website. Without them, some parts of the site may not work."
    },
    {
      title: "2. Analytical Cookies",
      description:
        "We use these cookies to understand how our users interact with the site, helping us to improve its functionality and user experience."
    },
    {
      title: "3. Advertising Cookies",
      description:
        "These cookies allow us to show you relevant advertisements, personalized to your preferences, both on our site and across other platforms."
    },
    {
      title: "4. Functional Cookies",
      description:
        "These cookies help us remember your preferences, such as your login details or language settings, to provide a more personalized experience."
    }
  ];

  return (
		//Returnerar huvudrubrik och en inledningspragraf 
		<div>
			<Header headingText="Cookies" size="medium" />
			<h1 className="text-[32px] font-bold ml-[150px] mb-6 mt-12">
				Cookie Policy
			</h1>
			<div className="container w-[796px] mx-auto mb-12">
				<p className="mb-8 text-[20px]">
					At Accommodation Deluxe, we use cookies and similar
					technologies to enhance your experience on our platform.
					These technologies allow us to provide essential site
					functionality, analyze website traffic, personalize content,
					and offer tailored advertisements.
				</p>

				{/* Itererar igenom cookieDatas objekt och returnerar dem som h2 och tillhörande p */}
				{cookieData.map((cookie, index) => (
					<div key={index} className="mb-6">
						<h2 className="text-[24px] font-semibold mb-2">
							{cookie.title}
						</h2>
						<p>{cookie.description}</p>
					</div>
				))}
				{/* Rubrik och informationstext*/}
				<h2 className="text-[24px] font-semibold mt-6">
					Managing Cookies:
				</h2>
				<p className="mt-2">
					You can manage your cookie preferences or disable cookies in
					your browser settings at any time. However, this may affect
					the functionality of certain parts of our website.
				</p>
			</div>
			
		</div>
  );
}
export default CookiesPage;