import React from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faMapMarkerAlt,
    faGlobe,
    faBook,
    faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';

import './ProfileInfoTile.scss';

library.add(
    faUser,
    faMapMarkerAlt,
    faGlobe,
    faBook,
    faBirthdayCake,
);

const ProfileInfoTile = ({
    bio,
    birth_date,
    location,
    username,
    website,
}) => {
    const noDataPlaceholder = <span className="no-data">No data was given yet</span>;

    return (
        <div className="details-container">
            <Row className="details-row">
                <Col xs="4" md="2">
                    <span className="details-label">
                        <FontAwesomeIcon icon="user" />
                    &nbsp;Name
                    </span>
                </Col>
                <Col xs="6" md="8">
                    <span className="details-info">
                        {username || noDataPlaceholder}
                    </span>
                </Col>
            </Row>
            <Row className="details-row">
                <Col xs="4" md="2">
                    <span className="details-label">
                        <FontAwesomeIcon icon="map-marker-alt" />
                    &nbsp;Location
                    </span>
                </Col>
                <Col xs="6" md="8">
                    <span className="profile-info">
                        {location || noDataPlaceholder}
                    </span>
                </Col>
            </Row>
            <Row className="details-row">
                <Col xs="4" md="2">
                    <span className="details-label">
                        <FontAwesomeIcon icon="birthday-cake" />
                    &nbsp;Birth Date
                    </span>
                </Col>
                <Col xs="6" md="8">
                    <span className="profile-info">
                        {birth_date || noDataPlaceholder}
                    </span>
                </Col>
            </Row>
            <Row className="details-row">
                <Col xs="4" md="2">
                    <span className="details-label">
                        <FontAwesomeIcon icon="globe" />
                    &nbsp;Website
                    </span>
                </Col>
                <Col xs="6" md="8">
                    <span className="profile-info">
                        {website || noDataPlaceholder}
                    </span>
                </Col>
            </Row>
            <Row className="details-row">
                <Col xs="4" md="2">
                    <span className="details-label">
                        <FontAwesomeIcon icon="book" />
                    &nbsp;Bio
                    </span>
                </Col>
                <Col xs="6" md="8">
                    <span className="details-label">
                        {bio || noDataPlaceholder}
                    </span>
                </Col>
            </Row>
        </div>
    );
};

ProfileInfoTile.propTypes = {
    bio: PropTypes.string,
    birth_date: PropTypes.string,
    location: PropTypes.string,
    username: PropTypes.string,
    website: PropTypes.string,
};

ProfileInfoTile.defaultProps = {
    bio: '',
    birth_date: '',
    location: '',
    username: '',
    website: '',
};

export default ProfileInfoTile;
