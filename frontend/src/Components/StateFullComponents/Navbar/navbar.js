import React, { Component } from 'react';
import { Navbar,  NavItem } from 'react-bootstrap';
import './navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NavbarComponent extends Component {

    render() {
        return (
            <div>
                <Navbar default inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Water Monitoring System
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Navbar.Header>
                        <Navbar.Brand pullRight>
                            <NavItem eventKey={2} href="#">
                                Login
                                <FontAwesomeIcon icon="fas fa-user" />
                            </NavItem>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}

export default NavbarComponent;