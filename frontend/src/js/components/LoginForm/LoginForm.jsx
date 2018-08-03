import React, { Component } from 'react';
import { Alert, Button, Jumbotron, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';

const LoginForm = ({errors, handleChange, handleSubmit, loggingIn}) => (
    <Jumbotron className="container jumbotron-white">
        <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {
                errors.non_field_errors ?
                    <Alert color="danger">
                        {errors.non_field_errors}
                    </Alert> : ''
            }
            <InputField
                name="username"
                label="Username"
                error={errors.username}
                onChange={handleChange}
            />
            <InputField
                name="password"
                label="Password"
                error={errors.password}
                type="password"
                onChange={handleChange}
            />
            <Button type="submit" color="primary" size="lg">
                Log In
            </Button>
            {
                loggingIn &&
                    <p>Loading...</p>
            }
        </Form>
        <Link to="/register" className="btn btn-link">Register</Link>
    </Jumbotron>);

export default LoginForm;