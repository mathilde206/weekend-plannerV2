import React from 'react';
import PropTypes from 'prop-types';

import CheckoutConfirmCart from '../CheckoutConfirmCart/CheckoutConfirmCart';
import UserAddressConf from '../UserAddressConf/UserAddressConf';
import Payment from '../Payment/Payment';
import { getCartDetails, getUserBillingInfo, refreshAccessToken, updateBillingInfo } from '../../api';

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
        orders: [],
        total: null,
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
            accessToken,
            isAccessTokenExpired,
            refreshToken,
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

        if (isAccessTokenExpired) {
            refreshAccessToken(refreshToken)
                .then(response => {
                    updateBillingInfo(userId, response.access.token, formObj)
                        .then(() => {
                            this.setState({
                                step: 'payment'
                            });
                        });
                });
        } else {
            updateBillingInfo(userId, accessToken, formObj)
                .then(() => {
                    this.setState({
                        step: 'payment'
                    });
                });
        }

    };

    componentWillMount() {
        const {
            cart,
            userId
        } = this.props;

        getCartDetails(cart)
            .then((response) => {
                const total = response.map(item => parseInt(item.price)).reduce((a, b) => a + b, 0);
                this.setState({
                    orders: response,
                    total,
                });
            });

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

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.cart !== this.props.cart) {
            getCartDetails(nextProps.cart)
                .then((response) => {
                    const total = response.map(item => parseInt(item.price)).reduce((a, b) => a + b, 0);
                    this.setState({
                        orders: response,
                        total,
                    });
                }
                )
            ;
        }
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
            orders,
            total,
            step,
        } = this.state;
        const {
            accessToken,
            cart,
            isAccessTokenExpired,
            removeFromCart,
            emptyCart,
            refreshToken,
            userId, url
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
                />
            );
        case 'payment':
            return (
                <Payment
                    accessToken={accessToken}
                    cart={cart}
                    emptyCart={emptyCart}
                    isAccessTokenExpired={isAccessTokenExpired}
                    refreshToken={refreshToken}
                    total={total}
                    orders={orders}
                    billing_address_line1={billing_address_line1}
                    billing_address_line2={billing_address_line2}
                    billing_city={billing_city}
                    billing_country={billing_country}
                    billing_phone_number={billing_phone_number}
                    billing_postcode={billing_postcode}
                    billing_state={billing_state}
                    first_name={first_name}
                    last_name={last_name}
                    handleStepChange={this.handleStepChange}
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
                    orders={orders}
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
