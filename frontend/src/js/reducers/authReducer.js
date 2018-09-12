import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    TOKEN_FAILURE,
    TOKEN_RECEIVED,
} from '../actions';

function authReducer(state = {}, action) {
    const {
        access,
        error,
        isLoggingIn,
        refresh,
        type,
    } = action;

    switch (type) {
    case LOGIN_REQUEST:
        return {
            isLoggingIn
        };
    case LOGIN_SUCCESS:
    case TOKEN_RECEIVED:
        return {
            access,
            isLoggingIn: false,
            refresh,
        };
    case LOGIN_FAILURE:
    case TOKEN_FAILURE:
        return {
            access: null,
            error,
            isLoggingIn,
            refresh: null,
        };
    case LOGOUT:
        return {};

    default:
        return state;
    }
}

function registrationReducer(state = {}, action) {
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

function getAccessToken(state) {
    if (state.access) {
        return state.access.token;
    }
}

function getRefreshToken(state) {
    if (state.refresh) {
        return state.refresh.token;
    }
}

function getIsAccessTokenExpired(state) {
    if (state.access && state.access.exp) {
        return 1000 * state.access.exp - (new Date()).getTime() < 5000;
    }
    return true;
}

function getIsRefreshTokenExpired(state) {
    if (state.refresh && state.refresh.exp) {
        return 1000 * state.refresh.exp - (new Date()).getTime() < 5000;
    }
    return true;
}

function getIsAuthenticated(state) {
    return !getIsRefreshTokenExpired(state);
}

export {
    authReducer,
    getAccessToken,
    getRefreshToken,
    getIsAccessTokenExpired,
    getIsRefreshTokenExpired,
    getIsAuthenticated,
    registrationReducer,
};