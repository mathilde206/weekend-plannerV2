import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';

import { history } from '../../helpers/';
import {
    alertClearAction,
    setAuthedUserAction,
} from '../../actions';

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

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertClearAction());
        });
    }

    componentWillMount() {
        const {
            dispatch,
        } = this.props;

        if (localStorage.getItem('persist:auth')
            && JSON.parse(JSON.parse(localStorage.getItem('persist:auth')).auth).access
        ) {
            const auth = JSON.parse(localStorage.getItem('persist:auth'));
            const id = JSON.parse(auth.auth).access.user_id;
            dispatch(setAuthedUserAction(id));
        }
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

const mapStateToProps = ({ alert }) => (
    {
        alert
    }
);

export default connect(mapStateToProps)(App);
