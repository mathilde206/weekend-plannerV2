import React from 'react';
import PropTypes from 'prop-types';

import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerAction } from '../../actions';
import { RegisterForm } from '../../components';

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

        if (
            user.username &&
            user.email &&
            user.email2 &&
            user.email === user.email2 &&
            user.password
        ) {
            dispatch(registerAction(user));
        }
    };

    render() {
        const {
            registered
        } = this.props;

        if ( registered ) {
            return <Redirect to="/login" />;
        }
        return (
            <div className="login-page container-wrapper">
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

Register.propTypes = {
    registered: PropTypes.bool,
    registering: PropTypes.bool,
};

Register.defaultProps = {
    registered: false,
    registering: false,
};

function mapStateToProps(state) {
    const {
        registered,
        registering
    } = state.registration;
    return {
        registered,
        registering,
    };
}

const RegisterPage = connect(mapStateToProps)(Register);
export default RegisterPage;