import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Form, FormGroup, Input } from 'reactstrap';

import './HomeJumbotron.scss';

const HomeJumbotron = ({
    isAuthenticated,
    user,
}) => (
    <div className="container">
        <Jumbotron className="home-jumbotron">
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
);

HomeJumbotron.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    user: PropTypes.string.isRequired,
};

export default HomeJumbotron;
