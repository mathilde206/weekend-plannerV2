import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
    auth,
    getAccessToken,
    getRefreshToken,
    getIsAccessTokenExpired,
    getIsRefreshTokenExpired,
    getIsAuthenticated,
} from './auth';
import cart from './cart';
import itineraries from './itineraries';
import itineraryForm from './itineraryForm';
import payment from './payment';
import registration from './registration';
import user from './user';
import userLikes from './userLikes';
import userOrders from './userOrders';
import stripe from './stripe';
import userBillingUpdate from './userBillingUpdate';

const rootReducer = combineReducers({
    auth,
    cart,
    itineraries,
    itineraryForm,
    payment,
    registration,
    router: routerReducer,
    stripe,
    user,
    userBillingUpdate,
    userLikes,
    userOrders,
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
