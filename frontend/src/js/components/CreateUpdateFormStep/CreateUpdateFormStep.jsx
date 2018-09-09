import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Button, Form, Jumbotron } from 'reactstrap';
import InputField from '../InputField/InputField';

import './CreateUpdateFormStep.scss';

const CreateUpdateFormStep = ({ errors, handleInputChange, handleSubmit, stepFields, values }) => (
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
                    error={errors[ item.name ] ? errors[ item.name ] : ''}
                    handleInputChange={handleInputChange}
                    key={item.name}
                    value={values[ item.name ]}
                />
            )
        }

        <Button className="form-button" size="lg" onClick={handleSubmit}>
            Ok
        </Button>
    </Form>
);

CreateUpdateFormStep.defaultProps = {
    errors: {},
};

CreateUpdateFormStep.propTypes = {
    errors: PropTypes.objectOf(PropTypes.string)
};


export default CreateUpdateFormStep;
