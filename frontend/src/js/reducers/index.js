import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { createUpdateItineraryReducer, itinerariesListReducer } from './itineraryReducer';
import userReducer from './userReducer';

import {
    authReducer,
    getAccessToken,
    getRefreshToken,
    getIsAccessTokenExpired,
    getIsRefreshTokenExpired,
    getIsAuthenticated,
    registrationReducer,
} from './authReducer';

import userLikesReducer from './likesReducer';
import { cartReducer } from './checkoutReducer';

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    registration: registrationReducer,
    itineraryForm: createUpdateItineraryReducer,
    itineraries: itinerariesListReducer,
    router: routerReducer,
    userLikes: userLikesReducer,
    cart: cartReducer,
});

export default rootReducer;

const isAuthenticated =
    state => getIsAuthenticated(state.auth);
const accessToken =
    state => getAccessToken(state.auth);
const isAccessTokenExpired =
    state => getIsAccessTokenExpired(state.auth);
const refreshToken =
    state => getRefreshToken(state.auth);
const isRefreshTokenExpired =
    state => getIsRefreshTokenExpired(state.auth);

export {
    isAuthenticated,
    accessToken,
    isAccessTokenExpired,
    refreshToken,
    isRefreshTokenExpired,
};
