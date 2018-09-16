import {
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
} from '../actions';


function registration(state = {}, action) {
    switch (action.type) {
    case REGISTER_REQUEST:
        return { registering: true };
    case REGISTER_SUCCESS:
        return {
            registered: true
        };
    case REGISTER_FAILURE:
        return {};
    default:
        return state;
    }
}

export default registration;