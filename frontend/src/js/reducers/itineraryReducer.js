import { INITIALIZE_FORM, CITY_CREATE } from '../actions/itineraryActions';

export function createUpdateItinerary(state = { currentStep: 0 }, action) {
    switch (action.type) {
    case INITIALIZE_FORM:
        return {
            formData: { ...action.formData },
            steps: action.steps,
        };
    case CITY_CREATE:
        return {
            ...state,
            formData: {
                ...state.formData,
                ...action.data
            },
        };
    default:
        return state;
    }
}