import {
    INITIALIZE_FORM,
    CITY_CREATE,
    FORM_SUBMITTED,
    ITINERARY_CREATED
} from '../actions';

function createUpdateItineraryReducer(state = { currentStep: 0 }, action) {
    switch (action.type) {
    case INITIALIZE_FORM:
        return {
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
            itinerarySlug: action.data.slug
        };
    default:
        return state;
    }
}

export {
    createUpdateItineraryReducer,
};
