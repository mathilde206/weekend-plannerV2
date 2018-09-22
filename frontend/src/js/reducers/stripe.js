import {
    REQUEST_STRIPE_PUB_KEY,
    ERROR_STRIPE_PUB_KEY,
    SUCCESS_STRIPE_PUB_KEY,
} from '../actions';

function stripe(state = {}, action) {
    const {
        type,
        error,
        key
    } = action;

    switch (type) {
    case REQUEST_STRIPE_PUB_KEY:
        return {
            isLoading: true,
        };
    case ERROR_STRIPE_PUB_KEY:
        return {
            isLoading: false,
            error,
        };
    case SUCCESS_STRIPE_PUB_KEY:
        return {
            isLoading: false,
            key,
        };
    default:
        return state;
    }
}

export default stripe;