import "./css/LogIn.css";
import React ,{useState} from "react";


const currentDate = new Date();

function GetExpireDateInDays(days){
    return new '; expires='+Date(currentDate.getDate()+86400000*days+'; path=/');
}

function GetCookies(){
    return document.cookie;
}

function ChangeCookie(cookieName, newValue, expiresin){
    document.cookie = cookieName+'='+newValue+GetExpireDateInDays(expiresin);
}

function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires= 01 Jan 1917 00:00:00 GMT; path=/`;
}

function Login(){
    const [cookieName, setCookieName] = useState('');
    const [cookies, setCookies] = useState(document.cookie.split(';').map(cookie => cookie.trim()));

    // Function to add a new cookie
    const addCookie = () => {
        if (cookieName.trim() !== '') {
            document.cookie = `${cookieName}=true`+GetExpireDateInDays(7);
            setCookies([...cookies, cookieName]);
            setCookieName('');
        }
    };

    return (
        <div className="cookie-manager">
            <h2>Cookie Manager</h2>
            <label htmlFor="cookieInput">Enter Cookie Name:</label>
            <input
                type="text"
                id="cookieInput"
                placeholder="Enter cookie name"
                value={cookieName}
                onChange={(e) => setCookieName(e.target.value)}
            />
            <button onClick={addCookie}>Add Cookie</button>
            <div>
                <h3>Current Cookies:</h3>
                {cookies.map((cookie, index) => (
                    <p key={index}>{cookie}</p>
                ))}
            </div>
            <div>
                <h3>unformatted cookies</h3>
                <p>{GetCookies()}</p>
            </div>
        </div>
    );
}

export default Login;