import React, { Component } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'

export default class NavDropdown extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle outline color="secondary" caret>
                Menu
            </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem header>Go To:</DropdownItem>
                    <DropdownItem><Link to="/builders" style={{ textDecoration: 'none', color: 'blue' }}>Builders</Link></DropdownItem>
                    <DropdownItem><Link to="/cars" style={{ textDecoration: 'none', color: 'blue' }}>Cars</Link></DropdownItem>
                    <DropdownItem><Link to="/vinlookup" style={{ textDecoration: 'none', color: 'blue' }}>Get Car Info by VIN</Link></DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}
