import './css/LogIn.css';
import React, { useState } from 'react';

function LoginPage(ipAddress) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://84.229.249.59:5000/login2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password ,ipAddress}),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        setLoggedInUser(data.Name); // Assuming the server returns "name" instead of "user.Name"
        setError(null);
      } else {
        setError(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
    </div>
  );
}

export default LoginPage;
