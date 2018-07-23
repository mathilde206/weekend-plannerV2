import itineraryApi from '../api/itineraryApi';

export const INITIALIZE_FORM = 'INITIALIZE_FORM';
export const CITY_CREATE = 'CITY_CREATE';

export default {
    initializeCreate,
    setCity,
};

function getSteps(numberOfDays) {
    if (numberOfDays === 1) {
        return [ 1, 2, 3, 6 ];
    }
    if (numberOfDays === 2) {
        return [ 1, 2, 3, 4, 6 ];
    }
    return [ 1, 2, 3, 4, 5, 6 ];
}

function initializeCreate(city, numberOfDays) {
    const steps = getSteps(numberOfDays);

    return (dispatch) => {
        return itineraryApi.getCity(city)
            .then(data => {
                let previouslyCreatedCity;
                if (data.length > 0 && data[ 0 ].pk) {
                    previouslyCreatedCity = data[ 0 ].pk;
                } else {
                    previouslyCreatedCity = '';
                }
                dispatch({
                    type: INITIALIZE_FORM,
                    formData: {
                        city,
                        numberOfDays,
                    },
                    steps,
                    previouslyCreatedCity,
                });
            });
    };
}

function setCity(cityObj) {
    return (dispatch) => {
        return itineraryApi.createCity(cityObj)
            .then(data => {
                console.log('data', data);

                dispatch({
                    type: CITY_CREATE,
                    data
                });
            });
    };
}