import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Col,
    Row,
} from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEuroSign,
} from '@fortawesome/free-solid-svg-icons';

import CartActionButton from '../CartActionButton/CartActionButton';

library.add(
    faEuroSign
);

const ProductItem = ({
    addToCart,
    isAuthenticated,
    name,
    pk,
    productInCart,
    price,
    removeFromCart,
}) => {
    return (<Row>
        <Col xs="4" md="4" lg="4">
            {name}
        </Col>
        <Col xs="4" md="4" lg="4">
            <FontAwesomeIcon icon="euro-sign"/> {price}
        </Col>
        <Col xs="4" md={{size: 4, offset: 8}} lg="4">
            <CartActionButton
                addToCart={addToCart}
                isAuthenticated={isAuthenticated}
                pk={pk}
                productInCart={productInCart}
                removeFromCart={removeFromCart}/>
        </Col>
    </Row>);
};

ProductItem.propTypes = {
    addToCart: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    pk: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    productInCart: PropTypes.bool.isRequired,
    removeFromCart: PropTypes.func.isRequired,
};

export default ProductItem;
