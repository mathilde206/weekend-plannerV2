import React from 'react';
import PropTypes from 'prop-types';
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
        errors: [],
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
        const {error} = this.props;

        return (
            <div className="login-page container-wrapper">
                <LoginForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    serverError={error}
                    errors={this.state.errors}
                    loggingIn={this.props.loggingIn}
                />
            </div>
        );
    }
}

Login.propTypes = {
    error: PropTypes.string,
    loggingIn: PropTypes.bool,
};

Login.defaultProps = {
    error: '',
    loggingIn: false,
};

const mapStateToProps = ({ auth, user }) => {
    const { loggingIn } = user;
    const { error } = auth;
    return {
        error,
        loggingIn
    };
};

const LoginPage = connect(mapStateToProps)(Login);

export default LoginPage;
