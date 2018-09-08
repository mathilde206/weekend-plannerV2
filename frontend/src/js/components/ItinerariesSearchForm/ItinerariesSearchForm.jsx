import React from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from 'reactstrap';

import './ItinerariesSearchForm.scss';

const ItinerariesSearchForm = ({
    budget,
    onFieldChange,
    onReset,
    onSubmit,
    searchCity,
    numberOfDays,
}) => {
    return (
        <Form inline className="search-form">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label
                    className="search-form-label"
                    for="city"
                >
                    City:
                </Label>
                <Input
                    onChange={(event) => onFieldChange('searchCity', event)}
                    value={searchCity}
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label
                    className="search-form-label"
                    for="budget"
                >
                    Budget:
                </Label>
                <Input
                    onChange={(event) => onFieldChange('budget', event)}
                    value={budget}
                    type="select"
                    name="budget"
                    id="budget"
                    placeholder="Budget"
                >
                    <option>Cheap</option>
                    <option>Affordable</option>
                    <option>Expensive</option>
                    <option>Very_Expensive</option>
                </Input>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Label
                    className="search-form-label"
                    for="numberOfDays"
                >
                    Number Of Days:
                </Label>
                <Input
                    onChange={(event) => onFieldChange('numberOfDays', event)}
                    value={numberOfDays}
                    type="select"
                    name="numberOfDays"
                    id="numberOfDays"
                    placeholder="Number Of Days"
                >
                    <option>1</option>
                    <option>2</option>
3                    <option>3</option>
                </Input>
            </FormGroup>
            <Button onClick={onSubmit}>Filter</Button>
            <Button onClick={onReset}>Reset</Button>
        </Form>
    );
};

ItinerariesSearchForm.propTypes = {
    budget: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onReset: PropTypes.func,
    onSubmit: PropTypes.func,
    searchCity: PropTypes.string.isRequired,
    numberOfDays: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
};

ItinerariesSearchForm.defaultProps = {
    onReset: () => null,
    onSubmit: () => null,
};

export default ItinerariesSearchForm;
