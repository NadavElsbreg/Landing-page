import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './css/App.css';
import "./headers"
import headerMainPage from './headers';
import mainBody from './body';
import GenerateFooter from './footers'
import Login from './LogInForm';

function App() { 
    return(
      <div>
        {headerMainPage()}
        {Login()}
        {mainBody()}
        {GenerateFooter()}
      </div>
    );
  
}

export default App;
