import {
    PAYMENT_SUCCESS,
    ERROR_PAYMENT,
    REQUEST_PAYMENT,
} from '../actions';

function payment(state = {}, action) {
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

export default payment;
