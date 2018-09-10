import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading';

import { createUpdateItineraryReducer, itinerariesListReducer } from './itineraryReducer';
import {
    getAccessToken,
    getRefreshToken,
    getIsAccessTokenExpired,
    getIsRefreshTokenExpired,
    getIsAuthenticated,
    getUserErrors,
    setAuthUserReducer,
    setAuthCredentialsReducer,
    registrationReducer,
} from './userReducer';
import userLikesReducer from './likesReducer';
import { cartReducer } from './checkoutReducer';


const rootReducer = combineReducers({
    user: setAuthUserReducer,
    auth: setAuthCredentialsReducer,
    registration: registrationReducer,
    loadingBar: loadingBarReducer,
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
const authErrors =
  state => getUserErrors(state.auth);

export {
    isAuthenticated,
    accessToken,
    isAccessTokenExpired,
    refreshToken,
    isRefreshTokenExpired,
    authErrors,
};
