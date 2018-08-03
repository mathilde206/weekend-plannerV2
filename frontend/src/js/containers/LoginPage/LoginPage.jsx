import React from 'react';
import Link from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm/LoginForm';

import { userActions } from '../../actions/userActions';

// import { authErrors, isAuthenticated } from '../../reducers/index';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        errors:[],
        submitted: false,
    };

    componentWillMount() {
        this.props.dispatch(userActions.logout());
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [ name ]: value,
        });
    };

    handleSubmit = (event) => {
        const { username, password } = this.state;
        const { dispatch } = this.props;

        event.preventDefault();

        this.setState({
            submitted: true,
        });

        if (username && password) {
            dispatch(userActions.login(username, password));
        }

    };

    render() {
        return (
            <div className="login-page container-wrapper">
                <LoginForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    errors={this.state.errors}
                    loggingIn={this.props.loggingIn}
                />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const { loggingIn } = state.user;
    return {
        loggingIn
    };
};

const LoginPage = connect(mapStateToProps)(Login);
export default LoginPage;