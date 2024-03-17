import React, { useState, useEffect } from 'react';
import './css/App.css';
import "./headers"
import headerMainPage from './headers';
import mainBody from './body';
import GenerateFooter from './footers'
import Login from './LoginPage';
import IPAddressFetcher, { BrowserAgent, BrowserVersion } from './UserDataFetcher';
//import { json } from 'body-parser';


//logs browser version in db
const PageLoad = async (ipAddress) => {
  console.log("type of browser car: ", typeof (BrowserVersion));
  try {

    await fetch('http://84.229.249.59:5000/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ipAddress: ipAddress, agent: BrowserAgent, browserType: BrowserVersion["browserType"], Version: BrowserVersion["version"], Ismobile: BrowserVersion["isMobile"] }),
    });
  } catch (error) {
    console.error('Error:', error);
  }
}



// actual app function that builds the entire page 
function App() {
  const [ipAddress, setIPAddress] = useState(null);

  useEffect(() => {
    // Run PageLoad function only once on initial load
    PageLoad(ipAddress);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      {IPAddressFetcher(setIPAddress)}
      {headerMainPage()}
      {Login(ipAddress)}
      {mainBody(ipAddress)}
      {GenerateFooter()}
    </div>
  );
}

export default App;
