import {
    createItinerary,
    createCity,
    getCity,
    getItineraryList,
    getFilteredItineraryList,
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

const ITINERARY_CREATION_FAILURE = 'ITINERARY_CREATION_FAILURE';

const REQUEST_ITINERARIES_LIST = 'REQUEST_ITINERARIES_LIST';
const RECEIVE_ITINERARIES_LIST = 'RECEIVE_ITINERARIES_LIST';
const ITINERARIES_LIST_FAILURE = 'ITINERARIES_LIST_FAILURE';

const RESET_FORM = 'RESET_FORM';

const REQUEST_ITINERARY_UPDATE = 'REQUEST_ITINERARY_UPDATE';
const ITINERARY_UPDATED = 'ITINERARY_UPDATED';
const ITINERARY_UPDATED_FAILURE = 'ITINERARY_UPDATED_FAILURE';

function resetForm() {
    return {
        type: RESET_FORM,
    };
}

function getSteps(number_of_days) {
    // Helper function to get the number of steps when the form is initialized.
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
    };
}

function itineraryCreationFailure(error) {
    return {
        type: ITINERARY_CREATION_FAILURE,
        error,
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

function itinerariesListFailure(error, query) {
    return {
        type: ITINERARIES_LIST_FAILURE,
        isLoading: false,
        error,
        withQuery: Boolean(query)
    };
}

function receiveItinerariesList(data, query='') {
    return {
        type: RECEIVE_ITINERARIES_LIST,
        itinerariesList: data.results,
        count: data.count,
        navigation: data.navigation,
        total_pages: data.total_pages,
        withQuery: Boolean(query)
    };
}

function fetchItineraries(page=1, query = '') {
    return function fetchItinerariesThunk(dispatch) {
        dispatch(requestItinerariesList());

        getItineraryList(page, query)
            .then((response) => {
                dispatch(receiveItinerariesList(response, query));
            })
            .catch(error => dispatch(itinerariesListFailure(error, query)));
    };
}

function fetchFilteredItineraries(page=1, query = '') {
    return function fetchFilteredItinerariesThunk(dispatch) {
        dispatch(requestItinerariesList());

        getFilteredItineraryList(1, query)
            .then((response) => {
                dispatch(receiveItinerariesList(response, query));
            })
            .catch(error => dispatch(itinerariesListFailure(error, query)));
    };
}

function requestItineraryUpdate() {
    return {
        type: REQUEST_ITINERARY_UPDATE,
    };
}

function itineraryUpdated(data) {
    return {
        type: ITINERARY_UPDATED,
        updated: true,
        data,
    };
}

function itineraryUpdateFailure(error) {
    return {
        type: ITINERARY_UPDATED_FAILURE,
        error,
    };
}

function updateItineraryAction(formObj, slug) {
    return function updateItineraryActionThunk(dispatch, getState) {
        const state = getState();
        const refresh = refreshToken(state);
        const access = accessToken(state);

        dispatch(requestItineraryUpdate());

        if (isAccessTokenExpired(state)) {
            refreshAccessToken(refresh)
                .then(({ access }) => {
                    updateItinerary(formObj, access.token, slug)
                        .then(data => {
                            dispatch(itineraryUpdated(data));
                        })
                        .catch(error => {
                            dispatch(itineraryUpdateFailure(error));
                        });
                });
        } else {
            updateItinerary(formObj, access, slug)
                .then(data => {
                    dispatch(itineraryUpdated(data));
                })
                .catch(error => {
                    dispatch(itineraryUpdateFailure(error));
                });
        }
    };
}

export {
    CITY_CREATE,
    CITY_CREATE_FAILURE,
    CITY_CREATE_REQUEST,
    FORM_SUBMITTED,
    INITIALIZE_FORM,
    ITINERARY_CREATED,
    ITINERARY_CREATION_FAILURE,
    ITINERARIES_LIST_FAILURE,
    ITINERARY_UPDATED,
    ITINERARY_UPDATED_FAILURE,
    RECEIVE_ITINERARIES_LIST,
    REQUEST_ITINERARIES_LIST,
    REQUEST_ITINERARY_UPDATE,
    RESET_FORM,
    createItineraryAction,
    fetchItineraries,
    fetchFilteredItineraries,
    initializeCreateAction,
    resetForm,
    setCityAction,
    updateItineraryAction,
};
