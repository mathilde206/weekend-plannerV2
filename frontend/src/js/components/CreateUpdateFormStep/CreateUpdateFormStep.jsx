import React from 'react';
import PropTypes from 'prop-types';

import { Alert, Button, Form, Jumbotron } from 'reactstrap';
import InputField from '../InputField/InputField';

import './CreateUpdateFormStep.scss';

const CreateUpdateFormStep = ({ djangoErrors, cityError, errors, handleInputChange, handleSubmit, stepFields, values }) => (
    <Form>
        {
            Object.keys(djangoErrors).length > 0 &&
            <Alert color="danger">
                There was an error, please try again later.
            </Alert>
        }
        {
            Object.keys(cityError).length>0 &&
            <Alert color="danger">
                {Object.keys(cityError).map(key => <li key={key}>{cityError[ key ]}</li>)}
            </Alert>

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
    djangoErrors: {},
    cityError: {}
};

CreateUpdateFormStep.propTypes = {
    errors: PropTypes.objectOf(PropTypes.string),
    djangoErrors: PropTypes.objectOf(PropTypes.string),
    cityError: PropTypes.objectOf(PropTypes.array),
};

export default CreateUpdateFormStep;
