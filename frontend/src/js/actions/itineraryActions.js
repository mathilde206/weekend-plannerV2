import {
    createItinerary,
    createCity,
    getCity,
} from '../api';

const INITIALIZE_FORM = 'INITIALIZE_FORM';
const CITY_CREATE = 'CITY_CREATE';
const FORM_SUBMITTED = 'FORM_SUBMITTED';
const ITINERARY_CREATED = 'FORM_CREATED';

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

export {
    INITIALIZE_FORM,
    CITY_CREATE,
    FORM_SUBMITTED,
    ITINERARY_CREATED,
    initializeCreateAction,
    setCityAction,
    createItineraryAction,
};