import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';

import {
    Button,
    Card,
    CardDeck,
    CardText,
    CardTitle,
    ListGroup,
    ListGroupItem
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEuroSign,
} from '@fortawesome/free-solid-svg-icons';

import { getStripePublishableKey, refreshAccessToken, saveOrder, saveProductItem } from '../../api';
import { emptyCartAction} from '../../actions';
import './Payment.scss';

library.add(
    faEuroSign
);

class Payment extends React.Component {
    state = {
        stripe_publishable_key: '',
    };

    onToken = (stripe_token) => {
        console.log(this.props);
        const {
            accessToken,
            cart,
            emptyCart,
            handleStepChange,
            isAccessTokenExpired,
            refreshToken,
        } = this.props;

        let formObj = new FormData();
        formObj.append('stripe_token', stripe_token);

        if (isAccessTokenExpired) {
            refreshAccessToken(refreshToken)
                .then(response => {
                    saveOrder(response.access.token, stripe_token, formObj)
                        .then(({ pk }) => {
                            cart.forEach((product, idx) => {
                                let formObj = new FormData();
                                formObj.append('product', product);
                                formObj.append('order', pk);
                                saveProductItem(response.access.token, formObj)
                                    .then(() => {
                                        if (idx === cart.length - 1) {
                                            emptyCart();
                                            // Checking if the product was the last one saved and if so,
                                            // moving to the confirmation screen
                                            handleStepChange('orderFinalized');

                                        }
                                    });
                            });
                        });
                });
        }
        else {
            saveOrder(accessToken, stripe_token, formObj)
                .then(({ pk }) => {
                    cart.forEach((product, idx) => {
                        let formObj = new FormData();
                        formObj.append('product', product);
                        formObj.append('order', pk);
                        saveProductItem(accessToken, formObj)
                            .then(() => {
                                if (idx === cart.length - 1) {
                                    emptyCart();
                                    // Checking if the product was the last one saved and if so,
                                    // moving to the confirmation screen
                                    handleStepChange('orderFinalized');
                                }
                            });
                    });
                });
        }
    }
    ;

    componentWillMount() {
        const {
            accessToken,
            isAccessTokenExpired,
            refreshToken,
        } = this.props;

        if (isAccessTokenExpired) {
            refreshAccessToken(refreshToken)
                .then(response => {
                    getStripePublishableKey(response.access.token)
                        .then(key => this.setState({
                            stripe_publishable_key: key.token
                        }));
                });
        } else {
            getStripePublishableKey(accessToken)
                .then(key => this.setState({
                    stripe_publishable_key: key.token,
                }));
        }
    }

    render() {
        const { stripe_publishable_key } = this.state;

        const {
            total,
            orders,
            billing_address_line1,
            billing_address_line2,
            billing_city,
            billing_country,
            billing_phone_number,
            billing_postcode,
            billing_state,
            first_name,
            last_name,
        } = this.props;

        if (stripe_publishable_key) {
            return (
                <div className="payment-wrapper">
                    <h2 className="subheading">Verify your information and make the payment</h2>
                    <CardDeck className="cards-wrapper">
                        <Card className="confirm-card">
                            <CardTitle>Personal Details</CardTitle>
                            <ListGroup>
                                <ListGroupItem>Name: {`${first_name} ${last_name}`}</ListGroupItem>
                                <ListGroupItem>Address: {`${billing_address_line1}
                            ${billing_address_line2}`}</ListGroupItem>
                                <ListGroupItem>Postcode: {billing_postcode}</ListGroupItem>
                                <ListGroupItem>City: {billing_city}</ListGroupItem>
                                <ListGroupItem>State: {billing_state}</ListGroupItem>
                                <ListGroupItem>Country: {billing_country}</ListGroupItem>
                                <ListGroupItem>Phone Number: {billing_phone_number}</ListGroupItem>
                            </ListGroup>
                        </Card>
                        <Card className="confirm-card">
                            <CardTitle>Order</CardTitle>
                            <ListGroup>
                                {orders.map(({ pk, name, type }) => (
                                    <ListGroupItem key={pk}>{name} {type}</ListGroupItem>
                                ))
                                }
                            </ListGroup>
                            <CardText className="total">
                                Total: {total} Euros
                            </CardText>
                        </Card>
                    </CardDeck>
                    <StripeCheckout
                        name="Weekend Planner Packages"
                        description="Thank you for choosing us."
                        amount={total * 100} //cents
                        current="EUR"
                        allowRememberMe
                        token={this.onToken}
                        stripeKey={stripe_publishable_key}
                    >
                        <Button className="main-button payment-button">
                            Make the payment
                        </Button>
                    </StripeCheckout>
                </div>
            );
        }
        else {
            return <div>Loading...</div>;
        }
    }
};

Payment.propTypes = {
    accessToken: PropTypes.string.isRequired,
    isAccessTokenExpired: PropTypes.bool.isRequired,
    refreshToken: PropTypes.string.isRequired,
};

export default Payment;
