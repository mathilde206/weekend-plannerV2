import React from 'react';
import PropTypes from 'prop-types';
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

PrivateRoute.defaultProps = {
    isAuthenticated: false,
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    isAuthenticated: reducers.isAuthenticated(state)
});

export default connect(mapStateToProps, null)(PrivateRoute);
