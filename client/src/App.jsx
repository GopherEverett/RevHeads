import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BuilderList from './components/BuilderList';
import Builder from './components/Builder';
import Car from './components/Car';
import Bar from './components/Navbar';
import CarList from './components/CarList';
import HomePage from './components/HomePage'
import Project from './components/Project';
import VinLookup from './components/VinLookup';
import styled from 'styled-components';
import img from './images/francesco-ungaro-1208184-unsplash.jpg'

const Body = styled.div`
background-image: url(${img});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-attachment: fixed;
height: 160vh;
width: 100vw;
display; flex;
align-content: center;
`

class App extends Component {
  render() {
    return (
      <Router>
        <Bar />
        <Body>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/builders' component={BuilderList} />
            <Route path='/cars/' component={CarList} />
            <Route path='/builder/:id' component={Builder} />
            <Route path='/car/:id' component={Car} />
            <Route path='/project/:id' component={Project} />
            <Route path='/vinlookup/' component={VinLookup} />
          </Switch>
        </Body>
      </Router>
    );
  }
}

export default App;
