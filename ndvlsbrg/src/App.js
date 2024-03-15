import React ,{useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './css/App.css';
import "./headers"
import headerMainPage from './headers';
import mainBody from './body';
import GenerateFooter from './footers'
import Login from './LoginPage';
import IPAddressFetcher from './IpAddressFetcher';


function App() { 
   const [ipAddress, setIPAddress] = useState(null);
    return(
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
