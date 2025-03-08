// eslint-disable-next-line no-unused-vars
import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo/LogoVertical.png";

function Footer() {
	return (
		<footer className="bg-primaryDarkBlue p-8 text-white w-full mt-10">
			<div className="container mx-auto flex justify-between w-[90%]">
				{/* Länkar explore */}
				<div className="flex flex-col">
					<h4 className="font-bold text-lg mb-4">Explore</h4>
					<ul className="space-y-2 text-sm">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/airport-transfer"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								Airport Transfer
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/hotels"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								Hotels
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/favorites"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								Favorites
							</NavLink>
						</li>
					</ul>
				</div>

				{/* Länkar - preferenser */}
				<div className="flex flex-col">
					<h4 className="font-bold text-lg mb-4">Preferences</h4>
					<ul className="space-y-2 text-sm">
						<li>
							<NavLink
								to="/terms-and-conditions"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								Terms & Conditions
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/privacy-policy"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								Privacy Policy
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/faq"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								FAQ
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/cookies"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								Cookies
							</NavLink>
						</li>
					</ul>
				</div>

				{/* Länkar - About */}
				<div className="flex flex-col">
					<h4 className="font-bold text-lg mb-4">About</h4>
					<ul className="space-y-2 text-sm">
						<li>
							<NavLink
								to="/about-us"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								About Us
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/contact"
								className={({ isActive }) =>
									isActive
										? "text-accentPink"
										: "hover:text-secondaryLightBlue"
								}
							>
								Contact
							</NavLink>
						</li>
					</ul>
				</div>

				{/* Logo sektion */}
				<div className="logo flex flex-col">
					<NavLink to="/">
						<img
							src={logo}
							alt="AccommodationDeluxe Logo"
							className="h-20"
						/>
					</NavLink>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
