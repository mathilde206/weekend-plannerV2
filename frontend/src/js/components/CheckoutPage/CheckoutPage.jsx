import React from 'react';
import PropTypes from 'prop-types';

import CheckoutConfirmCart from '../CheckoutConfirmCart/CheckoutConfirmCart';
import UserAddressConf from '../UserAddressConf/UserAddressConf';
import Payment from '../Payment/Payment';
import { getUserBillingInfo } from '../../api';

class CheckoutPage extends React.Component {
    state = {
        billing_address_line1: '',
        billing_address_line2: '',
        billing_city: '',
        billing_country: '',
        billing_phone_number: '',
        billing_postcode: '',
        billing_state: '',
        first_name: '',
        last_name: '',
        step: 'confirmCart',
    };

    handleFieldChange = (field, event) => {
        this.setState({
            [ field ]: event.target.value,
        });
    };

    handleStepChange = (nextStep) => {
        this.setState({
            step: nextStep
        });
    };

    handleBillingInfoSubmit = () => {
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
        } = this.state;

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
    };

    componentDidMount() {
        const {
            userId
        } = this.props;

        getUserBillingInfo(userId)
            .then(({
                billing_address_line1,
                billing_address_line2,
                billing_city,
                billing_country,
                billing_phone_number,
                billing_postcode,
                billing_state,
                first_name,
                last_name
            }) => {
                this.setState({
                    billing_address_line1,
                    billing_address_line2,
                    billing_city,
                    billing_country,
                    billing_phone_number,
                    billing_postcode,
                    billing_state,
                    first_name,
                    last_name,
                });
            }
            )
        ;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const {
            billingUpdated
        } = nextProps.userBillingUpdate;

        if (billingUpdated === true) {

            return { step: 'payment' };
        }
        else return null;
    }

    render() {
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
            step,
        } = this.state;
        const {
            cart,
            removeFromCart,
            emptyCart,
            total,
            userId,
            url,
            userBillingUpdate,
            makePayment,
            stripe
        } = this.props;

        switch (step) {
        case 'confirmAddress':
            return (
                <UserAddressConf
                    billing_address_line1={billing_address_line1}
                    billing_address_line2={billing_address_line2}
                    billing_city={billing_city}
                    billing_country={billing_country}
                    billing_phone_number={billing_phone_number}
                    billing_postcode={billing_postcode}
                    billing_state={billing_state}
                    first_name={first_name}
                    onFieldChange={this.handleFieldChange}
                    onStepChange={this.handleStepChange}
                    onSubmit={this.handleBillingInfoSubmit}
                    last_name={last_name}
                    userBillingUpdate={userBillingUpdate}
                />
            );
        case 'payment':
            return (
                <Payment
                    total={total}
                    cart={cart}
                    billing_address_line1={billing_address_line1}
                    billing_address_line2={billing_address_line2}
                    billing_city={billing_city}
                    billing_country={billing_country}
                    billing_phone_number={billing_phone_number}
                    billing_postcode={billing_postcode}
                    billing_state={billing_state}
                    first_name={first_name}
                    last_name={last_name}
                    makePayment={makePayment}
                    stripe={stripe}
                />
            );
        case 'orderFinalized':
            return (
                <div>
                    <h2>Thank you for your order</h2>
                    <p>We will get back to you very soon.</p>
                </div>
            );
        case 'confirmCart':
        default:
            return (
                <CheckoutConfirmCart
                    cart={cart}
                    total={total}
                    removeFromCart={removeFromCart}
                    userId={userId}
                    url={url}
                    onStepChange={this.handleStepChange}
                />
            );
        }
    }
}

export default CheckoutPage;
