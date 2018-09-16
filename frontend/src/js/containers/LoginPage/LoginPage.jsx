import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { validateRequired } from '../../helpers';
import {
    loginAction,
    logoutAction,
} from '../../actions';

import LoginForm from '../../components/LoginForm/LoginForm';


class Login extends React.Component {
    state = {
        errors: {},
        username: '',
        password: '',
        submitted: false,
    };

    componentDidMount() {
        this.props.dispatch(logoutAction());
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

        const isUsernameValid = validateRequired(username);
        const isPasswordValid = validateRequired(password);

        let errors = {};

        if (!isPasswordValid) {
            errors.password = 'Please enter your password';
        }

        if (!isUsernameValid) {
            errors.username = 'Please enter your username';
        }

        this.setState({
            errors,
        });

        if (isPasswordValid && isUsernameValid) {
            dispatch(loginAction(username, password));
        }

    };

    render() {
        const {errors} = this.state;
        const {
            djangoErrors,
            isLoggingIn,
            loggedIn,
        } = this.props;

        let registration;
        if(location.search === '?registration') {
            registration = true;
        }

        if (loggedIn) {
            return <Redirect to="/" />;
        }

        return (
            <div className="login-page container-wrapper">
                <LoginForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    djangoErrors={djangoErrors}
                    errors={errors}
                    isLoggingIn={isLoggingIn}
                    fromRegistration={registration}
                />
            </div>
        );
    }
}

Login.propTypes = {
    djangoErrors: PropTypes.object,
    isLoggingIn: PropTypes.bool,
};

Login.defaultProps = {
    djangoErrors: {},
    isLoggingIn: false,
};

const mapStateToProps = ({ auth }) => {
    const {
        error,
        isLoggingIn,
        loggedIn,
    } = auth;
    return {
        djangoErrors: error,
        isLoggingIn,
        loggedIn,
    };
};

const LoginPage = connect(mapStateToProps)(Login);

export default LoginPage;
