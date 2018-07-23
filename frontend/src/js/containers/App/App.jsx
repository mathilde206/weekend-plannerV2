import React from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import { connect } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';

import { history } from '../../helpers';
// import { alertActions } from '../../actions';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Home from '../Home/Home';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import NavigationBar from '../NavigationBar/NavigationBar';
import CreateItinerary from '../CreateItinerary/CreateItinerary';

import './App.scss';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        // history.listen((location, action) => {
        //     // clear alert on location change
        //     // dispatch(alertActions.clear());
        // });
    }

    //
    // componentWillMount() {
    //     if ( localStorage.getItem('auth')) {
    //         this.props.dispatch(userActions.getAll());
    //     }
    // }

    componentWillUnmount() {
        localStorage.removeItem('auth');
    }

    render() {
        const { alert } = this.props;

        return (
            <Router history={history}>
                <div className="container-fluid">
                    <NavigationBar user={this.props.user || ''} />
                    <div className="col-sm-8 col-sm-offset-2">
                        {
                            alert && alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                    </div>
                    <Switch>
                        <Home exact path="/" component={Home} />
                        <Route exact path="/login/" component={LoginPage} />
                        <Route exact path="/register/" component={RegisterPage} />
                        <PrivateRoute path="/create/" component={CreateItinerary} />
                    </Switch>

                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

export default connect(mapStateToProps)(App);
