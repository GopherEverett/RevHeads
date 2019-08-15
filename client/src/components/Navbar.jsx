
import React from 'react';
import { Navbar, NavbarBrand, Button} from 'reactstrap';
import logo from '../images/favicon-32x32.png'
import { Link } from 'react-router-dom'
import NavDropdown from './NavDropdown'

export default class Bar extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }
    render() {
        return (
            <Navbar color='light' light style={{ fontFamily: "Prompt" }}>
                <NavbarBrand href="/" className="mr-auto">
                    <img src={logo} alt='' />
                </NavbarBrand>
                <Link to={'../'}><Button outline color="secondary" className="mr-2">⬅︎ Back</Button></Link>
                <NavDropdown />
            </Navbar>
        );
    }
}