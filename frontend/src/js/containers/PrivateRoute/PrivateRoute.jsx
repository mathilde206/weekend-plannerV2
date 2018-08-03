import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import * as reducers from '../../reducers';

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Component {...props} />
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
            }} />
        )
    )} />
);

const mapStateToProps = (state) => (    console.log('state', state) || {
    isAuthenticated: reducers.isAuthenticated(state)
});

export default connect(mapStateToProps, null)(PrivateRoute);
