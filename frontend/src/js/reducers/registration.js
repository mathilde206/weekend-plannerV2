import {
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../actions';


function registration(state = {}, action) {
    const {
        type,
        error,
        registering,
        registered,
        user,
    } = action;

    switch (type) {
    case REGISTER_REQUEST:
        return {
            registering,
            registered,
        };
    case REGISTER_SUCCESS:
        return {
            registering,
            registered,
            user,
        };
    case REGISTER_FAILURE:
        return {
            registering,
            registered,
            error
        };
    default:
        return state;
    }
}

export default registration;