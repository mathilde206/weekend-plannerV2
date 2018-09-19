import {
    CITY_CREATE,
    CITY_CREATE_FAILURE,
    CITY_CREATE_REQUEST,
    FORM_SUBMITTED,
    INITIALIZE_FORM,
    INITIALIZE_FORM_REQUEST,
    INITIALIZE_FORM_FAILURE,
    ITINERARY_CREATED,
    ITINERARY_CREATION_FAILURE,
    ITINERARY_UPDATED,
    ITINERARY_UPDATED_FAILURE,
    REQUEST_ITINERARY_UPDATE,
    RESET_FORM,
} from '../actions';

function itineraryForm(state = { currentStep: 0 }, action) {
    const {
        cityError,
        cityData,
        data,
        error,
        formData,
        isLoading,
        previouslyCreatedCities,
        steps,
        type,
        updated,
    } = action;

    switch (type) {
    case INITIALIZE_FORM_REQUEST:
        return {
            isLoading,
        };
    case INITIALIZE_FORM_FAILURE:
        return {
            isLoading,
            error,
        };
    case INITIALIZE_FORM:
        return {
            ...state,
            formData: { ...formData },
            steps: steps,
            previouslyCreatedCities: previouslyCreatedCities,
        };
    case CITY_CREATE_REQUEST:
        return {
            cityIsLoading: true,
        };
    case CITY_CREATE:
        return {
            ...state,
            formData: {
                ...state.formData,
                ...cityData,
                cityPk: cityData.pk
            },
            cityIsLoading: false,
        };
    case CITY_CREATE_FAILURE:
        return {
            ...state,
            cityError,
        };
    case FORM_SUBMITTED:
        return {
            ...state,
            isLoading: true,
        };
    case ITINERARY_CREATED:
        return {
            ...state,
            itinerarySlug: data.slug,
            isLoading: false,
            submitted: true,
        };
    case ITINERARY_CREATION_FAILURE:
        return {
            ...state,
            error,
            isLoading: false,
            submitted: false,
        };
    case ITINERARY_UPDATED_FAILURE:
        return {
            ...state,
            isLoading: false,
            error,
        };
    case REQUEST_ITINERARY_UPDATE:
        return {
            ...state,
            isLoading: true,
        };
    case ITINERARY_UPDATED:
        return {
            ...state,
            updated: updated,
            isLoading: false,
        };
    case RESET_FORM:
        return {
            formData: {}
        };
    default:
        return state;
    }
}

export default itineraryForm;