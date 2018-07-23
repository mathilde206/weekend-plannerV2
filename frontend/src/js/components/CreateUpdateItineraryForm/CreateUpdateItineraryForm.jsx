import React from 'react';
import PropTypes from 'prop-types';

import CreateUpdateFormStep from '../CreateUpdateFormStep/CreateUpdateFormStep';

import { getFieldsforStep } from './stepsConfig';

const CreateUpdateItineraryForm = ({ handleInputChange, handleSubmit, step, type, values }) => {
    const stepFields = getFieldsforStep(step);

    return (
        <div>
            {
                type === 'create'
                    ? <h1>Create a New Itinerary</h1>
                    : <h1>Update a New Itinerary</h1>
            }

            <CreateUpdateFormStep
                stepFields={stepFields}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                values={values}
            />

        </div>
    );
};

export default CreateUpdateItineraryForm;
