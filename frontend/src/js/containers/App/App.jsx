import React from 'react';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';

import Navbar from '../../components/Navbar/Navbar';
import Login from '../Login/Login';
import Home from '../Home/Home';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App = ({history}) => {
    return (
        <div className="container-fluid">
            <Navbar />
            <ConnectedRouter history={history}>
                <Switch>
                    <Route exact path="/login/" component={Login} />
                    <PrivateRoute path="/" component={Home} />
                </Switch>
            </ConnectedRouter>
        </div>
    );
};

export default App;
