import {
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGOUT
} from '../actions';

function user(state = {}, action) {
    const {
        id,
        isFetching,
        type,
        user,
        error,
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

export default user;
