import React from 'react';
import PropTypes from 'prop-types';

import {
    Col,
    Row,
} from 'reactstrap';

import './DayDetails.scss';

const DayDetails = ({ morning, lunch, afternoon, diner }) => {
    return (
        <Row>
            <Col xs="12" md={{ size: 10, offset: 1 }} className="day-details-wrapper">
                <h3 className="text-center itinerary-header">In the morning...</h3>
                <p className="text-center">{morning}</p>
                <h3 className="text-center itinerary-header">For lunch</h3>
                <p className="text-center">{lunch}</p>
                <h3 className="text-center itinerary-header">In the afternoon...</h3>
                <p className="text-center">{afternoon}</p>
                <h3 className="text-center itinerary-header">...And for diner</h3>
                <p className="text-center">{diner}</p>
            </Col>
        </Row>
    );

};

DayDetails.defaultProps = {
    morning: '',
    lunch: '',
    afternoon: '',
    diner: ''
};

DayDetails.propTypes = {
    morning: PropTypes.string,
    lunch: PropTypes.string,
    afternoon: PropTypes.string,
    diner: PropTypes.string
};

export default DayDetails;
