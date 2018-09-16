import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    EMPTY_CART,
    HYDRATE_CART,
    PAYMENT_SUCCESS,
    ERROR_PAYMENT,
    REQUEST_PAYMENT,
} from '../actions';

function cartReducer(state = {}, action) {
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
        total = cart.map(item => parseInt(item.price)).reduce((a, b) => a + b, 0);
        return {
            cart,
            total,
        };
    default:
        return state;
    }
}

function paymentReducer(state = {}, action) {
    const {
        type,
        pk,
        error,
    } = action;

    switch (type) {
    case REQUEST_PAYMENT:
        return {
            isLoading: true,
        };
    case ERROR_PAYMENT:
        return {
            ...state,
            error,
            isLoading: false,
        };
    case PAYMENT_SUCCESS:
        return {
            isLoading: false,
            orderCreated: true,
            OrderPk: pk,
        };
    default:
        return state;
    }
}

export {
    cartReducer,
    paymentReducer,
};
