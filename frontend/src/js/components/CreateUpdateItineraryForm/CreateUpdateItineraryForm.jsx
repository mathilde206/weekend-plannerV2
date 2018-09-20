import React from 'react';
import PropTypes from 'prop-types';

import { Jumbotron, Row, Col } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, } from '@fortawesome/free-solid-svg-icons';

library.add(faAngleLeft,);

import CreateUpdateFormStep from '../CreateUpdateFormStep/CreateUpdateFormStep';
import CityItem from '../CityItem/CityItem';

import { getFieldsforStep, getDescriptionforSteps } from './config';
import './CreateUpdateItineraryForm.scss';

const CreateUpdateItineraryForm = ({
    djangoErrors,
    cityError,
    errors,
    handleClickBack,
    handleInputChange,
    handleReset,
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
                    : <h1>Update an Itinerary</h1>
            }
            {
                stepDescription.map(line => <p className="lead" key={line}>{line}</p>)
            }
            <hr className="my-2" />
            {
                step > 0 &&
                <div className="back-icon-container">
                    <button onClick={handleClickBack}>
                        <FontAwesomeIcon icon="angle-left" />
                    </button>
                </div>
            }

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
                handleClickBack={handleClickBack}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                values={values}
                errors={errors}
                cityError={cityError}
            />
            {
                values.city &&
                <button className="btn btn-link reset-button" onClick={handleReset}>Reset</button>
            }

        </Jumbotron>
    );
};

CreateUpdateItineraryForm.defaultProps = {
    previouslyCreatedCities: [],
    errors: {},
    djangoErrors: {},
    cityError: {},
};

CreateUpdateItineraryForm.propTypes = {
    djangoErrors: PropTypes.objectOf(PropTypes.string),
    cityError: PropTypes.objectOf(PropTypes.array),
    errors: PropTypes.objectOf(PropTypes.string),
    handleClickBack: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    handleSelectExistingCity: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleReset: PropTypes.func.isRequired,
    previouslyCreatedCities: PropTypes.arrayOf(PropTypes.object),
    step: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    values: PropTypes.object,
};

export default CreateUpdateItineraryForm;
