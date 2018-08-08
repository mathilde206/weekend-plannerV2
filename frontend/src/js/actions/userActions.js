import { userApi } from '../api/userApi';
import { alertActions } from '../actions/alertsActions';
import { history } from '../helpers/history';

export const DELETE_REQUEST = 'USERS_DELETE_REQUEST';
export const DELETE_SUCCESS = 'USERS_DELETE_SUCCESS';
export const DELETE_FAILURE = 'USERS_DELETE_FAILURE';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

export const LOGIN_REQUEST = 'USERS_LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'USERS_LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'USERS_LOGIN_FAILURE';

export const LOGOUT = 'USERS_LOGOUT';

export const USER_RETRIEVED = 'USER_RETRIEVED';

export const TOKEN_REQUEST = 'TOKEN_REQUEST';
export const TOKEN_RECEIVED = 'TOKEN_RECEIVED';
export const TOKEN_FAILURE = 'TOKEN_FAILURE';

export const REGISTER_REQUEST = 'USERS_REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'USERS_REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'USERS_REGISTER_FAILURE';

export const userActions = {
    login,
    logout,
    refreshAccess,
    register,
    setAuthedUser,
    delete: _delete
};

function setAuthedUser(id) {
    return dispatch => {
        userApi.getUsername(id)
            .then((user) => {
                dispatch({
                    type: USER_RETRIEVED,
                    user,
                });
            });
    };
}

function login(username, password) {
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

        userApi.login(username, password)
            .then(auth => {
                const {
                    access
                } = auth;

                userApi.getUsername(access.user_id)
                    .then((username) => {
                        dispatch(success(username, access.token, auth));
                        dispatch(alertActions.success('Successful Login'));
                        history.push('/');
                    });
            }).catch(error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            }
            );
    };
}

function refreshAccess(token) {
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

        userApi.refreshAccessToken(token)
            .then((data) => {
                dispatch(success(data.token));
            })
            .catch(error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
    };
}

function logout() {
    userApi.logout();
    return { type: LOGOUT };
}

function register(user) {
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

        userApi.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful, you can now Login'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
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
        userApi.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };
}

//TODO: Add api to update user info and show user info