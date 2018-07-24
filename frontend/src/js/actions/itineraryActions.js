import itineraryApi from '../api/itineraryApi';

export const INITIALIZE_FORM = 'INITIALIZE_FORM';
export const CITY_CREATE = 'CITY_CREATE';
export const FORM_SUBMITTED = 'FORM_SUBMITTED';
export const ITINERARY_CREATED = 'FORM_CREATED';

export default {
    initializeCreate,
    setCity,
    createItinerary,
};

function getSteps(number_of_days) {
    if (number_of_days === 1) {
        return [ 1, 2, 3, 6 ];
    }
    if (number_of_days === 2) {
        return [ 1, 2, 3, 4, 6 ];
    }
    return [ 1, 2, 3, 4, 5, 6 ];
}

function initializeCreate(city, number_of_days) {
    const steps = getSteps(number_of_days);

    return (dispatch) => {
        return itineraryApi.getCity(city)
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

function setCity(cityObj) {
    return (dispatch) => {
        return itineraryApi.createCity(cityObj)
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

function createItinerary(formObj) {
    return (dispatch) => {
        dispatch(submitItinerary());
        return itineraryApi.createItinerary(formObj)
            .then(response => {
                console.log(response);
                dispatch({
                    type: ITINERARY_CREATED,
                    data: response,
                });
            });
    };
}