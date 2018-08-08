import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import itineraryActions from '../../actions/itineraryActions';
import userActions from '../../actions/userActions';
import * as reducers from '../../reducers/userReducer';

import CreateUpdateItineraryForm from '../../components/CreateUpdateItineraryForm/CreateUpdateItineraryForm';

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
        } = this.state;

        event.preventDefault();

        switch (this.state.step) {
        case 1:
            let cityObj = {
                name: city,
                country,
                language,
                currency,
            };

                // This is only needed if the user goes back to previous step or update the itinerary
            if (!cityPk) {
                this.props.setCity(cityObj);
            }

            this.setState({
                step: this.props.steps[ step ],
            });
            break;
        case 2:
            this.setState({
                step: this.props.steps[ step ],
                cityPk: this.state.cityPk || this.props.formData.pk,
            });
            break;
        case 3:
        case 4:
        case 5:
            this.setState({
                step: this.props.steps[ step ],
            });
            break;
        case 6:
            let formObj = new FormData();
            formObj.append('city', cityPk);
            formObj.append('number_of_days', String(number_of_days));
            formObj.append('title', title);
            formObj.append('shortDescription', shortDescription);
            formObj.append('budget', budget);
            formObj.append('day1_morning', day1_morning);
            formObj.append('day1_lunch', day1_lunch);
            formObj.append('day1_afternoon', day1_afternoon);
            formObj.append('day1_diner', day1_diner);
            formObj.append('image', image);

            if (number_of_days > 1) {
                formObj.append('day2_morning', day2_morning);
                formObj.append('day2_lunch', day2_lunch);
                formObj.append('day2_afternoon', day2_afternoon);
                formObj.append('day2_diner', day2_diner);
            }

            if (number_of_days > 2) {
                formObj.append('day3_morning', day3_morning);
                formObj.append('day3_lunch', day3_lunch);
                formObj.append('day3_afternoon', day3_afternoon);
                formObj.append('day3_diner', day3_diner);
            }
            this.props.submitForm(formObj);
            break;
        case 0:
        default:
            this.props.onInitializeForm(city, number_of_days);
            this.setState({
                step: 1,
            });
            break;
        }
    };

    render() {
        return (
            <div className='container-wrapper'>
                <CreateUpdateItineraryForm
                    handleSubmit={this.handleSubmit}
                    handleSelectExistingCity={this.handleSelectExistingCity}
                    handleInputChange={this.handleInputChange}
                    previouslyCreatedCities={this.props.previouslyCreatedCities}
                    step={this.state.step}
                    type="create"
                    values={this.state}
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
        onInitializeForm: (city, number_of_days) => dispatch(itineraryActions.initializeCreate(city, number_of_days)),
        setCity: (cityObj) => dispatch(itineraryActions.setCity(cityObj)),
        submitForm: (formObj) => dispatch(itineraryActions.createItinerary(formObj))
    };
};

const mapStateToProps = (state) => {
    const { itineraryForm, auth } = state;
    return {
        ...itineraryForm,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItinerary);