import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateBillingInfoAction } from '../../actions/index';
import { validateRequired } from '../../helpers/index';
import { getUserBillingInfo } from '../../api/index';

import {
    Alert,
    Button,
    Form,
} from 'reactstrap';

import InputField from '../InputField/InputField';

import './BillingInfoForm.scss';

class BillingInfoForm extends React.Component {
    state = {
        errors: {},
    };

    handleSubmit = () => {
        const {
            updateBillingInfo,
            userId,
        } = this.props;

        const {
            billing_address_line1,
            billing_address_line2,
            billing_city,
            billing_country,
            billing_phone_number,
            billing_postcode,
            billing_state,
            first_name,
            last_name
        } = this.props;

        const isFirstNameValid = validateRequired(first_name);
        const isLastNameValid = validateRequired(last_name);
        const isBillingAddressValid = validateRequired(billing_address_line1);
        const isCityValid = validateRequired(billing_city);
        const isCountryValid = validateRequired(billing_country);
        const isPhoneValid = validateRequired(billing_phone_number);
        const isPostCodeValid = validateRequired(billing_postcode);

        let errors = {};

        if (!isFirstNameValid) {
            errors.first_name = 'Please enter your first name';
        }
        if (!isLastNameValid) {
            errors.last_name = 'Please enter your last name';
        }
        if (!isBillingAddressValid) {
            errors.billing_address_line1 = 'Please enter your street address';
        }
        if (!isCityValid) {
            errors.billing_city = 'Please enter your city';
        }
        if (!isCountryValid) {
            errors.billing_country = 'Please enter your country';
        }
        if (!isPhoneValid) {
            errors.billing_phone_number = 'Please enter your phone number';
        }
        if (!isPostCodeValid) {
            errors.billing_postcode = 'Please enter your post code';
        }

        this.setState({
            errors
        });

        if (
            isFirstNameValid &&
            isLastNameValid &&
            isBillingAddressValid &&
            isCityValid &&
            isCountryValid &&
            isPhoneValid &&
            isPostCodeValid
        ) {
            let formObj = new FormData();
            formObj.append('billing_address_line1', billing_address_line1);
            formObj.append('billing_address_line2', billing_address_line2);
            formObj.append('billing_city', billing_city);
            formObj.append('billing_country', billing_country);
            formObj.append('billing_phone_number', billing_phone_number);
            formObj.append('billing_postcode', billing_postcode);
            formObj.append('billing_state', billing_state);
            formObj.append('first_name', first_name);
            formObj.append('last_name', last_name);

            updateBillingInfo(userId, formObj);
        }

    };

    render() {
        const {errors} = this.state;
        const {
            billing_address_line1,
            billing_address_line2,
            billing_city,
            billing_country,
            billing_phone_number,
            billing_postcode,
            billing_state,
            first_name,
            last_name,
            url,
            userBillingUpdate,
            onFieldChange,
        } = this.props;

        if (userBillingUpdate.billingUpdated) {
            return <Redirect to={`${url}/payment`} />;
        }

        return (
            <div className="billing-form-wrapper">
                <h3 className="margin-bottom">Please enter or confirm your billing information</h3>
                {
                    userBillingUpdate.error &&
                    <Alert color="danger">
                        There was a problem saving your information. Please verify your information.
                    </Alert>
                }
                <Form>

                    <InputField
                        type="text"
                        label="First Name *"

                        name="first_name"
                        id="first_name"
                        value={first_name}
                        error={errors.first_name}
                        onChange={(event) => onFieldChange('first_name', event)}
                    />

                    <InputField
                        type="text"
                        name="last_name"
                        label="Last Name *"
                        id="last_name"
                        value={last_name}
                        error={errors.last_name}
                        onChange={(event) => onFieldChange('last_name', event)}
                    />

                    <InputField
                        type="text"
                        name="billing_address_line1"
                        id="billing_address_line1"
                        label="Address Line 1*"
                        onChange={(event) => onFieldChange('billing_address_line1', event)}
                        value={billing_address_line1}
                        error={errors.billing_address_line1}
                    />

                    <InputField
                        type="text"
                        name="billing_address_line2"
                        label="Address Line 2"
                        id="billing_address_line2"
                        onChange={(event) => onFieldChange('billing_address_line2', event)}
                        value={billing_address_line2}
                    />

                    <InputField
                        type="text"
                        name="billing_city"
                        id="billing_city"
                        label="City *"
                        onChange={(event) => onFieldChange('billing_city', event)}
                        value={billing_city}
                        error={errors.billing_city}
                    />

                    <InputField
                        type="text"
                        name="billing_country"
                        label="Country *"
                        id="billing_country"
                        onChange={(event) => onFieldChange('billing_country', event)}
                        value={billing_country}
                        error={errors.billing_country}
                    />

                    <InputField
                        type="text"
                        name="billing_state"
                        id="billing_state"
                        label="State"
                        onChange={(event) => onFieldChange('billing_state', event)}
                        value={billing_state}
                    />

                    <InputField
                        type="text"
                        name="billing_postcode"
                        label="Post Code *"
                        id="billing_postcode"
                        onChange={(event) => onFieldChange('billing_postcode', event)}
                        value={billing_postcode}
                        error={errors.billing_postcode}
                    />

                    <InputField
                        type="text"
                        name="billing_phone_number"
                        id="billing_phone_number"
                        label="Phone Number *"
                        onChange={(event) => onFieldChange('billing_phone_number', event)}
                        value={billing_phone_number}
                        error={errors.billing_phone_number}
                    />
                    <Button className="main-button" onClick={this.handleSubmit}>Submit</Button>
                </Form>
            </div>
        );
    }
}

BillingInfoForm.propTypes = {
    userId: PropTypes.number.isRequired,
    userBillingUpdate: PropTypes.object,
};

BillingInfoForm.defaultProps = {
    userBillingUpdate: {}
};


export default BillingInfoForm;
