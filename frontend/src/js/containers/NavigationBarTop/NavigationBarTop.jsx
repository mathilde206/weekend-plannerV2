import React, { Fragment } from 'react';
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
import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingCart,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import * as reducers from '../../reducers';

library.add(
    faShoppingCart,
    faUser,
);
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
            isAuthenticated,
            itemsInCart,
            userId,
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
                            <NavItem>
                                <NavLink href="/products/">Products</NavLink>
                            </NavItem>
                            {
                                isAuthenticated ?
                                    (
                                        <UncontrolledDropdown nav inNavbar>
                                            <DropdownToggle nav caret>
                                                Account&nbsp;
                                                <span
                                                    className="badge badge-light"
                                                    style={{ visibility: itemsInCart === 0 ? 'hidden' : 'visible' }}
                                                >
                                                    {itemsInCart}
                                                </span>
                                            </DropdownToggle>
                                            <DropdownMenu right>

                                                <Link to={`/${userId}/profile`}>
                                                    <DropdownItem>
                                                        <FontAwesomeIcon icon="user" /> Profile
                                                    </DropdownItem>
                                                </Link>
                                                <DropdownItem divider />
                                                <Link
                                                    to={
                                                        itemsInCart === 0 ?
                                                            '/products/' :
                                                            `/${userId}/checkout/`
                                                    }>
                                                    <DropdownItem>
                                                        <FontAwesomeIcon icon="shopping-cart" /> Cart&nbsp;
                                                        <span
                                                            className="badge badge-light"
                                                            style={{ visibility: itemsInCart === 0 ? 'hidden' : 'visible' }}
                                                        >
                                                            {itemsInCart}
                                                        </span>
                                                    </DropdownItem>
                                                </Link>

                                                <DropdownItem divider />
                                                <Link to="/login/">
                                                    <DropdownItem>
                                                        Logout
                                                    </DropdownItem>
                                                </Link>

                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    ) : (
                                        <Fragment>
                                            <NavItem>
                                                <NavLink href="/login/">Login</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink href="/register/">Register</NavLink>
                                            </NavItem>
                                        </Fragment>
                                    )
                            }

                        </Nav>
                    </Collapse>
                </Navbar>
            </div>);
    }
}

NavigationBarTop.defaultProps = {
    isAuthenticated: false,
    itemsInCart: 0,
    userId: null,
};

NavigationBarTop.propTypes = {
    isAuthenticated: PropTypes.bool,
    itemsInCart: PropTypes.number,
    userId: PropTypes.number,
};

const mapStateToProps = (state) => {
    const {
        user,
        cart,
    } = state;

    const cartContent = cart.cart || [];

    return {
        isAuthenticated: reducers.isAuthenticated(state),
        itemsInCart: cartContent.length,
        userId: user.id,
    };
};

export default connect(mapStateToProps)(NavigationBarTop);
