import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as reducers from '../../reducers';

import {
    requestItinerariesList,
    receiveItinerariesList,
} from '../../actions';

import {
    HomeJumbotron,
    ItinerariesList,
} from '../../components';

import './Home.scss';

const Home = ({
    isAuthenticated,
    itineraries,
    requestItinerariesList,
    receiveItinerariesList,
    user
}) => (
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
                    <h3>Loading...</h3> :
                    <div className="container">
                        <ItinerariesList
                            count={itineraries.count}
                            itineraries={itineraries.itinerariesList}
                            navigation={itineraries.navigation}
                            requestItinerariesList={requestItinerariesList}
                            receiveItinerariesList={receiveItinerariesList}
                            total_pages={itineraries.total_pages}
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
        count: PropTypes.number,
        isLoading: PropTypes.bool,
        itinerariesList: PropTypes.arrayOf(PropTypes.object),
        navigation: PropTypes.shape({
            next: PropTypes.number,
            previous: PropTypes.number,
        }),
        total_pages: PropTypes.number,
    }),
    user: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
    requestItinerariesList: () => {
        dispatch(requestItinerariesList());
    },
    receiveItinerariesList: (itinerariesData) => {
        console.log('hello');
        dispatch(receiveItinerariesList(itinerariesData));
    },
});

const mapStateToProps = (state) => {
    const { user } = state.user;
    return {
        user,
        isAuthenticated: reducers.isAuthenticated(state),
        itineraries: state.itineraries,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
