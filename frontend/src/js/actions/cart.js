import { getProductDetail } from '../api';

const ADD_TO_CART = 'ADD_TO_CART';
const REQUEST_PRODUCT_INFO = 'REQUEST_PRODUCT_INFO';
const ERROR_ADD_TO_CART = 'ERROR_ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EMPTY_CART = 'EMPTY_CART';
const HYDRATE_CART = 'HYDRATE_CART';

function requestProductInfo() {
    return {
        type: REQUEST_PRODUCT_INFO,
    };
}

function successProductDetails(product) {
    return {
        type: ADD_TO_CART,
        product,
    };
}

function errorAddToCard(error) {
    return {
        type: ERROR_ADD_TO_CART,
        error,
    };
}

function addToCartAction(productId) {
    return function addToCartThunk(dispatch) {
        dispatch(requestProductInfo);
        getProductDetail(productId)
            .then((details) => {
                dispatch(successProductDetails(details));
            })
            .catch((error) => {
                dispatch(errorAddToCard(error.response.data));
            });
    };
}

function removeFromCartAction(productId) {
    return {
        type: REMOVE_FROM_CART,
        productId,
    };
}

function emptyCartAction() {
    return {
        type: EMPTY_CART,
    };
}

function getCart(cart) {
    return {
        type: HYDRATE_CART,
        cart,
    };
}

export {
    ADD_TO_CART,
    ERROR_ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    HYDRATE_CART,
    addToCartAction,
    removeFromCartAction,
    emptyCartAction,
    getCart,
    successProductDetails,
    errorAddToCard,
    requestProductInfo,
};
