import React, { Component } from 'react'
import logo from '../logo.svg'
import '../App.css';

export default class HomePage extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
            </div>
        )
    }
}
