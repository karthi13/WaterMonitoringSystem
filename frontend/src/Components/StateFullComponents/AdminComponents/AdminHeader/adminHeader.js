import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, NavbarNav,
    NavbarToggler, Collapse, NavItem,
    NavLink, Dropdown, DropdownToggle,
    DropdownMenu, DropdownItem,} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import './adminheader.css';


class AdminHeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            isWideEnough: false,
        };
        this.onClick = this.onClick.bind(this);
        this.onLogoutClickHandler = this.onLogoutClickHandler.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    onLogoutClickHandler = (e) => {
        e.preventDefault();
        this.props.history.push("/");
    }
    render() {
        return (
            <Router>
                <Navbar color="indigo" dark expand="md" scrolling>
                    <NavbarBrand href="/home">
                        <img src="images/image.png" height="30" />
                    </NavbarBrand>
                    {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
                    <Collapse isOpen={this.state.collapse} navbar>
                        <NavbarNav left>
                            <NavItem active>
                                <NavLink to="#">Home</NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink to="#"></NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/payments"></NavLink>
                            </NavItem> */}
                        </NavbarNav>
                        <NavbarNav right>
                        <NavItem>
                            {/* <NavLink to="#"><i class="fa fa-bell" aria-hidden="false"><Badge pill color="indigo" pill><Fa icon="bullhorn" aria-hidden="true"/></Badge></i></NavLink> */}
                                <Dropdown>
                                    <DropdownToggle nav>
                                        <img src="images/notificationIcon.png" height="30" />
                                    </DropdownToggle>
                                    <DropdownMenu right style={{ right: 'auto' }}>
                                        {/* <DropdownItem href="#">My Account</DropdownItem>
                                        <DropdownItem href="#">Logout</DropdownItem>
                                        <DropdownItem href="#">Another Action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem> */}
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                        </NavItem>

                            <NavItem>
                                <Dropdown>
                                    <DropdownToggle nav caret>
                                        <img src="images/userPicture.png" height="30" />
                                        
                                    </DropdownToggle>
                                    <DropdownMenu right style={{ right: 'auto' }}>
                                        <DropdownItem href="#">My Account</DropdownItem>
                                        <DropdownItem href="/">Logout</DropdownItem>
                                        {/* <DropdownItem href="#">Another Action</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem>
                                        <DropdownItem href="#">Something else here</DropdownItem> */}
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </NavbarNav>
                    </Collapse>
                </Navbar>
            </Router>
        );
    }
}

export default AdminHeaderComponent;