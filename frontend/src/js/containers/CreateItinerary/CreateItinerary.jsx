import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import itineraryActions from '../../actions/itineraryActions';

import CreateUpdateItineraryForm from '../../components/CreateUpdateItineraryForm/CreateUpdateItineraryForm';

class CreateItinerary extends React.Component {
    state = {
        step: 0,
        numberOfDays: 1,
        city: '',
        country: '',
        language: '',
        currency: '',
        title: '',
        shortDescription: '',
        budget: '$',
    };

    handleInputChange = (event) => {
        this.setState({
            [ event.target.name ]: event.target.value,
        });
    };

    handleSubmit = (event) => {
        const {
            step,
            city,
            country,
            language,
            currency,
            numberOfDays,
            title,
            shortDescription,
            budget,
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
            this.props.setCity(cityObj);
            this.setState({
                step: this.props.steps[ step ],
            });
            break;
        case 2:
        case 3:
        case 4:
        case 5:
            this.setState({
                step: this.props.steps[ step ],
            });
            break;
        case 0:
        default:
            this.props.onInitializeForm(city, numberOfDays);
            this.setState({
                step: 1,
            });
            break;
        }
    };

    render() {
        console.log(this.state);
        return (
            <div>
                <CreateUpdateItineraryForm
                    type="create"
                    step={this.state.step}
                    handleSubmit={this.handleSubmit}
                    handleInputChange={this.handleInputChange}
                    values={this.state}
                />
            </div>);
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitializeForm: (city, numberOfDays) => dispatch(itineraryActions.initializeCreate(city, numberOfDays)),
        setCity: (cityObj) => dispatch(itineraryActions.setCity(cityObj)),
    };
};

const mapStateToProps = (state) => {
    const { itineraryForm } = state;

    return {
        ...itineraryForm
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateItinerary);