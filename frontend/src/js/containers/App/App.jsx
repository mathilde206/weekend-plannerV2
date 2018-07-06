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
import NavigationBar from '../../components/NavigationBar/NavigationBar';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        // history.listen((location, action) => {
        //     // clear alert on location change
        //     // dispatch(alertActions.clear());
        // });
    }

    render() {
        // const { alert } = this.props;

        return (
            <Router history={history}>
                <div className="container-fluid">
                    <NavigationBar user={this.props.user || ''}/>
                    <div className="col-sm-8 col-sm-offset-2">
                        {/*{*/}
                        {/*alert.message &&*/}
                        {/*<div className={`alert ${alert.type}`}>{alert.message}</div>*/}
                        {/*}*/}
                    </div>
                    <Switch>
                        <Route exact path="/login/" component={LoginPage} />
                        <Route exact path="/register/" component={RegisterPage} />
                        <PrivateRoute path="/" component={Home} />
                    </Switch>

                </div>
            </Router>
        );
    }
};

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };

export default App;
