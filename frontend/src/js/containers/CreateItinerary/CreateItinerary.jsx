import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
    initializeCreateAction,
    createItineraryAction,
    setCityAction,
} from '../../actions';

import {
    refreshAccessToken,
} from '../../api/';

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
        number_of_days: 1,
        city: '',
        cityPk: null,
        country: '',
        language: '',
        currency: '',
        title: '',
        shortDescription: '',
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
        event.preventDefault();
        const { name, currency, country, language } = this.props.previouslyCreatedCities.filter(city => city.pk === pk)[ 0 ];
        this.setState({
            city: name,
            currency,
            country,
            language,
            cityPk: pk,
            step: this.props.steps[ this.state.step ],
        });
    };

    handleReset = (event) => {
        event.preventDefault();
        // CREATE AN ACTION THAT EMPTIES THE STORE FOR THE FORM;
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
            shortDescription,
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
                    if (this.props.isAccessTokenExpired) {
                        refreshAccessToken(this.props.refreshToken)
                            .then(response => {
                                this.props.setCity(cityObj, response.access.token);
                            });
                    } else {
                        this.props.setCity(cityObj, this.props.accessToken);
                    }
                }

                this.setState({
                    errors: {},
                    step: this.props.steps[ step ],
                });
            }
            break;
        case 2:
            let errorsStep2 = validateStep2Input(title, shortDescription);
            if (errorsStep2.title || errorsStep2.shortDescription) {
                this.setState({
                    errors: errorsStep2
                });
            } else {
                this.setState({
                    errors: {},
                    step: this.props.steps[ step ],
                    cityPk: this.state.cityPk || this.props.formData.pk,
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
                    step: this.props.steps[ step ],
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
                    step: this.props.steps[ step ],
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
                    step: this.props.steps[ step ],
                });
            }
            break;
        case 6:
            let formObj = createFormObj(this.state);
            if (this.props.isAccessTokenExpired) {
                refreshAccessToken(this.props.refreshToken)
                    .then(response => {
                        this.props.submitForm(formObj, response.access.token);
                    });
            } else {
                this.props.submitForm(formObj, this.props.accessToken);
            }
            break;
        case 0:
        default:
            let errorsStep0 = validateStep0Input(city);

            if (errorsStep0.city) {
                this.setState({
                    errors: errorsStep0,
                });
            } else {
                this.props.onInitializeForm(city, number_of_days);
                this.setState({
                    errors: {},
                    step: 1,
                });

            }
            break;
        }
    };

    render() {
        return (
            <div className="container-wrapper">
                <CreateUpdateItineraryForm
                    handleSubmit={this.handleSubmit}
                    handleSelectExistingCity={this.handleSelectExistingCity}
                    handleInputChange={this.handleInputChange}
                    previouslyCreatedCities={this.props.previouslyCreatedCities}
                    step={this.state.step}
                    type="create"
                    values={this.state}
                    errors={this.state.errors}
                />
            </div>);
    }
}

CreateItinerary.propTypes = {
    onInitializeForm: PropTypes.func.isRequired,
    setCity: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitializeForm: (city, number_of_days) => dispatch(initializeCreateAction(city, number_of_days)),
        setCity: (cityObj, token) => dispatch(setCityAction(cityObj, token)),
        submitForm: (formObj, token) => dispatch(createItineraryAction(formObj, token))
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateItinerary);