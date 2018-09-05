import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, CardColumns } from 'reactstrap';

import { addToCartAction, removeFromCartAction } from '../../actions';
import { getProductList } from '../../api';
import { isAuthenticated } from '../../reducers';

import { ProductCard } from '../../components';

import productPackagesConfig from './config';
import './ProductPage.scss';

class ProductPage extends React.Component {
    state = {
        basicProducts: [],
        premiumProducts: [],
        deluxeProducts: [],
        isLoading: true,
    };

    componentWillMount() {
        getProductList()
            .then((productList) => {
                const basicProducts = productList.filter(({ type }) => (type !== 'Premium' && type !== 'Deluxe'));
                const premiumProducts = productList.filter(({ type }) => (type !== 'Basic' && type !== 'Deluxe'));
                const deluxeProducts = productList.filter(({ type }) => (type !== 'Basic' && type !== 'Premium'));
                this.setState({
                    basicProducts,
                    premiumProducts,
                    deluxeProducts,
                    isLoading: false,
                });
            });
    }

    render() {
        const {
            productList,
            isLoading,
        } = this.state;

        const {
            addToCart,
            cart,
            isAuthenticated,
            removeFromCart,
            userId,
        } = this.props;

        if (isLoading) {
            return <h1>Loading...</h1>;
        }

        return (
            <div className="container product-page-wrapper">
                <h1 className="border-title">Discover Our Offers</h1>

                {
                    !isAuthenticated &&
                    <div className="product-headline">
                        <span className="disabled-checkout"> You must <Link to="/login">Login</Link> to buy travel packages.</span>
                    </div>
                }

                {
                    cart.length > 0 &&
                    <div className="product-headline">
                        <Link to={`/${userId}/checkout/`}>
                            <Button className="main-button">
                                Checkout Now
                            </Button>
                        </Link>
                    </div>
                }

                <CardColumns>
                    {
                        productPackagesConfig.map(({
                            name,
                            image,
                            description,
                            productListName,
                        }) => {
                            const productList = this.state[ productListName ];
                            return (
                                <ProductCard
                                    addToCart={addToCart}
                                    key={name}
                                    description={description}
                                    image={image}
                                    isAuthenticated={isAuthenticated}
                                    name={name}
                                    cart={cart}
                                    productList={productList}
                                    removeFromCart={removeFromCart}
                                />);
                        })
                    }
                </CardColumns>
            </div>
        );
    }
}

ProductPage.propTypes = {
    cart: PropTypes.arrayOf(PropTypes.number),
    isAuthenticated: PropTypes.bool,
    userId: PropTypes.number,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
};

ProductPage.defaultProps = {
    cart: [],
    isAuthenticated: false,
    userId: null,
    addToCart: () => null,
    removeFromCart: () => null,
};

const mapDispatchToProps = (dispatch) => ({
    addToCart: (productId, cart) => {
        dispatch(addToCartAction(productId));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
