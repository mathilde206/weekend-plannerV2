import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    receiveItinerariesList,
    requestItinerariesList
} from '../../actions';
import { getFilteredItineraryList } from '../../api';

import {
    ItinerariesList,
    ItinerariesSearchForm
} from '../../components';

import './ExploreItineraries.scss';

class ExploreItineraries extends React.Component {
    state = {
        searchCity: '',
        budget: '',
        numberOfDays: '',
    };

    handleFieldChange = (field, event) => {
        this.setState({
            [ field ]: event.target.value,
        });
    };

    handleReset = (event) => {
        event.preventDefault();

        this.setState({
            searchCity: '',
            budget: '',
            numberOfDays: '',
        });
    };

    handleSubmit = (event) => {
        const {
            searchCity,
            budget,
            numberOfDays,
        } = this.state;

        const {
            requestItinerariesList,
            receiveItinerariesList
        } = this.props;

        let query = '';

        event.preventDefault();
        if (searchCity !== '') {
            query = query.concat(`city=${searchCity}`);
        }
        if (budget !== '') {
            query = !query ? '&' : '';
            query = query.concat(`budget=${budget}`);
        }
        if (numberOfDays !== '') {
            query = !query ? '&' : '';
            query = query.concat(`numberOfDays=${numberOfDays}`);
        }

        if (searchCity || budget || numberOfDays) {
            requestItinerariesList();
            getFilteredItineraryList(1, query)
                .then((response) => {
                    receiveItinerariesList(response);
                });
        }

    };

    render() {
        const {
            budget,
            searchCity,
            numberOfDays,
        } = this.state;

        const {
            itineraries,
            requestItinerariesList,
            receiveItinerariesList,
        } = this.props;

        const {
            isLoading,
            count,
            itinerariesList,
            navigation,
            total_pages
        } = itineraries;

        if (isLoading || !count) {
            return (<h1>Loading...</h1>);
        }

        return (
            <div className="container explore-wrapper">
                <h1 className="margin-top">Explore Itineraries</h1>
                <ItinerariesSearchForm
                    budget={budget}
                    onFieldChange={this.handleFieldChange}
                    onReset={this.handleReset}
                    onSubmit={this.handleSubmit}
                    searchCity={searchCity}
                    numberOfDays={numberOfDays}
                />
                <ItinerariesList
                    count={count}
                    itineraries={itinerariesList}
                    requestItinerariesList={requestItinerariesList}
                    receiveItinerariesList={receiveItinerariesList}
                    navigation={navigation}
                    total_pages={total_pages}
                />
            </div>
        );
    }
}

ExploreItineraries.propTypes = {
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
    requestItinerariesList: PropTypes.func,
    receiveItinerariesList: PropTypes.func,
};

ExploreItineraries.defaultProps = {
    itineraries: {},
    requestItinerariesList: () => null,
    receiveItinerariesList: () => null,
};

const mapDispatchToProps = (dispatch) => ({
    requestItinerariesList: () => {
        dispatch(requestItinerariesList());
    },
    receiveItinerariesList: (itinerariesData) => {
        dispatch(receiveItinerariesList(itinerariesData));
    },
});

const mapStateToProps = (state) => {
    return {
        itineraries: state.itineraries,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExploreItineraries);
