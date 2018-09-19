import { refreshAccessToken, updateBillingInfo } from '../api';
import { accessToken, isAccessTokenExpired, refreshToken } from '../reducers';

const BILLING_UPDATE_REQUEST = 'BILLING_UPDATE_REQUEST';
const BILLING_UPDATE_ERROR = 'BILLING_UPDATE_ERROR';
const BILLING_UPDATE_SUCCESS = 'BILLING_UPDATE_SUCCESS';


function requestBillingUpdate() {
    return {
        type: BILLING_UPDATE_REQUEST,
    };
}

function errorBillingUpdate(error) {
    return {
        type: BILLING_UPDATE_ERROR,
        error,
    };
}

function successBillingUpdate() {
    return {
        type: BILLING_UPDATE_SUCCESS,
        billingUpdated: true,
    };
}

function updateBillingInfoAction(userId, formObj) {
    return function updateBillingInfoActionThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        dispatch(requestBillingUpdate());

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    updateBillingInfo(userId, access.token, formObj)
                        .then(() => {
                            dispatch(successBillingUpdate());
                        })
                        .catch(error => {
                            dispatch(errorBillingUpdate(error.message.data));
                        });
                });
        } else {
            updateBillingInfo(userId, access, formObj)
                .then(() => {
                    dispatch(successBillingUpdate());
                })
                .catch(error => {
                    dispatch(errorBillingUpdate(error.message.data));
                });
        }
    };
}


export {
    BILLING_UPDATE_SUCCESS,
    BILLING_UPDATE_ERROR,
    BILLING_UPDATE_REQUEST,
    updateBillingInfoAction,
};
