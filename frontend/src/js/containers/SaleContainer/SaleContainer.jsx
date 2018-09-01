import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { removeFromCartAction } from '../../actions';
import { isAuthenticated } from '../../reducers';
import { SalePage } from '../../components';

const SaleContainer = ({
    cart,
    removeFromCart
}) => (
    <div className="container product-page-wrapper">
        <h1 className="border-title">Checkout</h1>
        {
            cart.length === 0 ?
                <p>Your cart is empty, visit our <Link to="/products">Products Page</Link>.</p> :
                <SalePage
                    cart={cart}
                    removeFromCart={removeFromCart}
                />
        }

    </div>
);

SaleContainer.propTypes = {
    isAuthenticated: PropTypes.bool,
    orders: PropTypes.arrayOf(PropTypes.object),
    removeFromCart: PropTypes.func,
    userId: PropTypes.number,
};

SaleContainer.defaultProps = {
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
        cart: cart.cart,
        isAuthenticated: isAuthenticated(state),
        userId: user.userId,
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(SaleContainer);
