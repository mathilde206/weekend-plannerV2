import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    Col,
    Jumbotron,
    Row,
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDollarSign,
    faMapMarkerAlt,
    faCalendarAlt,
    faStar,
    faEye,
} from '@fortawesome/free-solid-svg-icons';

import ItineraryDetailsActions from '../ItineraryDetailsActions/ItineraryDetailsActions';

import './ItineraryDetailsHeader.scss';

library.add(
    faDollarSign,
    faMapMarkerAlt,
    faCalendarAlt,
    faStar,
    faEye,
);

const ItineraryDetailsHeader = ({
    city,
    created_date,
    budget,
    isAuthenticated,
    isOwner,
    image,
    likes,
    number_of_days,
    onLike,
    pk,
    slug,
    title,
    user,
    views,
    onDelete,
}) => (
    <Fragment>
        {
            image &&
            <Row>
                <Col xs="12" md={{ size: 10, offset: 1 }}>
                    <div className="image-container">
                        <img className="itinerary-image img-fluid rounded mx-auto d-block" src={image} />
                    </div>
                </Col>
            </Row>
        }
        <Row>
            <Col xs="12" md={{ size: 10, offset: 1 }}>
                <Jumbotron>
                    <h1 className="display-3">{title}</h1>
                    <Row>
                        <Col sm="12" md="2">
                            <p className="lead">
                                <FontAwesomeIcon icon="map-marker-alt" />
                                &nbsp;{city.name}
                            </p>
                        </Col>
                        <Col sm="12" md="2">
                            <p className="lead">
                                <FontAwesomeIcon icon="calendar-alt" />
                                &nbsp;{number_of_days} days
                            </p>
                        </Col>
                        <Col sm="12" md="2">
                            <p className="lead">
                                <FontAwesomeIcon icon="dollar-sign" />
                                &nbsp;{budget}
                            </p>
                        </Col>
                    </Row>
                    <hr className="my-2" />
                    <p className="text-muted">
                        Created by <Link to={`/${user.pk}/profile`}>{user.username}</Link> on {created_date}
                        - <FontAwesomeIcon icon="star" /> {likes} likes
                        - <FontAwesomeIcon icon="eye" /> {views} views
                    </p>
                    <ItineraryDetailsActions
                        onLike={onLike}
                        pk={pk}
                        user={user}
                        slug={slug}
                        onDelete={onDelete}
                    />
                </Jumbotron>
            </Col>
        </Row>
    </Fragment>
);

ItineraryDetailsHeader.propTypes = {
    city: PropTypes.objectOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
    created_date: PropTypes.string.isRequired,
    budget: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    number_of_days: PropTypes.number.isRequired,
    pk: PropTypes.number.isRequired,
    user: PropTypes.objectOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])).isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ItineraryDetailsHeader;
