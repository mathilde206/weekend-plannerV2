import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getItineraryDetails } from '../../api/itineraryApi';

class ItineraryDetails extends React.Component {
    componentWillMount() {
        getItineraryDetails(this.props.match.params.slug)
            .then(response => console.log(response));
    }

    render() {
        return (
            <div>
                Hello world
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state;

    return ({
        user
    });
};

export default connect(mapStateToProps)(ItineraryDetails);


// TODO: increase counter on each view