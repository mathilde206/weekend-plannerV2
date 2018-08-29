import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    receiveItinerariesList,
    requestItinerariesList
} from '../../actions';



import { ItinerariesList } from '../../components';

class ExploreItineraries extends React.Component {
    render() {
        const {
            itineraries,
            requestItinerariesList,
            receiveItinerariesList,
        } = this.props;

        const {
            count,
            itinerariesList,
            navigation,
            total_pages
        } = itineraries;

        return (
            <div className="container">
                <h2>Explore Itineraries</h2>
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
