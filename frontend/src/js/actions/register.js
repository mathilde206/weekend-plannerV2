import { register } from '../api';
import { history } from '../helpers';

const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';


function registerAction(user) {
    function request(user) {
        return { type: REGISTER_REQUEST, user };
    }

    function success(user) {
        return { type: REGISTER_SUCCESS, user };
    }

    function failure(error) {
        return { type: REGISTER_FAILURE, error };
    }

    return dispatch => {
        dispatch(request(user));

        register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };
}

export {
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    registerAction,
}