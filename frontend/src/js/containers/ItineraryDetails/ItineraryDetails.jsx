import { library } from '@fortawesome/fontawesome-svg-core/index';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDollarSign,
    faMapMarkerAlt,
    faCalendarAlt,
    faStar,
    faEye,
    faThumbsUp,
    faPencilAlt,
    faTrash
} from '@fortawesome/free-solid-svg-icons';

import { isAuthenticated } from '../../reducers';
import { getItineraryDetails } from '../../api/itineraryApi';

import {
    Button,
    Col,
    Jumbotron,
    Row,
} from 'reactstrap';

import { DayDetails } from '../../components';

import './ItineraryDetails.scss';

library.add(
    faDollarSign,
    faMapMarkerAlt,
    faCalendarAlt,
    faStar,
    faEye,
    faThumbsUp,
    faPencilAlt,
    faTrash,
);

class ItineraryDetails extends React.Component {
    state = {
        isLoading: false,
        title: '',
        budget: '',
        city: '',
        created_date: '',
        day1_afternoon: '',
        day1_diner: '',
        day1_lunch: '',
        day1_morning: '',
        day2_afternoon: '',
        day2_diner: '',
        day2_lunch: '',
        day2_morning: '',
        day3_afternoon: '',
        day3_diner: '',
        day3_lunch: '',
        day3_morning: '',
        image: '',
        likes: '',
        number_of_days: '',
        user: '',
        views: '',
    };

    componentWillMount() {
        this.setState({
            isLoading: true,
        });
        getItineraryDetails(this.props.match.params.slug)
            .then(response => {
                console.log(response);

                this.setState({
                    isLoading: false,
                    ...response
                });
            });
    }

    render() {
        const {
            budget,
            city,
            created_date,
            image,
            likes,
            number_of_days,
            title,
            user,
            views,
            day1_morning,
            day1_lunch,
            day1_afternoon,
            day1_diner,
        } = this.state;

        const {
            isAuthenticated,
            loggedInUser
        } = this.props;

        const isOwner = isAuthenticated && loggedInUser === user.username;

        return (
            <div className="details-wrapper">
                {
                    image &&
                    <Row>
                        <Col xs="12" md={{ size: 10, offset: 1 }}>
                            <img className="itinerary-image img-fluid rounded mx-auto d-block" src={image} />
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
                                Created by {user.username} on {created_date}
                                - <FontAwesomeIcon icon="star" /> {likes} likes
                                - <FontAwesomeIcon icon="eye" /> {views} views
                            </p>
                            <p className="lead">
                                <Button color="primary">
                                    <FontAwesomeIcon icon="thumbs-up" />
                                    &nbsp;Like
                                </Button>

                                {
                                    isOwner &&
                                    <Button color="primary">
                                        <FontAwesomeIcon icon="pencil-alt" />
                                        &nbsp;Edit
                                    </Button>
                                }
                                {
                                    isOwner &&
                                    <Button color="danger">
                                        <FontAwesomeIcon icon="trash" />
                                        &nbsp;Delete
                                    </Button>
                                }
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
                <DayDetails
                    morning={day1_diner}
                    lunch={day1_lunch}
                    afternoon={day1_afternoon}
                    diner={day1_diner}
                />
            </div>
        );
    }
}

ItineraryDetails.defaultProps = {
    isAuthenticated: false,
    loggedInUser: '',
};

ItineraryDetails.propTypes = {
    isAuthenticated: PropTypes.bool,
    loggedInUser: PropTypes.string,
};

const mapStateToProps = (state) => {
    const {
        user
    } = state;

    return ({
        loggedInUser: user.user,
        isAuthenticated: isAuthenticated(state)
    });
};

export default connect(mapStateToProps)(ItineraryDetails);

// TODO: increase counter on each view
// TODO: Add comments