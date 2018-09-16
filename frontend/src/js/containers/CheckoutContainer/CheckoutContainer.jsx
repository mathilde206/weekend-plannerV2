import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    removeFromCartAction,
    emptyCartAction,
    updateBillingInfoAction,
    makePayment,
    fetchStripePublishableKey,
} from '../../actions';

import { CheckoutPage } from '../../components';

class CheckoutContainer extends React.Component {
    render() {
        const {
            cart,
            removeFromCart,
            total,
            emptyCart,
            userId,
            updateBillingInfo,
            userBillingUpdate,
            makePayment,
            stripe,
        } = this.props;
        return (
            <div className="container product-page-wrapper">
                <h1 className="border-title">Checkout</h1>
                {
                    cart.length === 0 ?
                        <p>Your cart is empty, visit our <Link to="/products">Products Page</Link>.</p> :
                        <CheckoutPage
                            cart={cart}
                            removeFromCart={removeFromCart}
                            total={total}
                            emptyCart={emptyCart}
                            userId={userId}
                            updateBillingInfo={updateBillingInfo}
                            userBillingUpdate={userBillingUpdate}
                            makePayment={makePayment}
                            stripe={stripe}
                        />
                }
            </div>
        );
    }

    componentDidMount() {
        const { fetchStripeKey } = this.props;
        fetchStripeKey();
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
    } = state;

    return ({
        cart: cart.cart,
        total: cart.total,
        userId: user.id,
        userBillingUpdate,
        stripe,
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
