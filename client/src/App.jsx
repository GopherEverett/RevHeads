import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BuilderList from './components/BuilderList';
import Builder from './components/Builder';
import Car from './components/Car';
import Bar from './components/Navbar';
import CarList from './components/CarList';
import HomePage from './components/HomePage'
import Project from './components/Project';
import VinLookup from './components/VinLookup'

class App extends Component {
  render() {
    return (
      <Router>
      <Bar/>
          <Switch>
            <Route exact path='/' component={HomePage}/>
            <Route path='/builders' component={BuilderList}/>
            <Route path='/cars/' component={CarList}/>
            <Route path='/builder/:id' component={Builder}/>
            <Route path='/car/:id' component={Car}/>
            <Route path='/project/:id' component={Project}/>
            <Route path='/vinlookup/' component={VinLookup}/>
          </Switch>
      </Router>
    );
  }
}

export default App;
