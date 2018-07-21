import jwtDecode from 'jwt-decode';
import {
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    TOKEN_RECEIVED,
    TOKEN_FAILURE,
} from '../actions/userActions';

const initialState = {
    access: null,
    refresh: null,
    errors: {}
};

export function authenticationReducer(state=initialState, action) {
    switch(action.type) {
    case LOGIN_SUCCESS:
        return {
            access: {
                token: action.payload.access,
                ...jwtDecode(action.payload.access)
            },
            refresh: {
                token: action.payload.refresh,
                ...jwtDecode(action.payload.refresh)
            },
            errors: {}
        };
    case TOKEN_RECEIVED:
        return {
            ...state,
            access: {
                token: action.payload.access,
                ...jwtDecode(action.payload.access)
            }
        };
    case LOGIN_FAILURE:
    case TOKEN_FAILURE:
        return {
            access: null,
            refresh: null,
            errors:
             action.payload.response ||
                {'non_field_errors': action.payload.statusText},
        };
    default:
        return state;
    }
};

export function accessToken(state) {
    if (state.access) {
        return state.access.token;
    }
}

export function refreshToken(state) {
    if (state.refresh) {
        return  state.refresh.token;
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
    return  state.errors;
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
