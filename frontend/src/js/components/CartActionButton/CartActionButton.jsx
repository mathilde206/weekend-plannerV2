import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartPlus,
    faCartArrowDown,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faCartPlus,
    faCartArrowDown,
);

const CartActionButton = ({
    addToCart,
    isAuthenticated,
    pk,
    productInCart,
    removeFromCart,
}) => {
    if (productInCart) {
        return (
            <Button
                onClick={() => removeFromCart(pk)}
                color='danger'
                disabled={!isAuthenticated}
            >
                <FontAwesomeIcon icon="cart-arrow-down" /> Out
            </Button>
        );
    }
    return (
        <Button
            onClick={() => addToCart(pk)}
            className="main-button"
            disabled={!isAuthenticated}
        >
            <FontAwesomeIcon icon="cart-plus" /> Add
        </Button>
    );
};

CartActionButton.propTypes = {
    addToCart: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    pk: PropTypes.number.isRequired,
    productInCart: PropTypes.bool.isRequired,
    removeFromCart: PropTypes.func.isRequired,
};

export default CartActionButton;
