import React, { Component } from 'react'
import logo from '../logo.svg'
import '../App.css';
import { Col } from 'reactstrap'

export default class HomePage extends Component {
    render() {
        return (
            <Col sm="12" md={{ size: 8, offset: 2 }}>
                <div className="App">
                    <br />
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1>Welcome to RevHeads</h1>
                    </header>
                </div>
            </Col>
        )
    }
}
