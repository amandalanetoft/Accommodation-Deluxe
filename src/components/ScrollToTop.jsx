// ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//Återställer sidans scrollposition till toppen vid sidbyte
const ScrollToTop = () => {
	const { pathname } = useLocation(); // Använder useLocation för att få tillgång till den aktuella sidans pathname

	// useEffect-hooken körs varje gång pathname ändras(vid navigering till en ny sida)
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]); 

	return null;
};

export default ScrollToTop;
