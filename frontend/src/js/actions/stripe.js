import { getStripePublishableKey, refreshAccessToken } from '../api';
import { accessToken, refreshToken, isAccessTokenExpired } from '../reducers';

const REQUEST_STRIPE_PUB_KEY = 'REQUEST_STRIPE_PUB_KEY';
const ERROR_STRIPE_PUB_KEY = 'ERROR_STRIPE_PUB_KEY';
const SUCCESS_STRIPE_PUB_KEY = 'SUCCESS_STRIPE_PUB_KEY';

function requestStripePublishableKey() {
    return {
        type: REQUEST_STRIPE_PUB_KEY,
    };
}

function errorStripePublishableKey(error) {
    return {
        type: ERROR_STRIPE_PUB_KEY,
        error,
    };
}

function successStripePublishableKey(key) {
    return {
        type: SUCCESS_STRIPE_PUB_KEY,
        key
    };
}

function fetchStripePublishableKey() {
    return function fetchStripePublishableKeyThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        dispatch(requestStripePublishableKey());

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    getStripePublishableKey(access.token)
                        .then((key) => {
                            dispatch(successStripePublishableKey(key));
                        });
                })
                .catch((error) => {
                    dispatch(errorStripePublishableKey(error.message.data));
                });
        } else {
            getStripePublishableKey(access)
                .then((key) => {
                    dispatch(successStripePublishableKey(key));
                })
                .catch((error) => {
                    dispatch(errorStripePublishableKey(error.message.data));
                });
        }
    };
}

export {
    REQUEST_STRIPE_PUB_KEY,
    ERROR_STRIPE_PUB_KEY,
    SUCCESS_STRIPE_PUB_KEY,
    fetchStripePublishableKey,
};