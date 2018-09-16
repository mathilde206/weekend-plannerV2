import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    USER_ORDERS_REQUEST,
    USER_ORDERS_SUCCESS,
    USER_ORDERS_ERROR,
    BILLING_UPDATE_REQUEST,
    BILLING_UPDATE_ERROR,
    BILLING_UPDATE_SUCCESS,
    LOGOUT,
} from '../actions';

function userReducer(state = {}, action) {
    const {
        id,
        isFetching,
        type,
        user,
    } = action;

    switch (type) {
    case GET_USER_REQUEST:
        return {
            isFetching
        };
    case GET_USER_SUCCESS:
        return {
            isFetching,
            user,
            id,
        };
    case GET_USER_FAILURE:
        return {
            isFetching,
            error,
        };
    case LOGOUT:
        return {};
    default:
        return state;
    }
}

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

function userBillingUpdate(state = {}, action) {
    const {
        type,
        error,
        billingUpdated,
    } = action;
    switch (type) {
    case BILLING_UPDATE_REQUEST:
        return {
            billingUpdated: false,
            isLoading: true,
        };
    case BILLING_UPDATE_ERROR:
        return {
            billingUpdated: false,
            isLoading: false,
            error,
        };
    case BILLING_UPDATE_SUCCESS:
        return {
            billingUpdated,
            isLoading: false,
        };
    default:
        return state;
    }
}

export {
    userReducer,
    userOrders,
    userBillingUpdate,
};
