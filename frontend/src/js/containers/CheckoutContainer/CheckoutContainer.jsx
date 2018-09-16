import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import ReactLoading from 'react-loading';

import {
    removeFromCartAction,
    emptyCartAction,
    updateBillingInfoAction,
    makePayment,
    fetchStripePublishableKey,
} from '../../actions';

import { getUserBillingInfo } from '../../api';

import {
    BillingInfoForm,
    CheckoutConfirmCart,
    Payment,
} from '../../components';

class CheckoutContainer extends React.Component {
    state = {
        billing_address_line1: '',
        billing_address_line2: '',
        billing_city: '',
        billing_country: '',
        billing_phone_number: '',
        billing_postcode: '',
        billing_state: '',
        errors: {},
        first_name: '',
        last_name: '',
    };

    handleFieldChange = (field, event) => {
        this.setState({
            [ field ]: event.target.value,
        });
    };

    componentDidMount() {
        const {
            userId,
            fetchStripeKey
        } = this.props;

        fetchStripeKey();

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
            );
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
        } = this.state;

        const {
            cart,
            match,
            removeFromCart,
            total,
            userId,
            updateBillingInfo,
            userBillingUpdate,
            makePayment,
            stripe,
            payment,
        } = this.props;

        if (payment.orderCreated) {
            return <Redirect to={`/${userId}/profile/orders?orderCreated`} />;
        };

        if(!userId) {
            return (
                <div className="container">
                    <ReactLoading type="bubbles" color="#000c4f" />
                </div>
            );
        }

        return (
            <div className="container product-page-wrapper">
                <h1 className="border-title">Checkout</h1>
                {
                    cart.length === 0 ?
                        <p>Your cart is empty, visit our <Link to="/products">Products Page</Link>.</p> :
                        <Switch>
                            <Route path={`${match.url}/billing`}
                                render={() => <BillingInfoForm
                                    userId={userId}
                                    url={match.url}
                                    userBillingUpdate={userBillingUpdate}
                                    updateBillingInfo={updateBillingInfo}
                                    billing_address_line1={billing_address_line1}
                                    billing_address_line2={billing_address_line2}
                                    billing_city={billing_city}
                                    billing_country={billing_country}
                                    billing_phone_number={billing_phone_number}
                                    billing_postcode={billing_postcode}
                                    billing_state={billing_state}
                                    first_name={first_name}
                                    last_name={last_name}
                                    onFieldChange={this.handleFieldChange}
                                />
                                } />
                            <Route path={`${match.url}/payment`}
                                render={() => <Payment
                                    billing_address_line1={billing_address_line1}
                                    billing_address_line2={billing_address_line2}
                                    billing_city={billing_city}
                                    billing_country={billing_country}
                                    billing_phone_number={billing_phone_number}
                                    billing_postcode={billing_postcode}
                                    billing_state={billing_state}
                                    first_name={first_name}
                                    last_name={last_name}
                                    stripe={stripe}
                                    cart={cart}
                                    total={total}
                                    makePayment={makePayment}
                                />} />
                            <Route
                                render={() => <CheckoutConfirmCart
                                    cart={cart}
                                    removeFromCart={removeFromCart}
                                    total={total}
                                    url={match.url}
                                />}
                            />
                        </Switch>
                }
            </div>
        );
    }
}

CheckoutContainer.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object),
    orders: PropTypes.arrayOf(PropTypes.object),
    removeFromCart: PropTypes.func,
    total: PropTypes.number,
    userId: PropTypes.number,
    updateBillingInfo: PropTypes.func,
    makePayment: PropTypes.func,
    stripe: PropTypes.object,
    fetchStripeKey: PropTypes.func,
    payment: PropTypes.object,
};

CheckoutContainer.defaultProps = {
    cart: [],
    total: 0,
    removeFromCart: () => null,
    emptyCart: () => null,
    userId: null,
    updateBillingInfo: () => null,
    makePayment: () => null,
    stripe: {},
    fetchStripeKey: () => null,
    payment: {},
};

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: (productId) => {
        dispatch(removeFromCartAction(productId));
    },
    emptyCart: () => {
        dispatch(emptyCartAction());
    },
    updateBillingInfo: (userId, formObj) => {
        dispatch(updateBillingInfoAction(userId, formObj));
    },
    makePayment: (formObj, cart) => {
        dispatch(makePayment(formObj, cart));
    },
    fetchStripeKey: () => {
        dispatch(fetchStripePublishableKey());
    }
});

const mapStateToProps = (state) => {
    const {
        cart,
        user,
        userBillingUpdate,
        stripe,
        payment,
    } = state;

    return ({
        cart: cart.cart,
        total: cart.total,
        userId: user.id,
        userBillingUpdate,
        stripe,
        payment,
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
