import React, { useState, useEffect } from 'react';
import './css/App.css';
import "./headers"
import headerMainPage from './headers';
import mainBody from './body';
import GenerateFooter from './footers';
import IPAddressFetcher, { BrowserAgent, BrowserVersion } from './UserDataFetcher';
import LoginPage from './LoginPage';
//import Cookies from 'js-coockie';
//import { json } from 'body-parser';


//logs browser version in db
const PageLoad = async (ipAddress) => {
  console.log("type of browser: ", typeof (BrowserVersion));
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

  //return Cookies.get('authToken')
}

// actual app function that builds the entire page 
function App() {
  PageLoad();
  var ipAddress = IPAddressFetcher();

  return (
    <div>
      {headerMainPage()}
      <LoginPage ipAddress={ipAddress}/>
      {mainBody(ipAddress)}
      {GenerateFooter()}
    </div>
  );
}

export default App;