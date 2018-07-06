import React, { Component } from 'react';
import { Alert, Button, Jumbotron, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import TextInputField from '../TextInputField/TextInputField';

const RegisterForm = ({errors, handleChange, handleSubmit, registering}) => (
    <Jumbotron className="container">
        <Form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {
                errors.non_field_errors ?
                    <Alert color="danger">
                        {errors.non_field_errors}
                    </Alert> : ''
            }
            <TextInputField
                name="username"
                label="Username"
                error={errors.username}
                onChange={handleChange}
            />
            <TextInputField
                name="email"
                label="Email"
                error={errors.email}
                type="email"
                onChange={handleChange}
            />
            <TextInputField
                name="email2"
                label="Confirm Email"
                error={errors.email2}
                type="email"
                onChange={handleChange}
            />
            <TextInputField
                name="password"
                label="Password"
                error={errors.password}
                type="password"
                onChange={handleChange}
            />
            <Button type="submit" color="primary" size="lg">
                Register
            </Button>
            {
                registering &&
                    <p>Loading...</p>
            }
        </Form>
        <Link to="/login" className="btn btn-link">Login</Link>
    </Jumbotron>);

export default RegisterForm;