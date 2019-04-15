import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import BuilderList from './components/BuilderList';
import Builder from './components/Builder'

class App extends Component {
  render() {
    return (
      <Router>
        {/* <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
        </div> */}
          <Switch>
            <Route exact path='/' component={BuilderList}/>
            <Route path='/builder/:id' component={Builder}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
