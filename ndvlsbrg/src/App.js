import React, { useState } from 'react';
import './css/App.css';
import "./headers"
import headerMainPage from './headers';
import mainBody from './body';
import GenerateFooter from './footers'
import Login from './LoginPage';
import IPAddressFetcher from './IpAddressFetcher';
//import { json } from 'body-parser';


//gets the browser verion and agent to log in db
var BrowserAgent = navigator.userAgent;
var BrowserVersion = GetBrowserVersion();

function GetBrowserVersion() {
  var userAgent = navigator.userAgent;
  var isMobile = /Mobile/.test(userAgent);

  var browserType;
  var version;

  if (/OPR/.test(userAgent)) {
    browserType = "Opera";
    version = userAgent.match(/OPR\/(\S+)/)[1];
  } else if (/Chrome/.test(userAgent)) {
    browserType = "Google Chrome";
    version = userAgent.match(/Chrome\/(\S+)/)[1];
  } else if (/Safari/.test(userAgent)) {
    browserType = "Safari";
    version = userAgent.match(/Version\/(\S+)/)[1];
  } else if (/Firefox/.test(userAgent)) {
    browserType = "Mozilla Firefox";
    version = userAgent.match(/Firefox\/(\S+)/)[1];
  } else if (/Edge/.test(userAgent)) {
    browserType = "Microsoft Edge";
    version = userAgent.match(/Edge\/(\S+)/)[1];
  } else if (/Trident/.test(userAgent)) {
    browserType = "Internet Explorer";
    version = userAgent.match(/rv:(\S+)/)[1];
  } else {
    browserType = "Unknown";
    version = "Unknown";
  }

  return  { browserType: browserType, Version: version, Ismobile: isMobile};
}

//logs browser version in db
const PageLoad = async (ipAddress) => {
  console.log("type of browser car: ", typeof(BrowserVersion));
  try {

    await fetch('http://84.229.249.59:5000/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },      
      body: JSON.stringify({ ipAddress: ipAddress, agent: BrowserAgent, browserType: BrowserVersion["browserType"], Version: BrowserVersion["version"], Ismobile: BrowserVersion["isMobile"]}),
    });
  } catch (error) {
    console.error('Error:', error);
  }
}


//actaul app fauntion that builds the entire page 
function App() {
  const [ipAddress, setIPAddress] = useState(null);
  PageLoad(ipAddress);
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
