import {
    ADD_TO_CART,
    ERROR_ADD_TO_CART,
    EMPTY_CART,
    REMOVE_FROM_CART,
    HYDRATE_CART,
} from '../actions';

function cart(state = {}, action) {
    const {
        type,
        cart,
        product,
        productId,
    } = action;

    let currentCart = state.cart || [];
    let total = 0;

    switch (type) {
    case ADD_TO_CART:
        let newCartAdd = currentCart.concat(product);
        total = newCartAdd.map(item => parseInt(item.price)).reduce((a, b) => a + b, 0);
        return {
            ...state,
            cart: newCartAdd,
            total,
        };
    case ERROR_ADD_TO_CART:
        return {
            ...state,
            error,
        };
    case REMOVE_FROM_CART:
        let newCartRemove = currentCart.filter(item => item.pk !== productId);
        total = newCartRemove.map(item => parseInt(item.price)).reduce((a, b) => a + b, 0);
        return {
            ...state,
            cart: newCartRemove,
            total,
        };
    case EMPTY_CART:
        return {
            cart: []
        };
    case HYDRATE_CART:
        console.log(cart)
        total = cart ? cart.map(item => parseInt(item.price)).reduce((a, b) => a + b, 0) : 0;
        return {
            cart,
            total,
        };
    default:
        return state;
    }
}

export default cart;