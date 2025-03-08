import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'


// Komponent för att visa en "checklista" i övre kant som följer med vid skrollning 
function ScrollCheck() {
  // Definierar tillstånd för aktivt steg
  const [activeStep, setActiveStep] = useState(0)
  // Stegen som ska visas i checklistan
  const steps = ['Your selection', 'Add to your stay', 'Your details', 'Payment details']

  
  // Effekt-hook för att hantera skrollnings-händelser, vilket inkluderar aktuell position, höjd på fönstret, totalhöjd på dokumentet
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // Används för att beräkna hur långt ner användaren har scrollat som en procentandel och vilket steg som ska aktiveras
      const progress = scrollPosition / (documentHeight - windowHeight)
      const newActiveStep = Math.floor(progress * steps.length)

      // Används för att sätta aktivt steg och se till att det inte överstiger antalet steg
      setActiveStep(Math.min(newActiveStep, steps.length - 1))
    }

    // Lägger till skrollnings-"eventlistener"
    window.addEventListener('scroll', handleScroll)
    //Används för att se till att inga oanvända "eventlistner" finns kvar när komponenten försvinner
    return () => window.removeEventListener('scroll', handleScroll)
  }, [steps.length])

  return (
    <div className="top-0 left-0 right-0 bg-white shadow-sm p-4 z-50">
      <div className="relative max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Linjen bakom cirklarna */}
        <div className="absolute top-1/3 left-[5%] right-[5%] h-0.5 bg-lightGrey z-0"></div>

        {steps.map((step, index) => (
          <div key={step} className="relative z-10 flex flex-col items-center">
            <div className="flex items-center">
              {/* Används för att visa cirklar som representerar varje steg */}
              <div className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center bg-white ${
                index <= activeStep ? 'border-roomGreen text-roomGreen' : 'border-lightGrey text-lightGrey'
              }`}>
                {/* Används för att sätta en bock om steget är aktivt, annars visar stegets nummer */}
                {index <= activeStep ? (
                  <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
            </div>
            
            {/* Visar stegnamnet under cirkeln */}
            <div className="mt-2 text-xs font-medium text-center">{step}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScrollCheck;