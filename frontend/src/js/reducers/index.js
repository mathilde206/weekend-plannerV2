import { combineReducers } from 'redux';

import { authenticationReducer, registrationReducer } from './userReducer';
// import { users } from './users.reducer';
// import { alert } from './alert.reducer';
import { loadingBarReducer } from 'react-redux-loading';

const rootReducer = combineReducers({
    authentication: authenticationReducer,
    registration: registrationReducer,
    loadingBar: loadingBarReducer,
    // users,
    // alert
});

export default rootReducer;