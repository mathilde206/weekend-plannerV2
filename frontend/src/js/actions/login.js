import { fetchUserData } from './userData';
import { login } from '../api';

const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

function requestLogin() {
    return {
        type: LOGIN_REQUEST,
        isLoggingIn: true,
    };
}

function failureLogin(error) {
    return {
        type: LOGIN_FAILURE,
        error,
        isLoggingIn: false,
        access: null,
        refresh: null,
    };
}

function successLogin({ access, refresh }) {
    return {
        type: LOGIN_SUCCESS,
        access,
        refresh,
    };
}

function loginAction(username, password) {
    return function loginThunk(dispatch) {
        dispatch(requestLogin());

        login(username, password)
            .then((auth) => {
                const { access } = auth;
                const { user_id } = access;
                dispatch(successLogin(auth));
                dispatch(fetchUserData(user_id));
            })
            .catch(error => dispatch(failureLogin(error)));
    };
}

export {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    loginAction,
    successLogin,
    requestLogin,
    failureLogin,
};