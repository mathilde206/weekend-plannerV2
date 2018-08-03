import React from 'react';
import PropTypes from 'prop-types';

import { Jumbotron, Row, Col } from 'reactstrap';

import CreateUpdateFormStep from '../CreateUpdateFormStep/CreateUpdateFormStep';
import CityItem from '../CityItem/CityItem';

import { getFieldsforStep, getDescriptionforSteps } from './config';
import './CreateUpdateItineraryForm.scss';

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
    const stepDescription = getDescriptionforSteps(step);

    return (
        <Jumbotron className="container create-form-container jumbotron-white">
            {
                type === 'create'
                    ? <h1>Create a New Itinerary</h1>
                    : <h1>Update a New Itinerary</h1>
            }

            {
                stepDescription.map(line => <p className="lead">{line}</p>)
            }
            <hr className="my-2" />
            {
                step === 1 && previouslyCreatedCities.length > 0 &&
                <Row>
                    <Col sm="12">
                        <p>A city with that name was previously created, is it the same ?</p>
                    </Col>
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
