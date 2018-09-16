import {
    BILLING_UPDATE_REQUEST,
    BILLING_UPDATE_ERROR,
    BILLING_UPDATE_SUCCESS,
} from '../actions';

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

export default userBillingUpdate;
