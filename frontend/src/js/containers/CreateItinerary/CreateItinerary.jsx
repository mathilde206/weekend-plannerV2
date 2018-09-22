import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

import {
    initializeCreateAction,
    createItineraryAction,
    setCityAction,
    resetForm,
} from '../../actions';

import {
    accessToken,
    refreshToken,
    isAccessTokenExpired,
} from '../../reducers';

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

class CreateItinerary extends React.Component {
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
        image: '',
        errors: {},
        slug: '',
        isLoading: true,
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
            dispatch
        } = this.props;

        event.preventDefault();

        dispatch(resetForm());
        this.setState({
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
            image: '',
            errors: {},
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
            formData,
            onInitializeForm,
            steps,
        } = this.props;

        event.preventDefault();

        switch (this.state.step) {
        case 1:
            let errorsStep1 = validateStep1Input(city, country, language, currency);

            if (errorsStep1.city || errorsStep1.country || errorsStep1.language || errorsStep1.currency) {
                this.setState({
                    errors: errorsStep1,
                });
            } else {
                let cityObj = {
                    name: city,
                    country,
                    language,
                    currency,
                };

                if (!cityPk) {
                    dispatch(setCityAction(cityObj));
                }

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
                const currentIndex = steps.indexOf(step);
                this.setState({
                    errors: {},
                    step: steps[ currentIndex + 1 ],
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
                const currentIndex = steps.indexOf(step);
                this.setState({
                    errors: {},
                    step: steps[ currentIndex + 1 ],
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
                const currentIndex = steps.indexOf(step);
                this.setState({
                    errors: {},
                    step: steps[ currentIndex + 1 ],
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
                const currentIndex = steps.indexOf(step);
                this.setState({
                    errors: {},
                    step: steps[ currentIndex + 1 ],
                });
            }
            break;
        case 6:
            let formObj = createFormObj(this.state);
            dispatch(createItineraryAction(formObj));
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
    };

    componentWillUnmount() {
        const {
            dispatch
        } = this.props;

        dispatch(resetForm());
    };

    render() {
        const {
            djangoErrors,
            cityError,
            itinerarySlug,
            isInitializing,
        } = this.props;

        if (itinerarySlug) {
            return (<Redirect to={`/${itinerarySlug}`} />);
        }

        if (isInitializing) {
            return (
                <div className="container">
                    <ReactLoading type="bubbles" color="#000c4f" />
                </div>
            );
        }

        return (
            <div className="container-wrapper">
                <CreateUpdateItineraryForm
                    djangoErrors={this.props.djangoErrors}
                    cityError={cityError}
                    errors={this.state.errors}
                    handleClickBack={this.handleClickBack}
                    handleInputChange={this.handleInputChange}
                    handleReset={this.handleReset}
                    handleSelectExistingCity={this.handleSelectExistingCity}
                    handleSubmit={this.handleSubmit}
                    previouslyCreatedCities={this.props.previouslyCreatedCities}
                    step={this.state.step}
                    type="create"
                    values={this.state}
                    submitted={this.state.submitted}
                />
            </div>);
    }
}

CreateItinerary.propTypes = {
    dispatch: PropTypes.func,
    formData: PropTypes.object,
    steps: PropTypes.arrayOf(PropTypes.number),
};

CreateItinerary.defaultProps = {
    dispatch: () => null,
    formData: {},
    steps: [],
};

const mapStateToProps = (state) => {
    const { itineraryForm } = state;
    return {
        ...itineraryForm,
        refreshToken: refreshToken(state),
        accessToken: accessToken(state),
        isAccessTokenExpired: isAccessTokenExpired(state),
    };
};

export default connect(mapStateToProps)(CreateItinerary);