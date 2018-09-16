import React from 'react';
import PropTypes from 'prop-types';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerAction } from '../../actions';
import { RegisterForm } from '../../components';
import { validateEmail, validateEmailsMatch, validateRequired, validatePassword, validatePasswordsMatch } from '../../helpers';

class Register extends React.Component {
    state = {
        user: {
            username: '',
            email: '',
            email2: '',
            password: '',
            password2: '',
        },
        submitted: false,
        errors: [],
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                [ name ]: value,
            }
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;
        let errors = {};

        const isUserNameValid = validateRequired(user.username);
        const isEmailValid = validateEmail(user.email);
        const areEmailsMatching = validateEmailsMatch(user.email, user.email2);
        const isPasswordValid = validatePassword(user.password);
        const arePasswordsMatching = validatePasswordsMatch(user.password, user.password2);

        if (!isUserNameValid) {
            errors.username = 'This field is required';
        }

        if (!isEmailValid) {
            errors.email = 'Please Enter a valid email addresses';
        }

        if (!areEmailsMatching) {
            errors.email2 = 'The emails must match';
        }

        if (!isPasswordValid) {
            errors.password = 'You password must be at least 9 characters long.';
        }

        if (!arePasswordsMatching) {
            errors.password2 = 'The passwords must match';
        }

        this.setState({
            errors,
        });

        if (
            isUserNameValid &&
            isEmailValid &&
            areEmailsMatching &&
            isPasswordValid &&
            arePasswordsMatching
        ) {
            dispatch(registerAction(user));
        }
    };

    render() {
        const { djangoErrors, submitted } = this.props;
        const { errors } = this.state;

        return (
            <div className="login-page container-wrapper">
                <RegisterForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    errors={errors}
                    djangoErrors={djangoErrors}
                    submitted={submitted}
                />
            </div>
        );
    }
}

Register.propTypes = {
    djangoErrors: PropTypes.objectOf(PropTypes.array),
    registered: PropTypes.bool,
    registering: PropTypes.bool,
};

Register.defaultProps = {
    djangoErrors: {},
    registered: false,
    registering: false,
};

function mapStateToProps(state) {
    const {
        error,
        registered,
        registering,
    } = state.registration;
    return {
        djangoErrors: error,
        registered,
        registering,
    };
}

const RegisterPage = connect(mapStateToProps)(Register);
export default RegisterPage;