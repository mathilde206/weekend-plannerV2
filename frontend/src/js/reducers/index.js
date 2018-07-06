// import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
// import auth, * as fromAuth from './auth';
// import echo, {serverMessage} from './echo';
//
// export default combineReducers({
//     auth: auth,
//     echo: echo,
//     router: routerReducer
// });
//
// export const isAuthenticated = state => fromAuth.isAuthenticated(state.auth);
// export const accessToken = state => fromAuth.accessToken(state.auth);
// export const isAccessTokenExpired = state => fromAuth.isAccessTokenExpired(state.auth);
// export const refreshToken = state => fromAuth.refreshToken(state.auth);
// export const isRefreshTokenExpired = state => fromAuth.isRefreshTokenExpired(state.auth);
// export const authErrors = state => fromAuth.errors(state.auth);
//
// export function withAuth(headers = {}) {
//     return (state) => ({
//         ...headers,
//         'Authorization': `Bearer ${accessToken(state)}`
//     });
// }

import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
// import { registration } from './registration.reducer';
// import { users } from './users.reducer';
// import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    authentication,
    // registration,
    // users,
    // alert
});

export default rootReducer;