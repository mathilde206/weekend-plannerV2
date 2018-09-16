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

import './Payment.scss';

library.add(
    faEuroSign
);

class Payment extends React.Component {
    onToken = (stripe_token) => {
        const {
            cart,
            makePayment,
            total,
        } = this.props;

        let formObj = new FormData();
        formObj.append('charge_id', stripe_token.id);
        formObj.append('total', total);

        makePayment(formObj, cart);
    };

    render() {
        const {
            cart,
            total,
            billing_address_line1,
            billing_address_line2,
            billing_city,
            billing_country,
            billing_phone_number,
            billing_postcode,
            billing_state,
            first_name,
            last_name,
            stripe,
        } = this.props;

        const {
            key,
            error,
        } = stripe;

        if (key) {
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
                                {cart.map(({ pk, name, type }) => (
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
                        stripeKey={key.token}
                    >
                        <Button className="main-button payment-button">
                            Make the payment
                        </Button>
                    </StripeCheckout>
                </div>
            );
        }
        else {
            return (
                <div className="container">
                    <ReactLoading type="bubbles" color="#000c4f" />
                </div>
            );
        }
    }
};

export default Payment;
