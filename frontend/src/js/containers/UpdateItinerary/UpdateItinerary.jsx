import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
    initializeCreateAction,
    updateItineraryAction,
    updateCityAction,
    resetForm,
} from '../../actions';

import {
    getItineraryDetails,
} from '../../api/';

import {
    CreateUpdateItineraryForm,
} from '../../components';

import {
    createFormObj,
    validateStep0Input,
    validateStep1Input,
    validateStep2Input,
    validateDayInput,
} from '../../helpers';

class UpdateItinerary extends React.Component {
    state = {
        step: 0,
        number_of_days: '1',
        city: '',
        cityPk: null,
        country: '',
        language: '',
        currency: '',
        title: '',
        budget: 'Cheap',
        day1_morning: '',
        day1_lunch: '',
        day1_afternoon: '',
        day1_diner: '',
        day2_morning: '',
        day2_lunch: '',
        day2_afternoon: '',
        day2_diner: '',
        day3_morning: '',
        day3_lunch: '',
        day3_afternoon: '',
        day3_diner: '',
        errors: {},
        slug: '',
        submitted: false,
    };

    handleInputChange = (event) => {
        if (event.target.files) {
            this.setState({
                [ event.target.name ]: event.target.files[ 0 ],
            });
        } else {
            this.setState({
                [ event.target.name ]: event.target.value,
            });
        }
    };

    handleSelectExistingCity = (event, pk) => {
        const {
            previouslyCreatedCities,
            steps,
        } = this.props;

        event.preventDefault();
        const { name, currency, country, language } = previouslyCreatedCities.filter(city => city.pk === pk)[ 0 ];
        this.setState({
            city: name,
            currency,
            country,
            language,
            cityPk: pk,
            step: steps[ this.state.step ],
        });
    };

    handleReset = (event) => {
        const {
            match,
            dispatch,
        } = this.props;

        event.preventDefault();

        dispatch(resetForm());
        getItineraryDetails(this.props.match.params.slug)
            .then(response => {
                this.setState({
                    isLoading: false,
                    number_of_days: response.number_of_days,
                    city: response.city.name,
                    title: response.title,
                    budget: response.budget,
                    day1_morning: response.day1_morning,
                    day1_lunch: response.day1_lunch,
                    day1_afternoon: response.day1_afternoon,
                    day1_diner: response.day1_diner,
                    day2_morning: response.day2_morning,
                    day2_lunch: response.day2_lunch,
                    day2_afternoon: response.day2_afternoon,
                    day2_diner: response.day2_diner,
                    day3_morning: response.day3_morning,
                    day3_lunch: response.day3_lunch,
                    day3_afternoon: response.day3_afternoon,
                    day3_diner: response.day3_diner,
                });
            });
    };

    handleClickBack = () => {
        const {
            steps
        } = this.props;
        const {
            step
        } = this.state;

        const currentIndex = steps.indexOf(step);

        this.setState({
            step: steps[ currentIndex - 1 ],
        });
    };

    handleSubmit = (event) => {
        const {
            step,
            city,
            cityPk,
            country,
            language,
            currency,
            number_of_days,
            title,
            budget,
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
            image,
            errors,
        } = this.state;

        const {
            dispatch,
            accessToken,
            formData,
            isAccessTokenExpired,
            match,
            onInitializeForm,
            refreshToken,
            setCity,
            steps,
        } = this.props;

        const slug = match.params.slug;

        event.preventDefault();

        switch (this.state.step) {
        case 1:
            let errorsStep1 = validateStep1Input(city, country, language, currency);

            if (errorsStep1.city || errorsStep1.country || errorsStep1.language || errorsStep1.currency) {
                this.setState({
                    errors: errorsStep1,
                });
            } else {
                let cityObj = new FormData();
                cityObj.append('name', city);
                cityObj.append('country', country);
                cityObj.append('language', language);
                cityObj.append('currency', currency);

                dispatch(updateCityAction(cityObj, cityPk));

                this.setState({
                    errors: {},
                    step: steps[ step ],
                });
            }
            break;
        case 2:
            let errorsStep2 = validateStep2Input(title);
            if (errorsStep2.title) {
                this.setState({
                    errors: errorsStep2
                });
            } else {
                this.setState({
                    errors: {},
                    step: steps[ step ],
                    cityPk: cityPk || formData.pk,
                });
            }

            break;
        case 3:
            let errorsDay1 = validateDayInput(day1_morning, day1_lunch, day1_afternoon, day1_diner, 'day1');
            if (errorsDay1.day1_morning || errorsDay1.day1_lunch || errorsDay1.day1_afternoon || errorsDay1.day1_diner) {
                this.setState({
                    errors: errorsDay1
                });
            } else {
                this.setState({
                    errors: {},
                    step: steps[ step ],
                });
            }
            break;
        case 4:
            let errorsDay2 = validateDayInput(day2_morning, day2_lunch, day2_afternoon, day2_diner, 'day2');
            if (errorsDay2.day2_morning || errorsDay2.day2_lunch || errorsDay2.day2_afternoon || errorsDay2.day2_diner) {
                this.setState({
                    errors: errorsDay2
                });
            } else {
                this.setState({
                    errors: {},
                    step: steps[ step ],
                });
            }
            break;
        case 5:
            let errorsDay3 = validateDayInput(day3_morning, day3_lunch, day3_afternoon, day3_diner, 'day3');
            if (errorsDay3.day3_morning || errorsDay3.day3_lunch || errorsDay3.day3_afternoon || errorsDay3.day3_diner) {
                this.setState({
                    errors: errorsDay3
                });
            } else {
                this.setState({
                    errors: {},
                    step: steps[ step ],
                });
            }
            break;
        case 6:
            let formObj = new FormData();
            formObj.append('city', cityPk);
            formObj.append('number_of_days', String(number_of_days));
            formObj.append('title', title);
            formObj.append('budget', budget);
            formObj.append('day1_morning', day1_morning);
            formObj.append('day1_lunch', day1_lunch);
            formObj.append('day1_afternoon', day1_afternoon);
            formObj.append('day1_diner', day1_diner);
            if (image) {
                formObj.append('image', image);
            }
            if (parseInt(number_of_days) > 1) {
                formObj.append('day2_morning', day2_morning);
                formObj.append('day2_lunch', day2_lunch);
                formObj.append('day2_afternoon', day2_afternoon);
                formObj.append('day2_diner', day2_diner);
            }

            if (parseInt(number_of_days) > 2) {
                formObj.append('day3_morning', day3_morning);
                formObj.append('day3_lunch', day3_lunch);
                formObj.append('day3_afternoon', day3_afternoon);
                formObj.append('day3_diner', day3_diner);
            }

            dispatch(updateItineraryAction(formObj, slug));
            this.setState({
                submitted: true,
            });
            break;
        case 0:
        default:
            let errorsStep0 = validateStep0Input(city);

            if (errorsStep0.city) {
                this.setState({
                    errors: errorsStep0,
                });
            } else {
                dispatch(initializeCreateAction(city, number_of_days));
                this.setState({
                    errors: {},
                    step: 1,
                });
            }
            break;
        }
        ;
    };

    componentDidMount() {
        getItineraryDetails(this.props.match.params.slug)
            .then(response => {
                this.setState({
                    isLoading: false,
                    number_of_days: response.number_of_days,
                    cityPk: response.city.pk,
                    city: response.city.name,
                    title: response.title,
                    budget: response.budget,
                    day1_morning: response.day1_morning,
                    day1_lunch: response.day1_lunch,
                    day1_afternoon: response.day1_afternoon,
                    day1_diner: response.day1_diner,
                    day2_morning: response.day2_morning,
                    day2_lunch: response.day2_lunch,
                    day2_afternoon: response.day2_afternoon,
                    day2_diner: response.day2_diner,
                    day3_morning: response.day3_morning,
                    day3_lunch: response.day3_lunch,
                    day3_afternoon: response.day3_afternoon,
                    day3_diner: response.day3_diner,
                });
            });
    };

    componentWillUnmount() {
        const {
            dispatch
        } = this.props;

        dispatch(resetForm());
    };

    render() {
        const {
            match,
            updated,
            cityError,
        } = this.props;

        const slug = match.params.slug;

        if (updated) {
            return (<Redirect to={`/${slug}`} />);
        }
        return (
            <div className="container-wrapper">
                <CreateUpdateItineraryForm
                    djangoErrors={this.props.djangoErrors}
                    errors={this.state.errors}
                    handleClickBack={this.handleClickBack}
                    handleInputChange={this.handleInputChange}
                    handleReset={this.handleReset}
                    handleSelectExistingCity={this.handleSelectExistingCity}
                    handleSubmit={this.handleSubmit}
                    previouslyCreatedCities={this.props.previouslyCreatedCities}
                    step={this.state.step}
                    type="update"
                    values={this.state}
                    submitted={this.state.submitted}
                    cityError={cityError}
                />
            </div>);
    }
}

UpdateItinerary.propTypes = {
    formData: PropTypes.object,
    previouslyCreatedCities: PropTypes.arrayOf(PropTypes.object),
    steps: PropTypes.arrayOf(PropTypes.number),
    cityError: PropTypes.objectOf(PropTypes.array),
};

UpdateItinerary.defaultProps = {
    formData: {},
    previouslyCreatedCities: [],
    steps: [],
    cityError: {}
};

const mapStateToProps = (state) => {
    const { itineraryForm } = state;
    return {
        ...itineraryForm,
    };
};

export default connect(mapStateToProps)(UpdateItinerary);