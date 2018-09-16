import {
    createItinerary,
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
const FORM_SUBMITTED = 'FORM_SUBMITTED';
const ITINERARY_CREATED = 'ITINERARY_CREATED';
const ITINERARY_CREATION_FAILURE = 'ITINERARY_CREATION_FAILURE';
const RESET_FORM = 'RESET_FORM';


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


export {
    FORM_SUBMITTED,
    INITIALIZE_FORM,
    ITINERARY_CREATED,
    ITINERARY_CREATION_FAILURE,
    RESET_FORM,
    createItineraryAction,
    initializeCreateAction,
    resetForm,
};
