import React from 'react';
import PropTypes from 'prop-types';

import { Jumbotron, Row } from 'reactstrap';

import CreateUpdateFormStep from '../CreateUpdateFormStep/CreateUpdateFormStep';
import CityItem from '../CityItem/CityItem';

import { getFieldsforStep } from './stepsConfig';

const CreateUpdateItineraryForm = ({
    handleInputChange,
    handleSelectExistingCity,
    handleSubmit,
    previouslyCreatedCities,
    step,
    type,
    values
}) => {
    const stepFields = getFieldsforStep(step);

    return (
        <Jumbotron className="container create-form-container">
            {
                type === 'create'
                    ? <h1>Create a New Itinerary</h1>
                    : <h1>Update a New Itinerary</h1>
            }

            {
                step === 1 && previouslyCreatedCities.length > 0 &&
                <Row>
                    {previouslyCreatedCities.map(city => (
                        <CityItem
                            key={`${city.name}-${city.country}`}
                            {...city}
                            handleSelectExistingCity={handleSelectExistingCity}
                        />))}
                </Row>
            }

            <CreateUpdateFormStep
                stepFields={stepFields}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                values={values}
            />

        </Jumbotron>
    );
};

CreateUpdateItineraryForm.defaultProps = {
    previouslyCreatedCities: [],
};

CreateUpdateItineraryForm.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    handleSelectExistingCity: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    previouslyCreatedCities: PropTypes.arrayOf(PropTypes.object),
    step: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    values: PropTypes.object,
};

export default CreateUpdateItineraryForm;
