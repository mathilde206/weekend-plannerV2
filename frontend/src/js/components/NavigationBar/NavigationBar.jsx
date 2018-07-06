import React from 'react';
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

class NavigationBar extends React.Component {
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
            <div>
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
                                            {/* TODO: this doesn't work */}
                                            {
                                                this.props.user === ''
                                                    ? 'Login'
                                                    : 'Logout'
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

//
// class Navbar extends React.Component {
//     state = {
//         dropdownIsOpen:false,
//     };
//
//     toggle = () => {
//         this.setState({
//             dropdownIsOpen:!this.state.dropdownIsOpen,
//         });
//     };
//
//     render() {
//         return (
//             <div>
//             <Navbar color="light" light expand="md">
//                 <NavbarBrand href="/">Weekend Planner</NavbarBrand>
//                 <button className="navbar-toggler"
//                     type="button"
//                     data-toggle="collapse"
//                     data-target="#navbarSupportedContent"
//                     aria-controls="navbarSupportedContent"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon" />
//                 </button>
//
//                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                     <ul className="navbar-nav mr-auto">
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Explore</a>
//                         </li>
//                         <li className="nav-item">
//                             <a className="nav-link" href="#">Add An Itinerary</a>
//                         </li>
//                         <li className="nav-item dropdown">
//                             <a className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="navbarDropdown" aria-haspopup="true" aria-expanded="false">
//                                 Account
//                             </a>
//                             <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                                 <Link to="/about">About</Link>
//                                 <a className="dropdown-item" href="#">Register</a>
//                                 <Link to="/login">
//                                     {
//                                         localStorage.getItem('auth')
//                                             ? 'Logout'
//                                             : 'Login'
//                                     }
//                                 </Link>
//                             </div>
//                             <Dropdown isOpen={this.state.dropdownIsOpen} toggle={this.toggle}>
//                                 <DropdownToggle caret>
//                                     Dropdown
//                                 </DropdownToggle>
//                                 <DropdownMenu>
//                                     <DropdownItem header>Header</DropdownItem>
//                                     <DropdownItem disabled>Action</DropdownItem>
//                                     <DropdownItem>Another Action</DropdownItem>
//                                     <DropdownItem divider />
//                                     <DropdownItem>Another Action</DropdownItem>
//                                 </DropdownMenu>
//                             </Dropdown>
//                         </li>
//                     </ul>
//                     <form className="form-inline my-2 my-lg-0">
//                         <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
//                         <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//                     </form>
//                 </div>
//             </nav>
//             </div>
//         );
//     }
// }

export default NavigationBar;