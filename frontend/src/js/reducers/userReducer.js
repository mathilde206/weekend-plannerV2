import { userApi } from '../api/userApi';
import jwtDecode from 'jwt-decode';
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    TOKEN_RECEIVED,
    TOKEN_FAILURE,
    USER_RETRIEVED,
} from '../actions/userActions';

export function setAuthUser(state = {}, action) {
    switch (action.type) {
    case LOGIN_REQUEST:
        return {
            loggingIn: true,
            user: action.user,
        };
    case LOGIN_SUCCESS:
    case TOKEN_RECEIVED:
    case USER_RETRIEVED:
        return {
            loggedIn: true,
            user: action.user,
        };
    case LOGIN_FAILURE:
        return {};
    case LOGOUT:
        return {};
    default:
        return state;
    }
}

const initialAuthCredentials = {
    access: null,
    refresh: null,
    errors: {}
};

export function setAuthCredentials(state = initialAuthCredentials, action) {
    switch (action.type) {
    case LOGIN_SUCCESS:
        return {
            ...action.auth
        };
    case TOKEN_RECEIVED:
        return {
            ...state,
            access: { ...action.auth.access }
        };
    case LOGIN_FAILURE:
    case TOKEN_FAILURE:
        return {
            access: null,
            refresh: null,
            errors: action.auth.errors
        };
    case LOGOUT:
        return {};
    default:
        return state;
    }
}

export function registrationReducer(state = {}, action) {
    switch (action.type) {
    case REGISTER_REQUEST:
        return { registering: true };
    case REGISTER_SUCCESS:
        return {};
    case REGISTER_FAILURE:
        return {};
    default:
        return state;
    }
}

export function accessToken(state) {
    if (state.access) {
        return state.access.token;
    }
}

export function refreshToken(state) {
    if (state.refresh) {
        return state.refresh.token;
    }
}

export function isAccessTokenExpired(state) {
    if (state.access && state.access.exp) {
        return 1000 * state.access.exp - (new Date()).getTime() < 5000;
    }
    return true;
}

export function isRefreshTokenExpired(state) {
    if (state.refresh && state.refresh.exp) {
        return 1000 * state.refresh.exp - (new Date()).getTime() < 5000;
    }
    return true;
}

export function isAuthenticated(state) {
    return !isRefreshTokenExpired(state);
}

export function errors(state) {
    return state.errors;
}

