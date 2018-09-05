import React from 'react';
import PropTypes from 'prop-types';
import StripeCheckout from 'react-stripe-checkout';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEuroSign,
} from '@fortawesome/free-solid-svg-icons';

import { getStripePublishableKey, refreshAccessToken, saveOrder, saveProductItem } from '../../api';

library.add(
    faEuroSign
);

class Payment extends React.Component {
    state = {
        stripe_publishable_key: '',
    };

    //TODO: add a wrapper around the access token check
    onToken = (stripe_token) => {
        const {
            accessToken,
            cart,
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
                            cart.forEach(product => {
                                let formObj = new FormData();
                                formObj.append('product', product);
                                formObj.append('order', pk);
                                saveProductItem(response.access.token, formObj)
                                    .then(response => console.log(response));
                            });
                        });
                });
        } else {
            saveOrder(accessToken, stripe_token, formObj)
                .then(({ pk }) => {
                    cart.forEach(product => {
                        let formObj = new FormData();
                        formObj.append('product', product);
                        formObj.append('order', pk);
                        saveProductItem(accessToken, formObj)
                            .then(response => console.log(response));
                    });
                });
        }
    };

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
        const {
            stripe_publishable_key,
        } = this.state;

        const {
            total,
        } = this.props;

        if (stripe_publishable_key) {
            return (
                <StripeCheckout
                    name="Weekend Planner Packages"
                    description="Please use this form to pay your order"
                    amount={total * 100} //cents
                    current="EUR"
                    allowRememberMe
                    token={this.onToken}
                    stripeKey={stripe_publishable_key}
                >
                    <button className="btn btn-primary">
                        Use your own child component, which gets wrapped in whatever
                        component you pass into as "ComponentClass" (defaults to span)
                    </button>
                </StripeCheckout>
            );
        }
        else {
            return <div>Loading...</div>;
        }
    }
}

Payment.propTypes = {
    accessToken: PropTypes.string.isRequired,
    isAccessTokenExpired: PropTypes.string.isRequired,
    refreshToken: PropTypes.string.isRequired,
};

export default Payment;
