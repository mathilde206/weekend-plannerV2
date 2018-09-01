import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDollarSign,
    faCartPlus,
    faCartArrowDown,
} from '@fortawesome/free-solid-svg-icons';

import ProductItem from '../ProductItem/ProductItem';
import './ProductCard.scss';

library.add(
    faDollarSign,
    faCartPlus,
    faCartArrowDown,
);

import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    CardSubtitle,
    ListGroup,
    ListGroupItem,
} from 'reactstrap';

const ProductCard = ({
    addToCart,
    description,
    image,
    isAuthenticated,
    name,
    cart,
    productList,
    removeFromCart,
}) => (
    <Card
    >
        <CardImg
            alt="Card image cap"
            top
            src={image ? image : '/static/images/genericCard.jpg'}
        />
        <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardText className="description-text">{description}</CardText>
            <ListGroup>
                {
                    productList.map(({ pk, name, price }) => {
                        const productInCart = cart.indexOf(pk) > -1;
                        return (
                            <ListGroupItem key={pk}>
                                <ProductItem
                                    addToCart={addToCart}
                                    isAuthenticated={isAuthenticated}
                                    name={name}
                                    pk={pk}
                                    price={price}
                                    productInCart={productInCart}
                                    removeFromCart={removeFromCart}
                                />
                            </ListGroupItem>
                        );
                    })
                }
            </ListGroup>
        </CardBody>
    </Card>
);

ProductCard.propTypes = {
    addToCart: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    cart: PropTypes.arrayOf(PropTypes.number).isRequired,
    productList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductCard;
