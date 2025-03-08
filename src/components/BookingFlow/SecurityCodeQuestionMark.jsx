import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons'

function SecurityCodeQuestionMark() {

  // Används för att hantera tillståndet för om hjälpfönstret är öppet eller stängt
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative text-[20px]">
      {/* Knapp som vid klickning öppnar fönstret*/}
      <button
        onClick={() => setIsOpen(true)}
        className="text-black/50 hover:text-black/80 transition-colors"
      >
        {/* Används för att visa frågeteckenikonen */}
        <FontAwesomeIcon icon={faQuestionCircle}  />
      </button>
      
      {/* Används för att visa hjälpfönstret om isOpen är sant */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-[306px] h-[299px] rounded-lg shadow-lg relative">

            {/* Används för att stänga fönstret vid klickning*/}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-darkGrey hover:lightGrey"
              aria-label="Close"
            >
              {/* Visar krysset (stäng) ikonen */}
              <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Hjälpfönstrets innehåll med en rubrik och beskrivande text om säkerhetskoderna, samt visar ett exempel på en säkerhetskod */}
            <div className="p-6 bg-white rounded-[10px]">
              <h2 className="text-xl font-bold mb-4">Security code</h2>
              <p className="mb-4">Most cards have three numbers on the back</p>
              <div className="bg-lightGrey p-4 rounded-lg mb-4">
                <div className="bg-lightGrey w-full h-8 mb-2 rounded"></div>
                <div className="bg-lightGrey w-12 h-8 rounded-full flex items-center justify-center font-bold">
                  123
                </div>
              </div>
              <p className="mb-4">Amex has 4 numbers on the front</p>
              <div className="bg-lightGrey p-4 rounded-lg">
                <div className="bg-lightGrey w-full h-8 mb-2 rounded"></div>
                <div className="bg-lightGrey w-12 h-8 rounded-full flex items-center justify-center font-bold">
                  1234
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SecurityCodeQuestionMark;