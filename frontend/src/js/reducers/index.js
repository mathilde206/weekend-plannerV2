import { combineReducers } from 'redux';

import { setAuthUser, setAuthCredentials, registrationReducer } from './userReducer';
import { createUpdateItinerary } from './itineraryReducer';
import { loadingBarReducer } from 'react-redux-loading';
import { alert } from '../reducers/alertsReducer';

const rootReducer = combineReducers({
    user: setAuthUser,
    authentication: setAuthCredentials,
    registration: registrationReducer,
    loadingBar: loadingBarReducer,
    alerts: alert,
    itineraryForm: createUpdateItinerary,
});

export default rootReducer;