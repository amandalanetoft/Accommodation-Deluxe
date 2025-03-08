// eslint-disable-next-line no-unused-vars
import React from "react";
import Header from "../../../components/Header";
import AboutUsTimeline from "../../../assets/images/AboutUsTimeline.png"


function AboutUs() {
	return (
		<div>
			{/*Sätter rubriken för header */}
			<Header headingText="About Us" size="medium" />{" "}

			{/* Huvudsektion för om oss-informationen */}
			<section className="container mx-auto w-[796px] px-4 py-16">
				<div className="bg-opacityLightBlue p-8">
					<h1 className="text-[32px] font-bold mb-4">Our Journey</h1>
					<p className="text-[20px] text-black">
						Accommodation Deluxe was founded in 2018 with a vision
						to transform the way travelers book hotels. We saw the
						need for a platform that combined luxury, convenience,
						and affordability, and set out to create a seamless
						booking experience for customers seeking more than just
						a place to stay. From five-star resorts to charming
						boutique hotels, we handpick every option to ensure it
						meets our high standards of quality and comfort.
					</p>

					<p className="text-[20px] text-black">
						Our team is passionate about travel and dedicated to
						helping you find the perfect accommodation for any
						occasion. With a user-friendly interface and
						comprehensive search filters, Accommodation Deluxe makes
						it easy to explore top destinations and compare
						exclusive offers. Whether you are planning a romantic
						getaway, a family vacation, or a solo adventure, we have
						the perfect stay for you.
					</p>
					<p className="text-[20px] text-black">
						Since our launch, we have grown into a trusted name in
						the travel industry, serving thousands of happy
						customers around the globe. Our goal is to continue
						enhancing your travel experience by offering unbeatable
						deals, personalized recommendations, and a hassle-free
						booking process. Let Accommodation Deluxe be your
						gateway to extraordinary stays and unforgettable
						journeys.
					</p>
				</div>
			</section>
	
			{/* Tidslinjebild */}
			<div className="flex justify-center">
				<img
					src={AboutUsTimeline}
					alt="About Us Timeline"
					className="w-[80%]"
				/>
			</div>
		</div>
	);
}
export default AboutUs;
