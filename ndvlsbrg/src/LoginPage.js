import "./css/LogIn.css";
import React, { useState } from "react";

function storeAuthkey(jsonData) {
  if (jsonData.hasOwnProperty("authKey")) {
    // Get the value of the "authKey" field
    const authKeyValue = jsonData.authKey;

    // Calculate the expiration time (one week from now)
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    // Set the cookie with the same name and value
    document.cookie = `authKey=${authKeyValue}; expires=${expirationDate.toUTCString()}; path=/`;

    console.log("AuthKey stored in cookie.");
  } else {
    console.log("JSON object does not contain an 'authKey' field.");
  }
}

export function getAuthKey() {
  const name = "authKey=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
}

export function authenticate(ipAddress) {
  // const [loggedInUser, setLoggedInUser] = useState(null);
  //const [errorr, setError] = useState(null);

  const authKey = getAuthKey();
  console.log("Auth key: ", authKey);

  const handleAuth = async () => {
    try {
      const response = await fetch("http://84.229.249.59:5000/auth",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authKey, ipAddress }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        //setError(data.error);
      }
      return data;

    } catch (error) {
      console.error("Error:", error);
      //setError("An error occurred. Please try again later.");
      console.log(error.JSON);
      return {"error":error}
    }
  };

  return handleAuth();
}

function LoginPage(ipAddress) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://84.229.249.59:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, ipAddress }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setLoggedInUser(data.Name);
        storeAuthkey(data);
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
      console.log(error.JSON);
    }
  };

  return (
    <div class="cookie-manager">
      <h2>Login Page</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
    </div>
  );
}

export default LoginPage;
