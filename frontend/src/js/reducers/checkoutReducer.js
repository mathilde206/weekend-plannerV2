import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
} from '../actions';

function cartReducer(state = {}, action) {
    const {
        type,
        productId,
    } = action;

    let currentCart = state.cart || [];

    switch (type) {
    case ADD_TO_CART:
        return {
            ...state,
            cart: currentCart.concat(productId)
        };
    case REMOVE_FROM_CART:
        const newCart = currentCart.filter(item => item !== productId);
        return {
            ...state,
            cart: newCart
        };
    case EMPTY_CART:
        return {
            ...state,
            cart: []
        };
    default:
        return state;
    }
}

export {
    cartReducer
};
