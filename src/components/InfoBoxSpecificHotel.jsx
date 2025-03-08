/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';

//Tar emot props för att returnera specific information för specifik vy och hotel om det finns
function InfoBoxSpecificHotel({
	title = "",
	additionalInformation = [],
	description = "",
	optionsTitle = "",
	extraInformation = [],
}) {
	return (
		<div className="m-6 p-4 bg-opacityLightBlue rounded-[10px] shadow-lg w-[400px] h-fit">
			<h3 className="text-[20px] font-semibold mb-3">{title}</h3>
			{/* Visar antingen additionalInformation-listan eller beskrivningen om listan inte är tom */}
			{additionalInformation.length > 0 ? (
				<ul className="list-disc list-inside text-black space-y-1">
					{additionalInformation.map((info, index) => (
						<li className="text-[16px]" key={index}>
							{info}
						</li>
					))}
				</ul>
			) : description ? (
				<p className="text-[16px] text-black">{description}</p>
			) : null}
			{/* Visar titel för extra val om optionsTitle är angiven */}
			{optionsTitle && (
				<h3 className="text-[18px] font-semibold my-4">
					{optionsTitle}
				</h3>
			)}
			{/* Visar extraInformation-listan om den innehåller element */}
			{extraInformation.length > 0 && (
				<ul className="list-disc list-inside text-black space-y-1">
					{extraInformation.map((info, index) => (
						<li className="text-[16px]" key={index}>
							{info}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default InfoBoxSpecificHotel;
