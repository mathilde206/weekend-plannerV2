import { refreshAccessToken, saveOrder, saveProductItem } from '../api';
import { isAccessTokenExpired, accessToken, refreshToken } from '../reducers';
import { emptyCartAction } from './cart';

const REQUEST_PAYMENT = 'REQUEST_PAYMENT';
const ERROR_PAYMENT = 'ERROR_PAYMENT';
const PAYMENT_SUCCESS = 'PAYMENT_SUCCESS';

function requestPayment() {
    return {
        type: REQUEST_PAYMENT,
    };
}

function errorPayment(error) {
    return {
        type: ERROR_PAYMENT,
        error,
    };
}

function successPayment(orderPk) {
    return {
        type: PAYMENT_SUCCESS,
        orderPk,
    };
}

function saveOrderItems(cart, orderPk, token, dispatch) {
    cart.forEach((product, idx) => {
        let formObj = new FormData();
        formObj.append('product', product.pk);
        formObj.append('order', orderPk);

        saveProductItem(token, formObj)
            .then(() => {
                if (idx === cart.length - 1) {
                    // Checking if the product was the last one saved and if so,
                    // dispatching payment
                    dispatch(successPayment(orderPk));
                    dispatch(emptyCartAction());
                }
            })
            .catch((error) => {
                dispatch(errorPayment(error));
            });
    });
}

function makePayment(formObj, cart) {
    return function updateBillingInfoActionThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        dispatch(requestPayment());

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    saveOrder(access.token, formObj)
                        .then(({ pk }) => {
                            saveOrderItems(cart, pk, access.token, dispatch);
                        })
                        .catch((error) => {
                            dispatch(errorPayment(error));
                        });
                });
        } else {
            saveOrder(access, formObj)
                .then(({ pk }) => {
                    console.log(pk)
                    saveOrderItems(cart, pk, access, dispatch);
                })
                .catch((error) => {
                    dispatch(errorPayment(error));
                });
        };
    };
}

export {
    PAYMENT_SUCCESS,
    ERROR_PAYMENT,
    REQUEST_PAYMENT,
    makePayment,
};
