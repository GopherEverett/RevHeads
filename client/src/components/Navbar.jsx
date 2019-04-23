
import React from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Button} from 'reactstrap';
import logo from '../images/favicon-32x32.png'
import { Link } from 'react-router-dom'

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
                <Link to={'../'}><Button outline color="secondary" className="mr-2">⬅︎</Button></Link>
                <NavbarToggler color="secondary" onClick={this.toggleNavbar} className="mr-2" />
                {' '}
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar style={{ color: "white" }}>
                        <NavItem>
                            <NavLink className="text-right" tag={Link} to="/builders">Builders</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-right" tag={Link} to="/cars">Cars</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="text-right" tag={Link} to="/vinlookup/">Get Car Info by VIN</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}