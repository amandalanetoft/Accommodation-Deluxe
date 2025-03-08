/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Car from "../../assets/images/Car.png";

// Bekträftelse för bokad flygplatstransfer
function AirportTransferConfirmation({ onClose }) {
  return (
    //Layout som omfamnar allt innehåll
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-70">
      <div className="rounded-lg shadow-xl max-w-md w-full relative bg-white">
        
        {/* Stängningsknapp i övre högra hörnet */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faTimes} className="w-6 h-6" />
        </button>

        {/* Bekräftelse - text-innehåll */}
        <div className="p-6 text-center">
          <h2 className="text-[24px] font-bold mb-4">Confirmation</h2>
          <p className="text-[20px] mb-4">
            Thank you for your reservation!
          </p>
          <img
            src={Car}
            alt="Car"
            className="w-[200px] h-auto rounded-lg mx-auto"
          />
          <div className="bg-opacityLightBlue p-4">
            <p className="mb-4 text-[14px]">
              We are pleased to confirm that your airport transfer has been
              successfully booked.
            </p>
            <p className="mb-4 text-[14px]">
              Our driver will meet you in the arrival area, holding a sign with
              your name. Should you need to make any changes or have any
              questions, please feel free to contact us.
            </p>
            <p className="text-[14px]">
              A confirmation email with all the details will be sent to you
              shortly. We look forward to welcoming you!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirportTransferConfirmation;