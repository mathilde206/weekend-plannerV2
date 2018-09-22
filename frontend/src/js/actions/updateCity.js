import { refreshAccessToken, updateCity } from '../api';
import { accessToken, isAccessTokenExpired, refreshToken } from '../reducers';

const UPDATE_CITY_REQUEST = 'UPDATE_CITY_REQUEST';
const UPDATE_CITY_ERROR = 'UPDATE_CITY_ERROR';
const UPDATE_CITY_SUCCESS = 'UPDATE_CITY_SUCCESS';
const UPDATE_CITY_RESET = 'UPDATE_CITY_RESET';

function requestCityUpdate() {
    return {
        type: UPDATE_CITY_REQUEST,
        isLoading: true,
    };
}

function errorCityUpdate(error) {
    return {
        type: UPDATE_CITY_ERROR,
        updated: false,
        isLoading: false,
        error,
    };
}

function successCityUpdate(city) {
    return {
        type: UPDATE_CITY_SUCCESS,
        updated: true,
        isLoading: false,
        city,
    };
}

function updateCityAction(cityObj, pk) {
    return function updateCityThunk(dispatch, getState) {
        console.log(cityObj);
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        dispatch(requestCityUpdate());

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    updateCity(cityObj, access.token, pk)
                        .then(() => {
                            dispatch(successCityUpdate());
                        })
                        .catch(error => {
                            dispatch(errorCityUpdate(error.message.data));
                        });
                });
        } else {
            updateCity(cityObj, access, pk)
                .then(() => {
                    dispatch(successCityUpdate());
                })
                .catch(error => {
                    dispatch(errorCityUpdate(error.message.data));
                });
        }
    };
};

function cityUpdateReset(city) {
    return {
        type: UPDATE_CITY_RESET
    };
}

export {
    UPDATE_CITY_REQUEST,
    UPDATE_CITY_SUCCESS,
    UPDATE_CITY_ERROR,
    UPDATE_CITY_RESET,
    updateCityAction,
    cityUpdateReset,
    requestCityUpdate,
    errorCityUpdate,
    successCityUpdate,
};

