import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert, Button, Jumbotron, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';

const LoginForm = ({
    error,
    handleChange,
    handleSubmit,
    isLoggingIn,
}) => (
    <Jumbotron className="container jumbotron-white">
        <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {
                error &&
                <Alert color="danger">
                    We couldn't log you in. Are you sure you are a registered user ?
                    <Link to="/resetPassword" className="btn btn-link">Password Forgotten ?</Link>
                </Alert>
            }

            <InputField
                name="username"
                label="Username"
                onChange={handleChange}
            />
            <InputField
                name="password"
                label="Password"
                type="password"
                onChange={handleChange}
            />
            <Button type="submit" color="primary" size="lg">
                Log In
            </Button>
            {
                isLoggingIn &&
                <p>Loading...</p>
            }
        </Form>
        <Link to="/register" className="btn btn-link">Register</Link>
        <Link to="/resetPassword" className="btn btn-link">Password Forgotten</Link>
    </Jumbotron>);

LoginForm.propTypes = {
    error: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isLoggingIn: PropTypes.bool.isRequired,
};

LoginForm.defaultProps = {
    error: '',
};

export default LoginForm;
