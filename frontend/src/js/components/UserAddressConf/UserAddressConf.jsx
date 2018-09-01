import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {
    Button,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

import './UserAddressConf.scss';

const UserAddressConf = ({
    billing_address_line1,
    billing_address_line2,
    billing_city,
    billing_country,
    billing_phone_number,
    billing_postcode,
    billing_state,
    first_name,
    last_name,
    onFieldChange,
    onStepChange,
    onSubmit
}) => {
    return (
        <div className="billing-form-wrapper">
            <h3 className="margin-bottom">Please enter or confirm your billing information</h3>
            <Form>
                <FormGroup row>
                    <Label for="first_name" sm={2}>
                        First Name*
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={first_name}
                            onChange={(event) => onFieldChange('first_name', event)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="last_name" sm={2}>
                        Last Name*
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="last_name"
                            id="last_name"
                            onChange={(event) => onFieldChange('last_name', event)}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="billing_address_line1" sm={2}>
                        Address Line 1*
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="billing_address_line1"
                            id="billing_address_line1"
                            onChange={(event) => onFieldChange('billing_address_line1', event)}
                            value={billing_address_line1}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="billing_address_line1" sm={2}>
                        Address Line 2
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="billing_address_line2"
                            id="billing_address_line2"
                            onChange={(event) => onFieldChange('billing_address_line2', event)}
                            value={billing_address_line2}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="billing_city" sm={2}>
                        City*
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="billing_city"
                            id="billing_city"
                            onChange={(event) => onFieldChange('billing_city', event)}
                            value={billing_city}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="billing_country" sm={2}>
                        Country*
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="billing_country"
                            id="billing_country"
                            onChange={(event) => onFieldChange('billing_country', event)}
                            value={billing_country}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="billing_state" sm={2}>
                        State
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="billing_state"
                            id="billing_state"
                            onChange={(event) => onFieldChange('billing_state', event)}
                            value={billing_state}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="billing_postcode" sm={2}>
                        Postcode*
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="billing_postcode"
                            id="billing_postcode"
                            onChange={(event) => onFieldChange('billing_postcode', event)}
                            value={billing_postcode}
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="billing_phone_number" sm={2}>
                        Phone Number*
                    </Label>
                    <Col sm={10}>
                        <Input
                            type="text"
                            name="billing_phone_number"
                            id="billing_phone_number"
                            onChange={(event) => onFieldChange('billing_phone_number', event)}
                            value={billing_phone_number}
                        />
                    </Col>
                </FormGroup>
                <Button className="main-button" onClick={onSubmit}>Submit</Button>
            </Form>
        </div>
    );
};

UserAddressConf.propTypes = {
    billing_address_line1: PropTypes.string.isRequired,
    billing_address_line2: PropTypes.string.isRequired,
    billing_city: PropTypes.string.isRequired,
    billing_country: PropTypes.string.isRequired,
    billing_phone_number: PropTypes.string.isRequired,
    billing_postcode: PropTypes.string.isRequired,
    billing_state: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    onStepChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default UserAddressConf;
