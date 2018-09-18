import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Jumbotron, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';
import ReactLoading from 'react-loading';

const LoginForm = ({
    djangoErrors,
    errors,
    handleChange,
    handleSubmit,
    isLoggingIn,
    fromRegistration,
}) => (
    <Jumbotron className="container jumbotron-white">
        <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {
                fromRegistration &&
                <Alert color="success">
                    You were successfully registered ! You can now login.
                </Alert>
            }

            {
                djangoErrors &&
                <Alert color="danger">
                    We couldn't log you in. Are you sure you are a registered user ?
                    <Link to="/resetPassword" className="btn btn-link">Password Forgotten</Link>
                </Alert>
            }

            <InputField
                name="username"
                label="Username"
                onChange={handleChange}
                error={errors.username}
            />
            <InputField
                name="password"
                label="Password"
                type="password"
                error={errors.password}
                onChange={handleChange}
            />
            <Button type="submit" color="primary" size="lg">
                Log In
            </Button>
            {
                isLoggingIn &&
                (
                    <div className="container">
                        <ReactLoading type="balls" color="#000c4f" />
                    </div>
                )
            }
        </Form>
        <Link to="/register" className="btn btn-link">Register</Link>
        <Link to="/resetPassword" className="btn btn-link">Password Forgotten</Link>
    </Jumbotron>);

LoginForm.propTypes = {
    djangoErrors: PropTypes.string,
    errors: PropTypes.objectOf(PropTypes.string),
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
    fromRegistration: PropTypes.bool.isRequired,
};

LoginForm.defaultProps = {
    djangoErrors: '',
    errors: '',
    fromRegistration: false,
};

export default LoginForm;
