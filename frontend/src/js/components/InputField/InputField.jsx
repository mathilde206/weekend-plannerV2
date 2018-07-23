import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, FormFeedback, Label, Input } from 'reactstrap';

const InputField = ({ error, handleInputChange, label, name, options, type, value, ...rest }) => {
    const id = `id_${name}`,
        input_type = type ? type : 'text';

    if (type === 'select') {
        return (
            <FormGroup color={error ? 'danger' : ''}>
                {label ? <Label htmlFor={id}>{label}</Label> : ''}
                <Input
                    type={input_type}
                    name={name}
                    id={id} className={error ? 'is-invalid' : ''}
                    {...rest}
                    onChange={handleInputChange}
                    value={value}
                >
                    {options.map(option => <option key={option}>{option}</option>)}
                </Input>
                {error ?
                    <FormFeedback className="invalid-feedback">
                        {error}
                    </FormFeedback>
                    : ''
                }
            </FormGroup>
        );
    }
    return (
        <FormGroup color={error ? 'danger' : ''}>
            {label ? <Label htmlFor={id}>{label}</Label> : ''}
            <Input
                type={input_type}
                name={name}
                id={id} className={error ? 'is-invalid' : ''}
                onChange={handleInputChange}
                value={value}
                {...rest}
            />
            {error ?
                <FormFeedback className="invalid-feedback">
                    {error}
                </FormFeedback>
                : ''
            }
        </FormGroup>
    );
};

InputField.defaultTypes = {
    error: '',
    options: [],
    type: 'text',
};

InputField.propTypes = {
    error: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])),
    type: PropTypes.string,
};

export default InputField;