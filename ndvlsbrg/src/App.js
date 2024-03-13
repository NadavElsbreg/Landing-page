import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './css/App.css';
import "./headers"
import headerMainPage from './headers';
import mainBody from './body';
import GenerateFooter from './footers'

function App() { 
    return(
      <div>
        {headerMainPage()}
        {mainBody()}
        {GenerateFooter()}
      </div>
    );
  
}

export default App;
