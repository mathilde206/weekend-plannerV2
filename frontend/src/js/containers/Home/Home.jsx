import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';

import * as reducers from '../../reducers';

import {
    fetchItineraries
} from '../../actions';

import {
    HomeJumbotron,
    ItinerariesList,
} from '../../components';

import './Home.scss';

const Home = ({
    isAuthenticated,
    itineraries,
    onFetchItineraries,
    user,
}) => (
    <div className="container-fluid home-wrapper">
        <div className="home-container">
            <HomeJumbotron
                isAuthenticated={isAuthenticated}
                user={user}
                onFetchItineraries={onFetchItineraries}
                withQuery={itineraries.withQuery}
            />
        </div>
        <div className="list-container">
            <h2 className="border-title">Where will you go next weekend...</h2>
            {
                itineraries.itinerariesList ?
                    (
                        <div className="container">
                            <ItinerariesList
                                count={itineraries.count}
                                itineraries={itineraries.itinerariesList}
                                navigation={itineraries.navigation}
                                onFetchItineraries={onFetchItineraries}
                                total_pages={itineraries.total_pages}
                            />
                        </div>
                    ) :
                    (
                        <div className="container">
                            <ReactLoading type="bubbles" color="#000c4f" />
                        </div>
                    )
            }
        </div>
    </div>
);

Home.defaultProps = {
    isAuthenticated: false,
    itineraries: {},
    onFetchItineraries: () => null,
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
    onFetchItineraries: PropTypes.func,
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

const mapDispatchToProps = (dispatch) => ({
    onFetchItineraries: (page, query) => dispatch(fetchItineraries(page, query))
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
