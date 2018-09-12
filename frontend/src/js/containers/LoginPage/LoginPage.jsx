import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from '../../components/LoginForm/LoginForm';
import {
    loginAction,
    logoutAction,
} from '../../actions';

class Login extends React.Component {
    state = {
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

        this.setState({
            submitted: true,
        });

        if (username && password) {
            dispatch(loginAction(username, password));
        }

    };

    render() {
        const {
            submitted
        } = this.state;
        const {
            error,
            isLoggingIn
        } = this.props;

        if (submitted) {
            return <Redirect to="/" />;
        }
        return (
            <div className="login-page container-wrapper">
                <LoginForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    serverError={error}
                    isLoggingIn={isLoggingIn}
                />
            </div>
        );
    }
}

Login.propTypes = {
    error: PropTypes.string,
    isLoggingIn: PropTypes.bool,
};

Login.defaultProps = {
    error: '',
    isLoggingIn: false,
};

const mapStateToProps = ({ auth }) => {
    const { isLoggingIn, error } = auth;
    return {
        error,
        isLoggingIn
    };
};

const LoginPage = connect(mapStateToProps)(Login);

export default LoginPage;
