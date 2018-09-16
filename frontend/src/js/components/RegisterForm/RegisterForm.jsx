import React, { Component } from 'react';
import { Alert, Button, Jumbotron, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactLoading from 'react-loading';

import InputField from '../InputField/InputField';

const RegisterForm = ({
    errors,
    handleChange,
    handleSubmit,
    djangoErrors,
    registering
}) => (
    <Jumbotron className="container jumbotron-white">
        <Form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {
                (djangoErrors.username ||
                    djangoErrors.email ||
                    djangoErrors.email2 ||
                    djangoErrors.password
                ) ?
                    <Alert color="danger">
                        <ul>
                            {
                                djangoErrors.username &&
                                <li className='errorli'>{djangoErrors.username[ 0 ]}</li>
                            }
                            {
                                djangoErrors.email &&
                                <li className='errorli'>{djangoErrors.email[ 0 ]}</li>
                            }
                            {
                                djangoErrors.email2 &&
                                <li className='errorli'>{djangoErrors.email2[ 0 ]}</li>
                            }
                            {
                                djangoErrors.password &&
                                <li className='errorli'>{djangoErrors.password[ 0 ]}</li>
                            }
                        </ul>
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
            <InputField
                name="password2"
                label="Confirm password"
                error={errors.password2}
                type="password"
                onChange={handleChange}
            />
            <Button type="submit" color="primary" size="lg">
                Register
            </Button>
            {
                registering &&
                (
                    <div className="container">
                        <ReactLoading type="balls" color="#000c4f" />
                    </div>
                )
            }
        </Form>
        <Link to="/login" className="btn btn-link">Login</Link>
    </Jumbotron>);

export default RegisterForm;