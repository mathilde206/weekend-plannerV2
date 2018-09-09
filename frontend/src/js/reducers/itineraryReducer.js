import {
    INITIALIZE_FORM,
    CITY_CREATE,
    FORM_SUBMITTED,
    ITINERARY_CREATED,
    ITINERARY_UPDATED,
    REQUEST_ITINERARIES_LIST,
    RECEIVE_ITINERARIES_LIST,
    RESET_FORM,
} from '../actions';

function createUpdateItineraryReducer(state = { currentStep: 0 }, action) {
    switch (action.type) {
    case INITIALIZE_FORM:
        return {
            ...state,
            formData: { ...action.formData },
            steps: action.steps,
            previouslyCreatedCities: action.previouslyCreatedCities,
        };
    case CITY_CREATE:
        return {
            ...state,
            formData: {
                ...state.formData,
                ...action.data,
                cityPk: action.data.pk
            },
        };
    case FORM_SUBMITTED:
        return {
            ...state,
            formSubmitted: true,
        };
    case ITINERARY_CREATED:
        return {
            ...state,
            itinerarySlug: action.data.slug
        };
    case ITINERARY_UPDATED:
        return {
            ...state,
            updated: action.updated,
        };
    case RESET_FORM:
        return {
            formData: {}
        };
    default:
        return state;
    }
}

function itinerariesListReducer(state = {}, action) {
    switch (action.type) {
    case REQUEST_ITINERARIES_LIST:
        return {
            ...state,
            isLoading: true,
        };
    case RECEIVE_ITINERARIES_LIST: {
        return {
            ...state,
            isLoading: action.isLoading,
            itinerariesList: action.itinerariesList,
            count: action.count,
            navigation: action.navigation,
            total_pages: action.total_pages,
        };
    }
    default:
        return state;
    }
}

export {
    createUpdateItineraryReducer,
    itinerariesListReducer,
};
