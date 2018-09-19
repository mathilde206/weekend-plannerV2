import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import { history } from '../../helpers/';
import {
    fetchItineraries,
    fetchUserData,
    getCart,
    successLogin,
} from '../../actions';

import {
    Footer,
    Four0FourPage,
} from '../../components';

import ExploreItineraries from '../ExploreItineraries/ExploreItineraries';
import Home from '../Home/Home';
import ItineraryDetails from '../ItineraryDetails/ItineraryDetails';
import LoginPage from '../LoginPage/LoginPage';
import ProductPage from '../ProductPage/ProductPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import NavigationBarTop from '../NavigationBarTop/NavigationBarTop';
import CreateItinerary from '../CreateItinerary/CreateItinerary';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import ProfilePage from '../ProfilePage/ProfilePage';
import CheckoutContainer from '../CheckoutContainer/CheckoutContainer';
import UpdateItinerary from '../UpdateItinerary/UpdateItinerary';
import Orders from '../Orders/Orders';

import './App.scss';

class App extends React.Component {
    state = {
        isLoading: true,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (typeof nextProps.isLoading !== undefined && nextProps.isLoading !== prevState.isLoading) {
            return { isLoading: nextProps.isLoading };
        }
        else return null;
    }

    componentDidMount() {
        const {
            dispatch
        } = this.props;

        if (localStorage.getItem('persist:store')
            && JSON.parse(localStorage.getItem('persist:store')).auth
            && JSON.parse(JSON.parse(localStorage.getItem('persist:store')).auth).access
        ) {
            const auth = JSON.parse(JSON.parse(localStorage.getItem('persist:store')).auth);
            const id = auth.access.user_id;
            dispatch(fetchUserData(id));
            dispatch(successLogin(auth));
        }

        if (localStorage.getItem('persist:store') &&
            JSON.parse(localStorage.getItem('persist:store')).cart &&
            JSON.parse(JSON.parse(localStorage.getItem('persist:store')).cart) &&
            JSON.parse(JSON.parse(localStorage.getItem('persist:store')).cart).cart
        ) {
            const cart = JSON.parse(JSON.parse(localStorage.getItem('persist:store')).cart);
            dispatch(getCart(cart.cart, cart.total));
        }
        dispatch(fetchItineraries(1));
    }

    render() {

        const { isLoading } = this.state;

        if (isLoading) {
            return (
                <div className="container">
                    <ReactLoading type="bubbles" color="#000c4f" />
                </div>
            );
        }

        return (
            <Router history={history}>
                <div className="container-fluid">
                    <NavigationBarTop user={this.props.user || ''} />
                    <div className="app-container">
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login/" component={LoginPage} />
                            <Route exact path="/register/" component={RegisterPage} />
                            <Route exact path="/explore/" component={ExploreItineraries} />
                            <Route exact path="/products/" component={ProductPage} />
                            <Route exact path="/orders/" component={Orders} />
                            <PrivateRoute path="/:userId/checkout/" component={CheckoutContainer} />
                            <PrivateRoute path="/create/" component={CreateItinerary} />
                            <Route path="/:userId/profile" component={ProfilePage} />
                            <Route exact path="/explore/:slug" component={ItineraryDetails} />
                            <Route exact path="/:slug" component={ItineraryDetails} />
                            <Route exact path="/:slug/update" component={UpdateItinerary} />
                            <Route component={Four0FourPage} />
                        </Switch>
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

App.propTypes = {
    isLoading: PropTypes.bool,
};

const mapStateToProps = ({ itineraries }) => ({
    isLoading: itineraries.isLoading,
});

export default connect(mapStateToProps)(App);