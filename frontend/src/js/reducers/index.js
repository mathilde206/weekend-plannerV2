import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import * as fromAuth from './userReducer';
import { createUpdateItinerary } from './itineraryReducer';
import { loadingBarReducer } from 'react-redux-loading';
import { alert } from '../reducers/alertsReducer';

const rootReducer = combineReducers({
    user: fromAuth.setAuthUser,
    auth: fromAuth.setAuthCredentials,
    registration: fromAuth.registrationReducer,
    loadingBar: loadingBarReducer,
    alerts: alert,
    itineraryForm: createUpdateItinerary,
    router: routerReducer
});

export default rootReducer;

export const isAuthenticated =
 state => fromAuth.isAuthenticated(state.auth);
export const accessToken =
  state => fromAuth.accessToken(state.auth);
export const isAccessTokenExpired =
  state => fromAuth.isAccessTokenExpired(state.auth);
export const refreshToken =
  state => fromAuth.refreshToken(state.auth);
export const isRefreshTokenExpired =
  state => fromAuth.isRefreshTokenExpired(state.auth);
export const authErrors =
  state => fromAuth.errors(state.auth);