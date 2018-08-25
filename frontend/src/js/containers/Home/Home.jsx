import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Jumbotron, Button, Form, FormGroup, Label, Input } from 'reactstrap';

import * as reducers from '../../reducers';

import {
    HomeJumbotron,
    ItinerariesList,
} from '../../components';

import './Home.scss';

const Home = ({ isAuthenticated, itineraries, user }) => (
    <div className="container-fluid home-wrapper">
        <div className="home-container">
            <HomeJumbotron
                isAuthenticated={isAuthenticated}
                user={user}
            />
        </div>
        <div className="list-container">
            <h2 className="border-title">Where will you go next weekend...</h2>
            {
                itineraries.isLoading ?
                    <h3 className="border-title">Loading...</h3> :
                    <div className="container">
                        <ItinerariesList
                            itineraries={itineraries.itinerariesList}
                        />
                    </div>
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
    itineraries: PropTypes.shape({
        isLoading: PropTypes.bool,
        itinerariesList: PropTypes.arrayOf(PropTypes.object)
    }),
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
