import "./css/footers.css";
import React, {useState, useEffect, useRef} from "react";
import { Envelope, Whatsapp } from 'react-bootstrap-icons';

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
function ContactUs(){
    return(
        <div class="footer-links">
            <a href={ContactUsPhone} class="whatsapp-link" target="_blank" rel="noopener noreferrer">
                <Whatsapp size={24} color="green" />
                <span> via WhatsApp</span>
            </a>

            <a href={ContactUsLink} class="mail-link" target="_blank" rel="noopener noreferrer">                
                <Envelope size={24} color="blue" />
                <span> via Mail</span>
            </a>
        </div>
    )
}

function GenerateFooter() {
    const [showAbout, setShowAbout] = useState(false);
    const [showContactUs, setContactUs]= useState(false);
    const aboutRef = useRef("");
    const contactUsRef = useRef("");

    useEffect(() => {
        // Scroll to the About section when it's shown
        if (showAbout && aboutRef.current) {
            aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showAbout]);

    const toggleAbout = () => {
        if(showContactUs){
            setContactUs(prevShowContactUs=> !prevShowContactUs);
        }
        setShowAbout(prevShowAbout => !prevShowAbout);
    };

    useEffect(() => {
        // Scroll to the About section when it's shown
        if (showContactUs && contactUsRef.current) {
            contactUsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showContactUs]);

    const toggleContactUs = () => {
        if(showAbout){
            setShowAbout(prevShowAbout => !prevShowAbout);
        }
        setContactUs(prevShowContactUs => !prevShowContactUs);
    };

    return (
        <footer>
            <div className="footer-links">
                <button className="footer-button" onClick={toggleContactUs}>Contact us</button>
                <button className="footer-button" onClick={toggleAbout}>About</button>
                <a href={ReportABugLink} target="_blank">Report a Bug</a>
            </div>
            <div className="footer-info">
                <p>&copy; 2024 Your Website</p>
            </div>
            {showAbout && <About ref={aboutRef} />}
            {showContactUs && <ContactUs ref={contactUsRef}/>}
        </footer>
    )
}



export default GenerateFooter;