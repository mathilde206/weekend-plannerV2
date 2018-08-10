import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { loadingBarReducer } from 'react-redux-loading';

import { createUpdateItineraryReducer } from './itineraryReducer';
import { alertReducer } from './alertsReducer';
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


const rootReducer = combineReducers({
    user: setAuthUserReducer,
    auth: setAuthCredentialsReducer,
    registration: registrationReducer,
    loadingBar: loadingBarReducer,
    alerts: alertReducer,
    itineraryForm: createUpdateItineraryReducer,
    router: routerReducer
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
