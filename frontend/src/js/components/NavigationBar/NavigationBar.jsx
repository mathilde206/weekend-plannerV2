import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import './NavigationBar.scss';

class Navigation extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div className="container-fluid">
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Weekend Planner</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/explore/">Explore</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/add/">Add an Itinerary</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Account
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/login">
                                            {
                                                this.props.user
                                                    ? 'Logout'
                                                    : 'Login'
                                            }
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Profile
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.authentication;
    return {
        user,
    };
};

const NavigationBar = connect(mapStateToProps)(Navigation);

export default NavigationBar;