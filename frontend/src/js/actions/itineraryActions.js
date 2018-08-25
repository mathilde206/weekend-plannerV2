import {
    createItinerary,
    createCity,
    getCity,
} from '../api';

const INITIALIZE_FORM = 'INITIALIZE_FORM';
const CITY_CREATE = 'CITY_CREATE';
const FORM_SUBMITTED = 'FORM_SUBMITTED';
const ITINERARY_CREATED = 'ITINERARY_CREATED';
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

function initializeCreateAction(city, number_of_days) {
    const steps = getSteps(number_of_days);

    return (dispatch) => {
        return getCity(city)
            .then(cities => {
                dispatch({
                    type: INITIALIZE_FORM,
                    formData: {
                        city,
                        number_of_days,
                    },
                    steps,
                    previouslyCreatedCities: cities,
                });
            });
    };
}

function setCityAction(cityObj, token) {
    return (dispatch) => {
        return createCity(cityObj, token)
            .then(data => {
                dispatch({
                    type: CITY_CREATE,
                    data
                });
            });
    };
}

function submitItinerary() {
    return {
        type: FORM_SUBMITTED,
    };
}

function createItineraryAction(formObj, token) {
    return (dispatch) => {
        dispatch(submitItinerary());
        return createItinerary(formObj, token)
            .then(response => {
                dispatch({
                    type: ITINERARY_CREATED,
                    data: response,
                });
            });
    };
}

function requestItinerariesList() {
    return {
        type: REQUEST_ITINERARIES_LIST,
        isLoading: true,
    };
}

function receiveItinerariesList(itinerariesList) {
    return {
        type: RECEIVE_ITINERARIES_LIST,
        itinerariesList,
    };
}

function resetForm() {
    return {
        type: RESET_FORM,
    };
}

export {
    INITIALIZE_FORM,
    CITY_CREATE,
    FORM_SUBMITTED,
    ITINERARY_CREATED,
    RECEIVE_ITINERARIES_LIST,
    REQUEST_ITINERARIES_LIST,
    RESET_FORM,
    initializeCreateAction,
    setCityAction,
    createItineraryAction,
    requestItinerariesList,
    receiveItinerariesList,
    resetForm,
};
