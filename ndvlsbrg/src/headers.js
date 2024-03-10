import "./css/headers.css";
import logo from "./assets/Ndvlogo.svg";


function headerMainPage(){
    return(
        <header>
            <div class="logo"><img src={logo} className="svg-container" alt="logo" /></div>
                <div class="buttons">
                    <button onclick="window.location.href='login.html'">Log in</button>
                    <button onclick="window.location.href='signup.html'">Sign Up</button>
                    <button onclick={toggleMenu()}>options</button>
                </div>
        </header>)
}

function toggleMenu() {
    console.log("pressed");
    // var dropdownMenu = document.getElementById('dropdownMenu');
    // dropdownMenu.style.display = dropdownMenu.style.display === 'none' ? 'block' : 'none';
}

export default headerMainPage