import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../../actions/userActions';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

class Register extends React.Component {
    state = {
        user: {
            username: '',
            email: '',
            email2: '',
            password: '',
        },
        submitted: false,
        errors: [],
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;

        this.setState({
            user:{
                ...user,
                [ name ]: value,
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ submitted:true});
        const { user } = this.state;
        const { dispatch } = this.props;

        if (
            user.username &&
            user.email &&
            user.email2 &&
            user.email === user.email2 &&
            user.password
        ) {
            dispatch(userActions.register(user));
        }
    };

    render() {
        return (
            <div className="login-page">
                <RegisterForm
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    errors={this.state.errors}
                    submitted={this.props.submitted}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const RegisterPage = connect(mapStateToProps)(Register);
export default RegisterPage;