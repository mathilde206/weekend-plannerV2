import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    isAuthenticated,
} from '../../reducers';
import {
    getItineraryDetails,
    increaseViewsCounter,
} from '../../api';

import {
    DayTabs,
    ItineraryDetailsHeader,
} from '../../components';

import './ItineraryDetails.scss';

class ItineraryDetails extends React.Component {
    state = {
        isLoading: false,
        title: '',
        budget: '',
        city: {},
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
        likes: 0,
        number_of_days: 0,
        user: {},
        views: 0,
        pk: 0,
    };

    componentWillMount() {
        this.setState({
            isLoading: true,
        });

        getItineraryDetails(this.props.match.params.slug)
            .then(response => {
                this.setState({
                    isLoading: false,
                    ...response
                });
            });

        increaseViewsCounter(this.props.match.params.slug);
    }

    handleLike = () => {
        getItineraryDetails(this.props.match.params.slug)
            .then(response => {
                this.setState({
                    ...response
                });
            });
    };

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
            pk,
            day1_morning,
            day1_lunch,
            day1_afternoon,
            day1_diner,
            day2_morning,
            day2_lunch,
            day2_afternoon,
            day2_diner,
            day3_morning,
            day3_lunch,
            day3_afternoon,
            day3_diner,
        } = this.state;

        const {
            isAuthenticated,
        } = this.props;

        const slug = this.props.match.params.slug;

        return (
            <div className="details-wrapper">
                <ItineraryDetailsHeader
                    pk={pk}
                    city={city}
                    created_date={created_date}
                    budget={budget}
                    isAuthenticated={isAuthenticated}
                    image={image}
                    likes={likes}
                    number_of_days={number_of_days}
                    onLike={this.handleLike}
                    slug={slug}
                    title={title}
                    user={user}
                    views={views}
                />
                <DayTabs
                    day1_morning={day1_morning}
                    day1_lunch={day1_lunch}
                    day1_afternoon={day1_afternoon}
                    day1_diner={day1_diner}
                    day2_morning={day2_morning}
                    day2_lunch={day2_lunch}
                    day2_afternoon={day2_afternoon}
                    day2_diner={day2_diner}
                    day3_morning={day3_morning}
                    day3_lunch={day3_lunch}
                    day3_afternoon={day3_afternoon}
                    day3_diner={day3_diner}
                    number_of_days={number_of_days}
                />
            </div>
        );
    }
}

ItineraryDetails.defaultProps = {
    isAuthenticated: false,
    userLikes: []
};

ItineraryDetails.propTypes = {
    isAuthenticated: PropTypes.bool,
    userLikes: PropTypes.arrayOf(PropTypes.number),
};

const mapStateToProps = (state) => {
    const {
        userLikes,
    } = state;

    return ({
        isAuthenticated: isAuthenticated(state),
        userLikes: userLikes.itinerary_likes,
    });
};

export default connect(mapStateToProps)(ItineraryDetails);

// TODO: Add comments
