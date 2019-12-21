import React from 'react';
import Navbar from '../src/components/Navbar';
import './App.css';
import Home from './components/Home';
import Search from './components/Search';
import {
  BrowserRouter as Router,
  Switch,
  Route

} from 'react-router-dom'

import Details from "./components/Details"



function App() {
  return (
    <div className="App">
      <Router > <Navbar />



        <Switch>
          <Route exact path="/"> <Home /></Route>

          <Route exact path="/search"><Search /></Route>
          <Route exact path="/details"> <Details /></Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
