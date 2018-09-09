import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
    initializeCreateAction,
    updateItineraryAction,
    setCityAction,
    resetForm,
} from '../../actions';

import {
    getItineraryDetails,
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

class UpdateItinerary extends React.Component {
    state = {
        step: 0,
        number_of_days: 1,
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
            reset,
        } = this.props;

        event.preventDefault();

        reset();
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

        this.setState({
            step: steps[ step - 1 ],
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
            short_description,
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
            accessToken,
            formData,
            isAccessTokenExpired,
            match,
            onInitializeForm,
            refreshToken,
            setCity,
            steps,
            submitForm,
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
                let cityObj = {
                    name: city,
                    country,
                    language,
                    currency,
                };

                if (!cityPk) {
                    if (isAccessTokenExpired) {
                        refreshAccessToken(refreshToken)
                            .then(response => {
                                setCity(cityObj, response.access.token);
                            });
                    } else {
                        setCity(cityObj, accessToken);
                    }
                }

                this.setState({
                    errors: {},
                    step: steps[ step ],
                });
            }
            break;
        case 2:
            let errorsStep2 = validateStep2Input(title);
            if (errorsStep2.title || errorsStep2.short_description) {
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
            let formObj = createFormObj(this.state);
            if (isAccessTokenExpired) {
                refreshAccessToken(refreshToken)
                    .then(response => {
                        submitForm(formObj, response.access.token, slug);
                    });
            } else {
                submitForm(formObj, accessToken, slug);
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
                onInitializeForm(city, number_of_days);
                this.setState({
                    errors: {},
                    step: 1,
                });

            }
            break;
        }
    };

    componentDidMount() {
        getItineraryDetails(this.props.match.params.slug)
            .then(response => {
                console.log(response);
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

    componentWillUnmount() {
        const {
            reset
        } = this.props;

        reset();
    };

    render() {
        const {
            match,
            updated,
        } = this.props;

        const slug = match.params.slug;

        if (updated) {
            return (<Redirect to={`/${slug}`} />);
        }
        return (
            <div className="container-wrapper">
                <CreateUpdateItineraryForm
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
                />
            </div>);
    }
}

UpdateItinerary.propTypes = {
    accessToken: PropTypes.string,
    formData: PropTypes.object,
    isAccessTokenExpired: PropTypes.bool,
    onInitializeForm: PropTypes.func.isRequired,
    previouslyCreatedCities: PropTypes.arrayOf(PropTypes.object),
    refreshToken: PropTypes.string,
    reset: PropTypes.func.isRequired,
    setCity: PropTypes.func.isRequired,
    steps: PropTypes.arrayOf(PropTypes.number),
    submitForm: PropTypes.func.isRequired,
};

UpdateItinerary.defaultProps = {
    accessToken: '',
    formData: {},
    isAccessTokenExpired: true,
    previouslyCreatedCities: [],
    refreshToken: '',
    steps: [],
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitializeForm: (city, number_of_days) => dispatch(initializeCreateAction(city, number_of_days)),
        setCity: (cityObj, token) => dispatch(setCityAction(cityObj, token)),
        submitForm: (formObj, token, slug) => dispatch(updateItineraryAction(formObj, token, slug)),
        reset: () => dispatch(resetForm())
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateItinerary);