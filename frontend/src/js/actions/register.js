import { register } from '../api';
import { history } from '../helpers';

const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';

function registerRequest(user) {
    return {
        type: REGISTER_REQUEST,
        user,
        registering: true,
        registered: false,
    };
}

function registerFailure(error) {
    return {
        type: REGISTER_FAILURE,
        error,
        registering: false,
        registered: false,
    };
}

function registerSuccess(user) {
    return {
        type: REGISTER_SUCCESS,
        user,
        registering: false,
        registered: true,
    };
}

function registerAction(user) {
    return function registerActionThunk(dispatch) {
        dispatch(registerRequest(user));
        register(user)
            .then((user) => {
                dispatch(registerSuccess(user));
                history.push('/login?registration');
            })
            .catch((error) => {
                dispatch(registerFailure(error.response.data));
            });
    };
};

export {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    registerAction,
};