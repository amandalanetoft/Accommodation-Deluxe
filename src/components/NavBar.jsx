// eslint-disable-next-line no-unused-vars
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons"; 
import logo from "../assets/images/logo/LogoHorizontal.png";
import { NavLink } from "react-router-dom";

function NavBar() {
	return (
		<nav className="bg-primaryDarkBlue p-4 flex justify-between items-center text-white w-full">
			<div className="flex items-center space-x-8 pl-12">
				{" "}
				{/* Logo och Nav Länkar */}
				<div className="flex items-center space-x-2">
					<NavLink to="/">
						<img
							src={logo}
							alt="AccommodationDeluxe Logo"
							className="h-10"
						/>
					</NavLink>
				</div>
				<div className="flex space-x-8">
					<NavLink to="/" className={({ isActive }) =>
							isActive
								? "text-accentPink"
								: "hover:text-secondaryLightBlue"
						}>
						Home
					</NavLink>
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
					<NavLink
						to="/airport-transfer"
						className={({ isActive }) =>
							isActive
								? "text-accentPink"
								: "hover:text-secondaryLightBlue"
						}
					>
						Airport transfer
					</NavLink>
				</div>
			</div>
			<NavLink
				to="/favorites"
				className="text-accentPink hover:text-hoverColorLightPink"
			>
				<FontAwesomeIcon icon={faHeart} className="h-6 w-6 mx-9" />
			</NavLink>
		</nav>
	);
}

export default NavBar;
