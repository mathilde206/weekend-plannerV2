import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';

import { history } from '../../helpers/';
import {
    setAlreadyLoggedInUser,
    requestItinerariesList,
    receiveItinerariesList,
    fetchUserData,
    successLogin,
} from '../../actions';
import { getItineraryList } from '../../api';

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

import './App.scss';

class App extends React.Component {
    componentWillMount() {
        const {
            dispatch
        } = this.props;

        if (localStorage.getItem('persist:store')
            && JSON.parse(localStorage.getItem('persist:store')).auth
        ) {
            const auth = JSON.parse(JSON.parse(localStorage.getItem('persist:store')).auth);
            const id = auth.access.user_id;
            dispatch(fetchUserData(id));
            dispatch(successLogin(auth));
        }

        this.props.requestItinerariesList();
        getItineraryList()
            .then((data) => {
                this.props.receiveItinerariesList(data);
            });

    }

    render() {
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
                            <PrivateRoute path="/:userId/checkout/" component={CheckoutContainer} />
                            <PrivateRoute path="/create/" component={CreateItinerary} />
                            <Route exact path="/:userId/profile" component={ProfilePage} />
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

const mapDispatchToProps = (dispatch) => ({
    requestItinerariesList: () => dispatch(requestItinerariesList()),
    receiveItinerariesList: (itinerariesList) => dispatch(receiveItinerariesList(itinerariesList)),
    dispatch,
});

export default connect(null, mapDispatchToProps)(App);