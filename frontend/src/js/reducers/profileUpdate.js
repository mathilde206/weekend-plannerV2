import {
    UPDATE_PROFILE_ERROR,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_REQUEST,
    RESET_PROFILE_UPDATE,
} from '../actions';

function profileUpdate(state = {}, action) {
    const {
        type,
        error,
        updating,
        updated,
    } = action;

    switch (type) {
    case UPDATE_PROFILE_REQUEST:
        return {
            updating,
        };
    case UPDATE_PROFILE_ERROR:
        return {
            updating,
            error,
        };
    case UPDATE_PROFILE_SUCCESS:
        return {
            updating,
            updated,
        };
    case RESET_PROFILE_UPDATE:
        return {
            updating,
            updated,
        };
    default:
        return state;
    }
}

export default profileUpdate;