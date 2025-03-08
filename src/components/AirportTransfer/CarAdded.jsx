/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Car from "../../assets/images/Car.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCalendarAlt,
	faClock,
	faUserFriends,
	faTrashAlt,
	faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
// Visar information om en bokad flygplatstransfer
function CarAdded({ transferData, onRemove }) {
	return (
		<div className="w-[780px] bg-lightBlue rounded-[10px] p-6 flex justify-between items-center shadow-lg">
			{/* Vänstra delen - bild och bekfrätelseparagraf */}
			<div className="flex items-center">
				<img
					src={Car}
					alt="Car"
					className="w-[180px] h-auto mr-6 rounded-lg"
				/>
				<div className="text-black text-[14px] ">
					Your airport transfer has been successfully added to your
					booking
				</div>
			</div>

			{/* Mittsektionen - detaljer om enkel resa */}
			<div className="flex-grow ml-4 text-darkGrey p-[10px] w-[150px]">
				<h2 className="text-black text-[12px] font-bold mb-2">
					One way
				</h2>
				<ul className="space-y-2 text-[12px]">
					<li className="flex items-center">
						<FontAwesomeIcon
							icon={faMapMarkerAlt}
							className="mr-2"
						/>
						<span>From: {transferData.fromLocation}</span>
					</li>
					<li className="flex items-center">
						<FontAwesomeIcon
							icon={faMapMarkerAlt}
							className="mr-2"
						/>
						<span>To: {transferData.toLocation}</span>
					</li>
					<li className="flex items-center">
						<FontAwesomeIcon
							icon={faCalendarAlt}
							className="mr-2"
						/>
						{transferData.date}
					</li>
					<li className="flex items-center">
						<FontAwesomeIcon icon={faClock} className="mr-2" />
						{transferData.time}
					</li>
					<li className="flex items-center">
						<FontAwesomeIcon
							icon={faUserFriends}
							className="mr-2"
						/>
						{transferData.passengers} people
					</li>
				</ul>
			</div>
			{/*Detaljer returresa*/}
			<div className="flex-grow ml-4 text-darkGrey p-[10px] w-[150px]">
				<h2 className="text-black text-[12px] font-bold mb-2">
					Return
				</h2>
				<ul className="space-y-2 text-[12px]">
					<li className="flex items-center">
						<FontAwesomeIcon
							icon={faMapMarkerAlt}
							className="mr-2"
						/>
						<span>From: {transferData.fromLocation}</span>
					</li>
					<li className="flex items-center">
						<FontAwesomeIcon
							icon={faMapMarkerAlt}
							className="mr-2"
						/>
						<span>To: {transferData.toLocation}</span>
					</li>
					<li className="flex items-center">
						<FontAwesomeIcon
							icon={faCalendarAlt}
							className="mr-2"
						/>
						{transferData.date}
					</li>
					<li className="flex items-center">
						<FontAwesomeIcon icon={faClock} className="mr-2" />
						{transferData.time}
					</li>
					<li className="flex items-center">
						<FontAwesomeIcon
							icon={faUserFriends}
							className="mr-2"
						/>
						{transferData.passengers} people
					</li>
				</ul>
			</div>

			{/* Knapp för att ta bort tillagd bil */}
			<div className="mt-auto flex items-center justify-between">
				<FontAwesomeIcon
					icon={faTrashAlt}
					className="text-black mr-2 cursor-pointer"
					onClick={onRemove}
				/>
				<button
					onClick={onRemove}
					className="text-accentPink text-[14px] font-bold"
				>
					Remove
				</button>
			</div>
		</div>
	);
}

export default CarAdded;
