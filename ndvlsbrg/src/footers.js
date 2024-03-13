import "./css/footers.css";
import React, {useState, useEffect, useRef} from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faWhatsapp, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const mailtoMail="Nadav.Elsberg@protonmail.com"

const ContactUsLink = "mailto: "+mailtoMail+"?subject=Contacted%20From%20You're%20Site&body=Hello%20I%20have%20arrived%20from%20you're%20website";
const ContactUsPhone = "https://wa.me/972527422075?text=Hey!%20I%20have%20reached%20you%20from%20you're%20site";
const ReportABugLink = "mailto: "+mailtoMail+"?subject=Bug%20report&body=I%20have%20found%20a%20bug!%20details:"


function About(){    
    return(
        <footer>
            <div class="footer-about">
                <p>This website was developed by Nadav Elsberg &copy; 2024, as a side project to test abilities.</p>
                <p>For further knowledge and information, you may contact via the Contact Us section.</p>
            </div>
        </footer>
    )  
}
// function ContactUs(){
//     return(
//         <div>
//             <a href={ContactUsPhone}target="_blank" rel="noopener noreferrer">
//                 <FontAwesomeIcon icon={faWhatsapp} />
//                 <span> via WhatsApp</span>
//             </a>

//             <a href={ContactUsLink} target="_blank" rel="noopener noreferrer">
//                 <FontAwesomeIcon icon={faEnvelope} />
//                 <span> via Mail</span>
//             </a>
//         </div>
//     )
// }

function GenerateFooter() {
    const [showAbout, setShowAbout] = useState(false);
    const aboutRef = useRef("");

    useEffect(() => {
        // Scroll to the About section when it's shown
        if (showAbout && aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showAbout]);

    const toggleAbout = () => {
        setShowAbout(prevShowAbout => !prevShowAbout);
    };

    return (
        <footer>
            <div className="footer-links">
                <button className="footer-button" onClick={toggleAbout}>Contact us</button>
                <button className="footer-button" onClick={toggleAbout}>About</button>
                <a href={ReportABugLink} target="_blank">Report a Bug</a>
            </div>
            <div className="footer-info">
                <p>&copy; 2024 Your Website</p>
            </div>
            {showAbout && <About ref={aboutRef} />}
        </footer>
    )
}



export default GenerateFooter;