import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import * as reducers from '../../reducers';

import ItinerariesList from '../../components/ItinerariesList/ItinerariesList';

import './Home.scss';

const Home = ({ isAuthenticated, itineraries, user }) => (console.log(itineraries) ||
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
            {
                itineraries.itinerariesList &&
                <ItinerariesList
                    itineraries={itineraries.itinerariesList}
                />
            }
        </div>
    </div>
);

Home.defaultProps = {
    isAuthenticated: false,
    itineraries: {},
    user: '',
};

Home.propTypes = {
    isAuthenticated: PropTypes.bool,
    itineraries: PropTypes.objectOf(PropTypes.object),
    user: PropTypes.string,
};

const mapStateToProps = (state) => {
    const { user } = state.user;
    return {
        user,
        isAuthenticated: reducers.isAuthenticated(state),
        itineraries: state.itineraries,
    };
};

export default connect(mapStateToProps)(Home);
