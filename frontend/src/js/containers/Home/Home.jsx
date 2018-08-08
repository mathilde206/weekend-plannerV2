import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import * as reducers from '../../reducers';

import './Home.scss';

const HomeComponent = ({isAuthenticated, user }) => (
    <div className="home-container container-wrapper">
        <div className="container">
            <Jumbotron className="jumbotron">
                <h2 className="capitalize">Welcome {user ? user : ''}</h2>
                <p className="lead">Start planning your next weekend in Europe with 1-3 days trips recommendations. You can also join the community and propose your own itineraries. </p>
                <hr className="my-2" />
                <div className="buttons-inline">
                    {
                        isAuthenticated &&
                        <Link to="/create/">
                            <Button color="primary" className="btn-mg-right">
                                Create an Itinerary
                            </Button>
                        </Link>
                    }

                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input type="text" name="search" id="search" placeholder="Start Exploring" />
                        </FormGroup>
                        <Button>Go!</Button>
                    </Form>
                </div>
            </Jumbotron>
        </div>
    </div>
);

HomeComponent.defaultProps = {
    isAuthenticated: false,
    user: '',
};

HomeComponent.propTypes = {
    isAuthenticated: PropTypes.bool,
    user: PropTypes.string,
};

const mapStateToProps = (state) => {
    const { user } = state.user;
    return {
        user,
        isAuthenticated: reducers.isAuthenticated(state)
    };
};

export default connect(mapStateToProps)(HomeComponent);