import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Col, ListGroup, ListGroupItem, Row } from 'reactstrap';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEuroSign,
    faBan
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faEuroSign,
    faBan,
);

import './CheckoutConfirmCart.scss';

const CheckoutConfirmCart = ({
    onStepChange,
    cart,
    removeFromCart,
    total,
}) => (
    <div className="checkout-confirm-wrapper">
        <p>
            Please confirm your order.
        </p>
        <ListGroup>
            {
                cart.map(({ pk, name, price, type }) => (
                    <ListGroupItem key={pk}>
                        <Row>
                            <Col xs="2">
                                <Button
                                    outline
                                    color="danger"
                                    onClick={() => removeFromCart(pk)}
                                >
                                    <FontAwesomeIcon icon="ban" />
                                </Button>
                            </Col>
                            <Col xs="6">
                                {name} - {type}
                            </Col>
                            <Col xs="4" className="price-col">
                                <FontAwesomeIcon icon="euro-sign" /> {price}
                            </Col>
                        </Row>
                    </ListGroupItem>
                ))
            }
        </ListGroup>
        <h3 className="total">Total: <FontAwesomeIcon icon="euro-sign" /> {total}</h3>
        <Button
            onClick={() => onStepChange('confirmAddress')}
            className="main-button"
        >
            Confirm
        </Button>
    </div>
);

export default CheckoutConfirmCart;
