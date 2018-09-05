import axios from 'axios/index';
import {
    getUsername,
    login,
    logout,
    refreshAccessToken,
    register,
    deleteApi,
    getUserLikes,
    updateUserProfile,
} from '../api/';
import {
    alertSuccessAction,
    alertClearAction,
    alertErrorAction,
} from '../actions/alertsActions';

import {
    receiveUserItineraryLikes,
} from '../actions/likesActions';

import { history } from '../helpers';

const DELETE_REQUEST = 'USERS_DELETE_REQUEST';
const DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
const DELETE_FAILURE = 'USERS_DELETE_FAILURE';

const GET_USER_REQUEST = 'GET_USER_REQUEST';
const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
const GET_USER_FAILURE = 'GET_USER_FAILURE';

const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

const LOGOUT = 'USERS_LOGOUT';

const USER_RETRIEVED = 'USER_RETRIEVED';

const TOKEN_REQUEST = 'TOKEN_REQUEST';
const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
const TOKEN_FAILURE = 'TOKEN_FAILURE';

const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';

const PROFILE_UPDATE_SUBMITTED = 'PROFILE_UPDATE_SUBMITTED';
const PROFILE_UPDATED = 'PROFILE_UPDATED';

axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

function setAuthedUserAction(id) {
    return dispatch => {
        getUsername(id)
            .then((user) => {
                dispatch({
                    type: USER_RETRIEVED,
                    user,
                    id,
                });
            });
        getUserLikes(id)
            .then(response => {
                dispatch(receiveUserItineraryLikes(response.likes));
            });
    };
}

function loginAction(username, password) {
    function request(user) {
        return { type: LOGIN_REQUEST, user };
    }

    function success(user, token, auth) {
        return { type: LOGIN_SUCCESS, user, token, auth };
    }

    function failure(error) {
        return { type: LOGIN_FAILURE, error };
    }

    return dispatch => {
        dispatch(request({ username }));

        login(username, password)
            .then(auth => {
                const {
                    access
                } = auth;

                getUsername(access.user_id)
                    .then((username) => {
                        dispatch(success(username, access.token, auth));
                        dispatch(setAuthedUserAction(access.user_id));
                        dispatch(alertSuccessAction('Successful Login'));
                        history.push('/');
                    });

            }).catch(error => {
                dispatch(failure(error.toString()));
                dispatch(alertErrorAction(error.toString()));
            }
            );
    };
}

function refreshAccessAction(token) {
    function request(user, token) {
        return { type: TOKEN_REQUEST, token };
    }

    function success(token) {
        return {
            type: TOKEN_RECEIVED,
            token: token.access,
        };
    }

    function failure(error) {
        return { type: TOKEN_FAILURE, error };
    }

    return dispatch => {
        dispatch(request(token));

        refreshAccessToken(token)
            .then((data) => {
                dispatch(success(data.token));
            })
            .catch(error => {
                dispatch(failure(error.toString()));
                dispatch(alertErrorAction(error.toString()));
            });
    };
}

function logoutAction() {
    logout();
    return { type: LOGOUT };
}

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
                    dispatch(alertSuccessAction('Registration successful, you can now Login'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertErrorAction(error.toString()));
                }
            );
    };
}

function deleteAction(id) {
    function request(id) {
        return { type: DELETE_REQUEST, id };
    }

    function success(id) {
        return { type: DELETE_SUCCESS, id };
    }

    function failure(id, error) {
        return { type: DELETE_FAILURE, id, error };
    }

    return dispatch => {
        dispatch(request(id));

        //TODO: add the api to delete a user
        deleteApi(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };
}

export {
    DELETE_REQUEST,
    DELETE_SUCCESS,
    DELETE_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    USER_RETRIEVED,
    TOKEN_REQUEST,
    TOKEN_RECEIVED,
    TOKEN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    loginAction,
    logoutAction,
    refreshAccessAction,
    registerAction,
    setAuthedUserAction,
    deleteAction,
};

//TODO: Add api to update user info and show user info