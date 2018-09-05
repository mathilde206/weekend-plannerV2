import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeFromCartAction } from '../../actions';
import {
    accessToken,
    isAccessTokenExpired,
    isAuthenticated,
    refreshToken
} from '../../reducers';
import { CheckoutPage } from '../../components';

const CheckoutContainer = ({
    accessToken,
    cart,
    dispatch,
    isAccessTokenExpired,
    refreshToken,
    removeFromCart,
    userId,
}) => (
    <div className="container product-page-wrapper">
        <h1 className="border-title">Checkout</h1>
        {
            cart.length === 0 ?
                <p>Your cart is empty, visit our <Link to="/products">Products Page</Link>.</p> :
                <CheckoutPage
                    accessToken={accessToken}
                    cart={cart}
                    dispatch={dispatch}
                    isAccessTokenExpired={isAccessTokenExpired}
                    refreshToken={refreshToken}
                    removeFromCart={removeFromCart}
                    userId={userId}
                />
        }

    </div>
);

CheckoutContainer.propTypes = {
    accessToken: PropTypes.string.isRequired,
    cart: PropTypes.arrayOf(PropTypes.number),
    isAccessTokenExpired: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool,
    orders: PropTypes.arrayOf(PropTypes.object),
    removeFromCart: PropTypes.func,
    userId: PropTypes.number,
    refreshToken: PropTypes.string.isRequired,
};

CheckoutContainer.defaultProps = {
    accessToken: null,
    isAuthenticated: false,
    cart: [],
    removeFromCart: () => null,
    userId: null,
};

const mapDispatchToProps = (dispatch) => ({
    removeFromCart: (productId) => {
        dispatch(removeFromCartAction(productId));
    },
});

const mapStateToProps = (state) => {
    const {
        cart,
        user,
    } = state;

    return ({
        accessToken: accessToken(state),
        cart: cart.cart,
        isAccessTokenExpired: isAccessTokenExpired(state),
        isAuthenticated: isAuthenticated(state),
        userId: user.userId,
        refreshToken: refreshToken(state),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContainer);
