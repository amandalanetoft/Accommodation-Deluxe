import React, { useState } from "react";
import Header from "../components/Header";
import AirportTransferSearchBar from "../components/AirportTransfer/AirportTransferSearchBar";
import CarCard from "../components/AirportTransfer/CarCard";
import AirportTransferTimeline from "../assets/images/AirportTransferTimeline.png";
import AirportTransferConfirmation from "../components/AirportTransfer/AirportTransferConfirmation";

function AirportTransferPage() {

  // State för att lagra transferinformation
  const [transferData, setTransferData] = useState(null);

  // State för att styra visning av popup
  const [showPopup, setShowPopup] = useState(false);

  // Hanterar sökningen och lagrar antingen enkelresa eller tur-retur data i transferData
  const handleSearch = (oneWayData, returnTripData) => {
    setTransferData({ ...oneWayData, returnTrip: returnTripData });
  };

  // Funktion för att hantera bekräftelse (öppnar popup)
  const handleConfirm = () => {
    setShowPopup(true);
  };

  // Funktion för att stänga popup och återställa sidan
  const handleClosePopup = () => {
    setShowPopup(false);
    setTransferData(null); 
  };

  return (
    <div>
      {/* Header och headerrubrik, rubrik och informationstext*/}
      <Header headingText="Airport Transfer" size="medium" />
      <div className="bg-opacityLightBlue py-12 flex justify-center h-[400px]">
        <div className="w-[1200px]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Book your Airport transfer
            </h1>
            <p className="text-lg text-black mb-6">
              Convenient transportation to and from your accommodation.
            </p>
          </div>
          <div className="flex justify-center">

            {/* Sökfält för transfer */}
            <AirportTransferSearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Rendera CarCard endast om transferData finns */}
      {transferData && (
        <div className="mb-8 w-[1200px] mx-auto">
          <CarCard
            transferData={transferData}
            tripType={transferData.returnTrip ? "Return" : "One Way"}
            onConfirm={handleConfirm} 
          />
        </div>
      )}

      {/* Renderar bekräftelse-modal */}
      {showPopup && (
        <AirportTransferConfirmation onClose={handleClosePopup} />
      )}

      {/* Sektion för information om transfer */}
      <div className="py-12">
        <div className="mb-8 w-[1200px] mx-auto">
          <h2 className="text-3xl font-bold text-black mb-8">
            How does it work?
          </h2>
        </div>
        <div className="flex justify-center">

          {/* Bild med information om transfer */}
          <img
            src={AirportTransferTimeline}
            alt="Airport Transfer Timeline"
            className="w-[80%]"
          />
        </div>
      </div>

      <div className="mb-8 w-[1200px] mx-auto">
        <h3 className="text-xl font-bold my-4">About the transfer</h3>
        <p className="text-lg text-black max-w-[700px]">
          Enjoy hassle-free airport transfers to and from your accommodation.
          Whether you need a one-way or round-trip service, pre-book your
          transport to ensure a smooth and comfortable journey. Reliable drivers
          and flexible options make it easy to reach your destination on time.
        </p>
        <h4 className="text-lg font-bold my-4">Delayed flight?</h4>
        <p className="text-lg text-black mt-4 max-w-[700px]">
          Our drivers track your flight, so even if it’s delayed, we’ll adjust
          your pickup time to ensure a smooth ride without the wait.
        </p>
      </div>
    </div>
  );
}

export default AirportTransferPage;