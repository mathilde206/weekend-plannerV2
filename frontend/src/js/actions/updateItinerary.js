import { refreshAccessToken, updateItinerary } from '../api';
import { accessToken, isAccessTokenExpired, refreshToken } from '../reducers';

const REQUEST_ITINERARY_UPDATE = 'REQUEST_ITINERARY_UPDATE';
const ITINERARY_UPDATED = 'ITINERARY_UPDATED';
const ITINERARY_UPDATED_FAILURE = 'ITINERARY_UPDATED_FAILURE';


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
        djangoError: error,
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
                            dispatch(itineraryUpdateFailure(error.message.data));
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
    ITINERARY_UPDATED_FAILURE,
    ITINERARY_UPDATED,
    REQUEST_ITINERARY_UPDATE,
    updateItineraryAction,
    requestItineraryUpdate,
    itineraryUpdated,
    itineraryUpdateFailure,
};
