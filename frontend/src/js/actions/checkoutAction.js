const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EMPTY_CART = 'EMPTY_CART';
const HYDRATE_CART = 'HYDRATE_CART';

function addToCartAction(productId) {
    return {
        type: ADD_TO_CART,
        productId,
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
    REMOVE_FROM_CART,
    EMPTY_CART,
    HYDRATE_CART,
    addToCartAction,
    removeFromCartAction,
    emptyCartAction,
    getCart,
};
