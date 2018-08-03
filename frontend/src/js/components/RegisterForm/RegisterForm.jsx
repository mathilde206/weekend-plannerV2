import React, { Component } from 'react';
import { Alert, Button, Jumbotron, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import InputField from '../InputField/InputField';

const RegisterForm = ({errors, handleChange, handleSubmit, registering}) => (
    <Jumbotron className="container jumbotron-white">
        <Form onSubmit={handleSubmit}>
            <h1>Register</h1>
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
                name="email"
                label="Email"
                error={errors.email}
                type="email"
                onChange={handleChange}
            />
            <InputField
                name="email2"
                label="Confirm Email"
                error={errors.email2}
                type="email"
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