import { accessToken, isAccessTokenExpired, refreshToken } from '../reducers';
import { createCity, refreshAccessToken } from '../api';

const CITY_CREATE = 'CITY_CREATE';
const CITY_CREATE_FAILURE = 'CITY_CREATE_FAILURE';
const CITY_CREATE_REQUEST = 'CITY_CREATE_REQUEST';


function cityCreateRequest() {
    return {
        type: CITY_CREATE_REQUEST,
        isLoading: true,
    };
}

function cityCreateFailure(cityError) {
    return {
        type: CITY_CREATE_FAILURE,
        cityError,
    };
}

function cityCreateSuccess(cityData) {
    return {
        type: CITY_CREATE,
        cityData
    };
}

function setCityAction(cityObj) {
    return function setCityActionThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        dispatch(cityCreateRequest);

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    createCity(cityObj, access.token)
                        .then(data => {
                            dispatch(cityCreateSuccess(data));
                        })
                        .catch(error => {
                            dispatch(cityCreateFailure(error.response.data));
                        });
                });
        } else {
            createCity(cityObj, access)
                .then(data => {
                    dispatch(cityCreateSuccess(data));
                })
                .catch(error => {
                    dispatch(cityCreateFailure(error.response.data));
                });
        }
    };
}

export {
    CITY_CREATE_FAILURE,
    CITY_CREATE_REQUEST,
    CITY_CREATE,
    setCityAction
};