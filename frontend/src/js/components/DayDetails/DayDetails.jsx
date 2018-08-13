import React from 'react';
import PropTypes from 'prop-types';

import {
    Col,
    Row,
} from 'reactstrap';

const DayDetails = ({ morning, lunch, afternoon, diner }) => {
    return (
        <Row>
            <Col xs="12" md={{ size: 10, offset: 1 }} className="day-details-wrapper">
                <h2 className="text-center">In the morning...</h2>
                <p className="text-center">{morning}</p>
                <h2 className="text-center">For lunch</h2>
                <p className="text-center">{lunch}</p>
                <h2 className="text-center">In the afternoon...</h2>
                <p className="text-center">{afternoon}</p>
                <h2 className="text-center">...And for diner</h2>
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
