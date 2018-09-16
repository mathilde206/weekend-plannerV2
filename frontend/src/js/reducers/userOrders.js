import {
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_ERROR
} from '../actions';

function userOrders(state = {}, action) {
    const {
        error,
        type,
        orders,
    } = action;

    switch (type) {
    case USER_ORDERS_REQUEST:
        return {
            ...state,
            isFetching: true,
        };
    case USER_ORDERS_SUCCESS:
        return {
            ...state,
            isFetching: false,
            orders
        };
    case USER_ORDERS_ERROR:
        return {
            ...state,
            isFetching: false,
            error,
        };
    default:
        return state;
    }
}

export default userOrders;
