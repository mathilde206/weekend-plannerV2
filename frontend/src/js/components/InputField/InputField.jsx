import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, FormFeedback, Label, Input, Col } from 'reactstrap';

const InputField = ({ error, handleInputChange, label, name, options, type, value, ...rest }) => {
    const id = `id_${name}`;
    const input_type = type ? type : 'text';
    let input;

    if (type === 'select') {
        input = (
            <Input
                type={input_type}
                name={name}
                id={id} className={error ? 'is-invalid' : ''}
                onChange={handleInputChange}
                value={value}
            >
                {options.map(option => <option key={option}>{option}</option>)}
            </Input>);
    } else if (type === 'file') {
        input = (
            <Input
                type={input_type}
                name={name}
                id={id} className={error ? 'is-invalid' : ''}
                onChange={handleInputChange}
            />);
    } else {
        input = (
            <Input
                type={input_type}
                name={name}
                id={id} className={error ? 'is-invalid' : ''}
                onChange={handleInputChange}
                value={value}
                {...rest}
            />
        );
    }
    return (
        <FormGroup row color={error ? 'danger' : ''}>
            {label ? <Label htmlFor={id} sm={4}>{label}</Label> : ''}
            <Col sm={8}>
                {input}
                <FormFeedback className="invalid-feedback">{error}</FormFeedback>
            </Col>
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
