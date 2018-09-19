import { refreshAccessToken, getUserOrders } from '../api';
import { accessToken, isAccessTokenExpired, refreshToken } from '../reducers';

const USER_ORDERS_REQUEST = 'USER_ORDER_REQUEST';
const USER_ORDERS_ERROR = 'USER_ORDER_ERROR';
const USER_ORDERS_SUCCESS = 'USER_ORDER_SUCCESS';


function requestUserOrders() {
    return {
        type: USER_ORDERS_REQUEST,
    };
}

function errorUserOrders(error) {
    return {
        type: USER_ORDERS_ERROR,
        error,
    };
}

function receiveUserOrders(orders) {
    return {
        type: USER_ORDERS_SUCCESS,
        orders,
    };
}

function fetchUserOrders() {
    return function fetchUserOrdersThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        dispatch(requestUserOrders());

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    getUserOrders(access.token)
                        .then(orders => {
                            dispatch(receiveUserOrders(orders));
                        })
                        .catch(error => {
                            dispatch(errorUserOrders(error.message.data));
                        });
                });
        } else {
            getUserOrders(access)
                .then(orders => {
                    dispatch(receiveUserOrders(orders));
                })
                .catch(error => {
                    dispatch(errorUserOrders(error.message.data));
                });
        }
    };
}

export {
    USER_ORDERS_SUCCESS,
    USER_ORDERS_ERROR,
    USER_ORDERS_REQUEST,
    fetchUserOrders,
};