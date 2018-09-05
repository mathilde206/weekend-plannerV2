const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EMPTY_CART = 'EMPTY_CART';

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


export {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    addToCartAction,
    removeFromCartAction,
    emptyCartAction,
};
