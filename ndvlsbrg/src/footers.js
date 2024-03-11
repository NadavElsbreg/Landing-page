import "./css/footers.css";


const mailtoMail="Nadav.Elsberg@protonmail.com"

const ContactUsLink = "mailto: "+mailtoMail+"?subject=Contacted%20From%20You're%20Site&body=Hello%20I%20have%20arrived%20from%20you're%20website";
const ReportABugLink = "mailto: "+mailtoMail+"?subject=Bug%20report&body=I%20have%20found%20a%20bug!%20details:"


function generateFooter() {
    return (
        <footer>
            <div class="footer-links">
                <a href={ContactUsLink} target="_blank">Contact Us</a>
                <a href='#'>About</a>
                <a href={ReportABugLink} target="_blank">Report a Bug</a>
            </div>
            <div class="footer-info">
                <p>&copy; 2024 Your Website</p>
            </div>
        </footer>
    )
}

export default generateFooter;