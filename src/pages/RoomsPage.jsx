/* eslint-disable no-unused-vars */
import React from 'react';
import HorizontalRoomType from '../components/HorizontalRoomType';
import InfoBoxSpecificHotel from '../components/InfoBoxSpecificHotel';
import RoomCardsSection from '../components/RoomCardsSection';
import PropTypes from "prop-types";
import useHotelDetails from '../hooks/useHotelDetails';

function RoomsPage() {
	
		  const { hotel, error, loading } = useHotelDetails();

			// Felhantering om hoteldata ej hittas
			if (loading) {
				return <p>Loading hotel data...</p>;
			}
			if (error) {
				return <p>Error loading hotel data: {error.message}</p>;
			}
			if (!hotel) {
				return <p>Hotel not found.</p>;
			}

			 // Innehåll för infobox, hämtat från de specifika hotellet+rooms
			const infoBoxContent = {
				title: hotel.aboutTheRooms.infoBox.title,
				additionalInformation: hotel.aboutTheRooms.infoBox.additionalInformation,
				optionsTitle: hotel.aboutTheRooms.infoBox.optionsTitle,
				extraInformation: hotel.aboutTheRooms.infoBox.extraInformation,
			};


	return (
		<div>

			{/* Huvudlayout */}
			<div className="w-[85%] mx-auto mt-8">
				<div className="flex justify-between w-[85%] mx-auto mt-8">
					<div className="w-[60%] pr-8">
						<h2 className="text-3xl font-bold mb-4">Rooms</h2>
						<p className="text-lg text-black py-3 mb-9">
							{hotel.roomDescription}
						</p>
						 {/* Lista med alla rum , dynamiskt innehåll hämtat från de specifika hotellet*/}
						<div className="w-[60%] space-y-6">
							{hotel.rooms.map((room, roomIndex) => (
								<HorizontalRoomType
									key={roomIndex} 
									room={room} 
									title={room.roomType}
									imgUrl={room.imgUrl}
									sqm={room.sqm}
									description={room.description}
								/>
							))}
						</div>
					</div>

					<InfoBoxSpecificHotel {...infoBoxContent} />
				</div>
			</div>
			{/* Visar RoomCardSection */}
			<RoomCardsSection />
		</div>
	);
}

// PropTypes
RoomsPage.propTypes = {
  hotel: PropTypes.shape({
    name: PropTypes.string,
    rooms: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        roomType: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imgUrl: PropTypes.string.isRequired,
        sqm: PropTypes.string, 
      })
    ),
    amenities: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default RoomsPage;

