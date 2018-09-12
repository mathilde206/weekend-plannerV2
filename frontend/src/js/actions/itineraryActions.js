import {
    createItinerary,
    createCity,
    getCity,
    refreshAccessToken,
    updateItinerary,
} from '../api';

import {
    accessToken,
    isAccessTokenExpired,
    refreshToken,
} from '../reducers';

const INITIALIZE_FORM = 'INITIALIZE_FORM';

const CITY_CREATE = 'CITY_CREATE';
const CITY_CREATE_FAILURE = 'CITY_CREATE_FAILURE';
const CITY_CREATE_REQUEST = 'CITY_CREATE_REQUEST';

const FORM_SUBMITTED = 'FORM_SUBMITTED';
const ITINERARY_CREATED = 'ITINERARY_CREATED';
const ITINERARY_UPDATED = 'ITINERARY_UPDATED';
const ITINERARY_CREATION_FAILURE = 'ITINERARY_CREATION_FAILURE';

const REQUEST_ITINERARIES_LIST = 'REQUEST_ITINERARIES_LIST';
const RECEIVE_ITINERARIES_LIST = 'RECEIVE_ITINERARIES_LIST';
const RESET_FORM = 'RESET_FORM';

function getSteps(number_of_days) {
    if (number_of_days === 1) {
        return [ 1, 2, 3, 6 ];
    }
    if (number_of_days === 2) {
        return [ 1, 2, 3, 4, 6 ];
    }
    return [ 1, 2, 3, 4, 5, 6 ];
}

function initializeAction(city, number_of_days, steps, previouslyCreatedCities) {
    return {
        type: INITIALIZE_FORM,
        formData: {
            city,
            number_of_days,
        },
        steps,
        previouslyCreatedCities,
    };
}

function initializeCreateAction(city, number_of_days) {
    const steps = getSteps(number_of_days);

    return function initializeCreateAction(dispatch) {
        return getCity(city)
            .then(previouslyCreatedCities => {
                dispatch(initializeAction(city, number_of_days, steps, previouslyCreatedCities));
            });
    };
}

function cityCreateRequest() {
    return {
        type: CITY_CREATE_REQUEST,
        isLoading: true,
    };
}

function cityCreateFailure(error) {
    return {
        type: CITY_CREATE_FAILURE,
        isLoading: false,
        error,
    };
}

function cityCreateSuccess(data) {
    return {
        type: CITY_CREATE,
        data
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
                            dispatch(cityCreateFailure(error));
                        });
                });
        } else {
            createCity(cityObj, access)
                .then(data => {
                    dispatch(cityCreateSuccess(data));
                })
                .catch(error => {
                    dispatch(cityCreateFailure(error));
                });
        }
    };
}

function submitItinerary() {
    return {
        type: FORM_SUBMITTED,
    };
}

function itineraryCreatedSuccess(data) {
    return {
        type: ITINERARY_CREATED,
        data,
        isLoading: false,
    };
}

function itineraryCreationFailure(error) {
    return {
        type: ITINERARY_CREATION_FAILURE,
        error,
        isLoading: false,
    };
}

function createItineraryAction(formObj) {
    return function createItineraryActionThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        dispatch(submitItinerary());

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    createItinerary(formObj, access.token)
                        .then(data => {
                            dispatch(itineraryCreatedSuccess(data));
                        })
                        .catch(error => {
                            dispatch(itineraryCreationFailure(error));
                        });
                });
        } else {
            createItinerary(formObj, access)
                .then(data => {
                    dispatch(itineraryCreatedSuccess(data));
                })
                .catch(error => {
                    dispatch(itineraryCreationFailure(error));
                });
        }
    };
}

function requestItinerariesList() {
    return {
        type: REQUEST_ITINERARIES_LIST,
        isLoading: true,
    };
}

function receiveItinerariesList(data) {
    return {
        type: RECEIVE_ITINERARIES_LIST,
        itinerariesList: data.results,
        count: data.count,
        navigation: data.navigation,
        total_pages: data.total_pages,
    };
}

function resetForm() {
    return {
        type: RESET_FORM,
    };
}

function updateItineraryAction(formObj, token, slug) {
    return (dispatch) => {
        dispatch(submitItinerary());
        return updateItinerary(formObj, token, slug)
            .then(response => {
                dispatch({
                    type: ITINERARY_UPDATED,
                    updated: true,
                    data: response,
                });
            });
    };
}

export {
    INITIALIZE_FORM,
    CITY_CREATE,
    FORM_SUBMITTED,
    ITINERARY_CREATED,
    RECEIVE_ITINERARIES_LIST,
    REQUEST_ITINERARIES_LIST,
    ITINERARY_UPDATED,
    RESET_FORM,
    initializeCreateAction,
    setCityAction,
    createItineraryAction,
    requestItinerariesList,
    receiveItinerariesList,
    resetForm,
    updateItineraryAction,
};
