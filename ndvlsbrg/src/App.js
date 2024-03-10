import logo from './logo.svg';
import './css/App.css';
import "./headers"
import headerMainPage from './headers';

let state = 1;

function App() {
  if(state==0){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  else{
    return(
      headerMainPage()
    )
  }
}

export default App;
