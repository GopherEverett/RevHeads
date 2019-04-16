import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import BuilderList from './components/BuilderList';
import Builder from './components/Builder';
import Car from './components/Car';
import Bar from './components/Navbar';
import CarList from './components/CarList'

class App extends Component {
  render() {
    return (
      <Router>
      <Bar/>
        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div> */}
          <Switch>
            <Route exact path='/' component={BuilderList}/>
            <Route path='/cars/' component={CarList}/>
            <Route path='/builder/:id' component={Builder}/>
            <Route path='/car/:id' component={Car}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
