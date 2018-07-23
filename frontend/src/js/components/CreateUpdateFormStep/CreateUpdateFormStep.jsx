import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Button, Form, Jumbotron } from 'reactstrap';
import InputField from '../InputField/InputField';

const CreateUpdateFormStep = ({ errors, handleInputChange, handleSubmit, stepFields, values}) => (
    <Jumbotron className="container create-form-container">
        <Form>
            {
                errors.non_field_errors ?
                    <Alert color="danger">
                        {errors.non_field_errors}
                    </Alert> : ''
            }

            {
                stepFields.map(item =>
                    <InputField
                        {...item}
                        handleInputChange={handleInputChange}
                        key={item.name}
                        value={values[ item.name ]}
                    />
                )
            }

            <Button color="primary" size="lg" onClick={handleSubmit}>
                Ok
            </Button>
        </Form>
    </Jumbotron>
);

CreateUpdateFormStep.defaultProps = {
    errors: '',
};

export default CreateUpdateFormStep;

//TODO: Add Possibility to reset
//TODO: add validation