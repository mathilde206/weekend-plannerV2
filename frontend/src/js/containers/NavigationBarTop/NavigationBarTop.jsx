import React from 'react';
import PropTypes from 'prop-types';
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

import * as reducers from '../../reducers';
import './NavigationBarTop.scss';

class NavigationBarTop extends React.Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const {
            isAuthenticated
        } = this.props;

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
                                <NavLink href="/create">Add an Itinerary</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Account
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/login/">
                                            {
                                                isAuthenticated ?
                                                    'Logout' :
                                                    'Login'
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

NavigationBarTop.defaultProps = {
    isAuthenticated: false,
};

NavigationBarTop.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: reducers.isAuthenticated(state)
    };
};

export default connect(mapStateToProps)(NavigationBarTop);