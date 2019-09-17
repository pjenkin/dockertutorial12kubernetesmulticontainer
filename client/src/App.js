import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';   // 8-16 'Routing in the React App'
import OtherPage from './OtherPage';  // 8-16 'Routing in the React App'
import Fib from './Fib';              // 8-16 'Routing in the React App'

function App() {
  return (
    <Router>  {/*} 8-16 'Routing in the React App'  */}
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Link to="/">Home</Link>  {/*} 8-16 'Routing in the React App'  */}
          <Link to="/otherpage">Other Page</Link> {/*} 8-16 'Routing in the React App'  */}
          {/*<p>
            Edit <code>src/App.js</code> and save to reload.
          </p>*/}
          <div>
            <Route exact path="/" component={Fib} />  {/*} 8-16 'Routing in the React App'  */}
            <Route path="/otherpage" component={OtherPage} /> {/*} 8-16 'Routing in the React App'  */}
          </div>
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
    </Router>  // 8-16 'Routing in the React App'
  );
}

export default App;
