import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';

import { history } from '../../helpers/';
import {
    alertClearAction,
    setAuthedUserAction,
    requestItinerariesList,
    receiveItinerariesList,
} from '../../actions';
import { getItineraryList } from '../../api';

import Home from '../Home/Home';
import ItineraryDetails from '../ItineraryDetails/ItineraryDetails';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import NavigationBarTop from '../NavigationBarTop/NavigationBarTop';
import CreateItinerary from '../CreateItinerary/CreateItinerary';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

import './App.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.alertClearAction();
        });
    }

    componentWillMount() {
        if (localStorage.getItem('persist:auth')
            && JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).auth).access
        ) {
            const auth = JSON.parse(localStorage.getItem('persist:auth'));
            const id = JSON.parse(auth.auth).access.user_id;
            this.props.setAuthedUserAction(id);
        }

        this.props.requestItinerariesList();
        getItineraryList()
            .then((data) => {
                this.props.receiveItinerariesList(data.results);
            });

    }

    render() {
        const { alert } = this.props;

        return (
            <Router history={history}>
                <div className="container-fluid">
                    <NavigationBarTop user={this.props.user || ''} />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/login/" component={LoginPage} />
                        <Route exact path="/register/" component={RegisterPage} />
                        <PrivateRoute path="/create/" component={CreateItinerary} />
                        <Route path="/:slug" component={ItineraryDetails} />
                    </Switch>

                </div>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    alertClearAction: () => dispatch(alertClearAction),
    requestItinerariesList: () => dispatch(requestItinerariesList()),
    receiveItinerariesList: (itinerariesList) => dispatch(receiveItinerariesList(itinerariesList)),
    setAuthedUserAction: (id) => dispatch(setAuthedUserAction(id)),
});

const mapStateToProps = ({ alert }) => (
    {
        alert
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(App);
