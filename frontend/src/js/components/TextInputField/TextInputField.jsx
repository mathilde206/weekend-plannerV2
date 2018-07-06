import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';

const TextInputField = ({ name, label, error, type, ...rest }) => {
    const id = `id_${name}`,
        input_type = type ? type : 'text';
    return (
        <FormGroup color={error ? 'danger' : ''}>
            {label ? <Label htmlFor={id}>{label}</Label> : ''}
            <Input
                type={input_type}
                name={name}
                id={id} className={error ? 'is-invalid' : ''}
                {...rest} />
            {error ?
                <FormFeedback className="invalid-feedback">
                    {error}
                </FormFeedback>
                : ''
            }
        </FormGroup>
    );
};

TextInputField.defaultTypes = {
    error: '',
    type: 'text',
};

TextInputField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    type: PropTypes.string,
};

export default TextInputField;