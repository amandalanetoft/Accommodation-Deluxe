/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

function HorizontalRoomType(props) {
	return (
		<div className="flex bg-opacityLightBlue rounded-lg shadow-lg overflow-hidden w-[600px] h-[150px]">
			{/* Definierar storlek på den specifika bilden*/}
			<div className="w-1/3 h-full">
				<img
					src={props.imgUrl}
					alt={props.title}
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Returnerar textinnehåll och textstorlek för det specifika rummet - visar en rubrik och två textstycken med information från props, vilket innebär att komponenten renderar en titel, en yta (sqm) och en beskrivning, alla i specifika stilklasser för typsnitt och färg*/}
			<div className="flex flex-col justify-center p-3 w-2/3">
				<h3 className="text-[16px] font-bold text-black">
					{props.title}
				</h3>
				<p className="text-black text-[12px]">{props.sqm}</p>
				<p className="text-black text-[12px]">{props.description}</p>
			</div>
		</div>
	);
}

export default HorizontalRoomType;
